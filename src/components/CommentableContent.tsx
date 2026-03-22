import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Reply, CornerDownRight, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendCommentNotification } from '../services/notificationService';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

interface Comment {
    id: string;
    text: string;
    author: string;
    timestamp: number;
    parentId?: string | null;
}

interface CommentableContentProps {
    content: string;
    documentId: string;
    isSubchapter?: boolean;
}

export const CommentableContent: React.FC<CommentableContentProps> = ({ content, documentId, isSubchapter }) => {
    const { user, isAuthenticated } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
    const [iconPosition, setIconPosition] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // In a real app, this would be fetched from a backend
    const [comments, setComments] = useState<Record<string, Record<number, Comment[]>>>({});
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        const q = query(
            collection(db, 'comments'),
            where('documentId', '==', documentId),
            orderBy('timestamp', 'asc')
        );

        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
            const formattedComments: Record<string, Record<number, Comment[]>> = {};
            formattedComments[documentId] = {};

            snapshot.docs.forEach(docSnap => {
                const data = docSnap.data();
                const pIndex = data.paragraphIndex as number;
                
                if (!formattedComments[documentId][pIndex]) {
                    formattedComments[documentId][pIndex] = [];
                }
                
                formattedComments[documentId][pIndex].push({
                    id: docSnap.id,
                    text: data.text,
                    author: data.author,
                    timestamp: data.timestamp?.toMillis ? data.timestamp.toMillis() : Date.now(),
                    parentId: data.parentId || null
                });
            });

            setComments(formattedComments);
        });

        return () => unsubscribeFirestore();
    }, [documentId]);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [expandedReplies, setExpandedReplies] = useState<string[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Select blocks to animate
        const blocks = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
        blocks.forEach(block => {
            block.classList.add('animate-block');
        });

        // Setup images
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            img.classList.add('animate-image');
        });

        // 2. Setup Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: Unobserve after animating once
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px', // Trigger slightly before it hits the bottom
            threshold: 0.1
        });

        blocks.forEach(block => observer.observe(block));
        images.forEach(img => observer.observe(img));

        let disappearTimeout: ReturnType<typeof setTimeout>;

        const handleMouseOver = (e: MouseEvent) => {
            if (isSidebarOpen) return; // Keep current active paragraph if sidebar is open

            // If we hover over a paragraph, cancel any pending disappearance
            clearTimeout(disappearTimeout);

            const target = e.target as HTMLElement;
            const p = target.closest('p');

            if (p && container.contains(p)) {
                // Find index of this paragraph among all paragraphs in the container
                const paragraphs = Array.from(container.querySelectorAll('p'));
                const index = paragraphs.indexOf(p);

                if (index !== -1) {
                    // Show immediately
                    setActiveParagraphIndex(index);
                    const containerRect = container.getBoundingClientRect();
                    const pRect = p.getBoundingClientRect();
                    setIconPosition(pRect.top - containerRect.top);
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (isSidebarOpen) return;

            // Check if we're moving to the comment icon
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (relatedTarget?.closest('.comment-icon-btn')) {
                return;
            }

            // If we're leaving the paragraph container entirely, start the disappear timer
            const target = e.target as HTMLElement;
            const p = target.closest('p');
            if (p && !p.contains(relatedTarget)) {
                disappearTimeout = setTimeout(() => {
                    setActiveParagraphIndex(null);
                    setIconPosition(null);
                }, 1000);
            }
        };

        container.addEventListener('mouseover', handleMouseOver);
        container.addEventListener('mouseout', handleMouseOut);

        return () => {
            clearTimeout(disappearTimeout);
            observer.disconnect();
            container.removeEventListener('mouseover', handleMouseOver);
            container.removeEventListener('mouseout', handleMouseOut);
        };
    }, [isSidebarOpen]);

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setActiveParagraphIndex(null);
        setIconPosition(null);
        setReplyingTo(null);
        setExpandedReplies([]);
    };

    const toggleReplies = (commentId: string) => {
        setExpandedReplies(prev => 
            prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId]
        );
    };

    const handleReplyClick = (commentId: string, authorName: string) => {
        setReplyingTo(commentId);
        setNewCommentText(`@${authorName} `);
        // Ensure replies are expanded when we start replying
        if (!expandedReplies.includes(commentId)) {
            setExpandedReplies(prev => [...prev, commentId]);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim() || activeParagraphIndex === null || !isAuthenticated || !user) return;

        const commentData = {
            documentId,
            paragraphIndex: activeParagraphIndex,
            text: newCommentText.trim(),
            author: user.username,
            authorId: user.id,
            timestamp: serverTimestamp(),
            parentId: replyingTo || null
        };

        try {
            await addDoc(collection(db, 'comments'), commentData);
            // Fire off simulated notification
            await sendCommentNotification(user.username, newCommentText.trim());
        } catch (error) {
            console.error("Error adding comment: ", error);
        }

        setNewCommentText('');
        setReplyingTo(null);
    };

    const rawComments = (activeParagraphIndex !== null && comments[documentId]?.[activeParagraphIndex]) || [];
    const rootComments = rawComments.filter(c => !c.parentId);
    
    // Helper to render text with @mentions highlighted
    const renderCommentText = (text: string) => {
        const parts = text.split(/(@\w+)/g);
        return parts.map((part, i) => 
            part.startsWith('@') 
                ? <span key={i} className="text-aurora-teal font-medium">{part}</span>
                : <span key={i}>{part}</span>
        );
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* The main content */}
            <div
                className={`prose prose-invert prose-lg md:prose-xl max-w-none prose-p:text-white/80 prose-p:font-light prose-headings:font-bold prose-a:text-aurora-teal prose-strong:text-white prose-strong:font-semibold prose-p:cursor-pointer prose-p:transition-colors hover:prose-p:text-white ${isSubchapter ? 'prose-p:text-justify prose-p:indent-[2cm] prose-p:leading-[1.5]' : 'prose-p:leading-relaxed'}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Comment Icon positioned next to active paragraph */}
            <AnimatePresence>
                {activeParagraphIndex !== null && iconPosition !== null && !isSidebarOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        onClick={handleOpenSidebar}
                        className="comment-icon-btn absolute right-0 md:-right-16 bg-white/10 hover:bg-white/20 text-aurora-teal p-3 rounded-full border border-white/10 shadow-lg backdrop-blur-sm transition-colors z-20 group flex items-center gap-2"
                        // Offset slightly to align with the first line of the paragraph
                        style={{ top: `${iconPosition}px` }}
                    >
                        <MessageSquare className="w-5 h-5" />
                        {comments[documentId]?.[activeParagraphIndex]?.length > 0 && (
                            <span className="text-xs font-bold bg-aurora-teal text-black w-5 h-5 rounded-full flex items-center justify-center">
                                {comments[documentId][activeParagraphIndex].length}
                            </span>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Comment Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && activeParagraphIndex !== null && (
                    <>
                        {/* Backdrop for closing sidebar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseSidebar}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity hidden md:block"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%', opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0.5 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="comment-sidebar fixed top-0 right-0 w-full md:w-[400px] h-full bg-black/95 border-l border-white/10 z-50 shadow-2xl flex flex-col pt-24"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-black/50 backdrop-blur-md">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white/90">
                                    <MessageSquare className="w-5 h-5 text-aurora-teal" />
                                    Comments <span className="text-white/40 text-sm font-normal">({rawComments.length})</span>
                                </h3>
                                <button
                                    onClick={handleCloseSidebar}
                                    className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {rootComments.length === 0 ? (
                                    <div className="text-center text-white/40 mt-10">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No comments yet.</p>
                                        <p className="text-sm">Be the first to share your thoughts!</p>
                                    </div>
                                ) : (
                                    rootComments.map(comment => {
                                        const replies = rawComments.filter(c => c.parentId === comment.id);
                                        const isExpanded = expandedReplies.includes(comment.id);
                                        
                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={comment.id}
                                                className="bg-white/5 border border-white/10 rounded-2xl p-4"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-aurora-teal/30 to-aurora-teal/10 border border-white/10 flex items-center justify-center">
                                                            <span className="text-xs font-bold text-aurora-teal">{comment.author.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-white/90">{comment.author}</div>
                                                            <div className="text-xs text-white/40">
                                                                {new Date(comment.timestamp).toLocaleDateString()} at {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isAuthenticated && (
                                                        <button 
                                                            onClick={() => handleReplyClick(comment.id, comment.author)}
                                                            className="text-xs text-aurora-teal flex items-center gap-1 hover:text-aurora-teal/70 transition-colors"
                                                        >
                                                            <Reply className="w-3 h-3" /> Reply
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-white/80 text-sm leading-relaxed mb-3">
                                                    {renderCommentText(comment.text)}
                                                </p>

                                                {/* Replies Section */}
                                                {replies.length > 0 && (
                                                    <div className="mt-2 text-sm">
                                                        <button 
                                                            onClick={() => toggleReplies(comment.id)}
                                                            className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium mb-3 relative ml-8"
                                                        >
                                                            <CornerDownRight className="w-3 h-3" />
                                                            {isExpanded ? 'Hide replies' : `View ${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}`}
                                                        </button>

                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden ml-8 space-y-3 border-l-2 border-white/5 pl-4"
                                                                >
                                                                    {replies.map(reply => (
                                                                        <div key={reply.id} className="pt-1 group/reply relative">
                                                                            <div className="flex items-center justify-between mb-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                                                        <span className="text-[10px] font-bold text-white/70">{reply.author.charAt(0).toUpperCase()}</span>
                                                                                    </div>
                                                                                    <span className="text-xs font-medium text-white/80">{reply.author}</span>
                                                                                    <span className="text-[10px] text-white/30">• {new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                                </div>
                                                                                {isAuthenticated && (
                                                                                    <button 
                                                                                        onClick={() => handleReplyClick(comment.id, reply.author)}
                                                                                        className="text-[10px] text-aurora-teal flex items-center gap-1 hover:text-aurora-teal/70 transition-colors opacity-0 group-hover/reply:opacity-100"
                                                                                    >
                                                                                        <Reply className="w-3 h-3" /> Reply
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                            <p className="text-white/70 text-xs ml-7">
                                                                                {renderCommentText(reply.text)}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Comment Input Form */}
                            <form onSubmit={handleSubmitComment} className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-md">
                                {!isAuthenticated ? (
                                    <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-sm text-white/50 mb-2">Sign in to join the conversation</p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {replyingTo && (
                                            <div className="absolute -top-6 left-2 right-2 flex items-center justify-between text-[10px] text-aurora-teal bg-aurora-teal/10 px-2 py-1 rounded-t-md">
                                                <span className="flex items-center gap-1"><Reply className="w-3 h-3" /> Replying to comment</span>
                                                <button type="button" onClick={() => { setReplyingTo(null); setNewCommentText(''); }} className="hover:text-white"><X className="w-3 h-3"/></button>
                                            </div>
                                        )}
                                        <textarea
                                            value={newCommentText}
                                            onChange={(e) => setNewCommentText(e.target.value)}
                                            placeholder={replyingTo ? "Write your reply..." : "Add a comment..."}
                                            className={`w-full bg-white/5 border border-white/10 ${replyingTo ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'} p-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-aurora-teal/50 focus:ring-1 focus:ring-aurora-teal/50 resize-none h-24 transition-all`}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmitComment(e as unknown as React.FormEvent);
                                                }
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newCommentText.trim()}
                                            className="absolute right-3 bottom-3 p-2 text-aurora-teal hover:bg-aurora-teal/10 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                {isAuthenticated && (
                                    <div className="text-xs text-white/30 mt-2 flex items-center justify-between px-1">
                                        <span>Press Enter to send, Shift + Enter for new line</span>
                                        <span className="flex items-center gap-1"><Bell className="w-3 h-3"/> Notifications Active</span>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
