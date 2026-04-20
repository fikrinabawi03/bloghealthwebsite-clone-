import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/posts';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { ComicArticle } from '../components/ComicArticle';
import { CommentableContent } from '../components/CommentableContent';
import { useState, useEffect } from 'react';

export const ArticlePage = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === Number(id));

    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (post?.type === 'structured' && post.articleChapters?.[0]) {
            setActiveId(post.articleChapters[0].id);
        }
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <Link to="/" className="text-aurora-teal hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-black text-white pt-32 pb-20">
            {/* Ambient bg video */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/assets/bg-video.mp4" type="video/mp4" />
                </video>
                {/* 35% black overlay */}
                <div className="absolute inset-0 bg-black/[0.35]" />
            </div>

            <NoiseOverlay />

            {/* Background ambient glow based on category color */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-aurora-${post.color}/20 blur-[120px] rounded-full opacity-30`} />
            </div>

            <article className="max-w-4xl mx-auto p-8 md:p-12 relative z-10 bg-black/50 backdrop-blur-md border border-white/5 rounded-[17px] shadow-[0_0_40px_rgba(255,255,255,0.50)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm tracking-widest uppercase">Home</span>
                    </Link>

                    <div className="mb-16">
                        <span className={`text-sm font-bold tracking-widest uppercase text-aurora-${post.color} mb-6 block`}>
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white/60 text-sm mb-8 font-medium tracking-wide">
                            <span className="uppercase tracking-widest">{post.author || 'Muhammad Fikri Nabawi'}</span>
                        </div>
                        <p className="text-xl text-white/70 font-light leading-relaxed mb-8">
                            {post.description}
                        </p>
                        <div className={`w-24 h-1 bg-gradient-to-r from-aurora-${post.color} to-transparent rounded-full`} />
                    </div>
                </motion.div>

                {post.type === 'comic' ? (
                    <ComicArticle post={post} />
                ) : post.type === 'structured' && post.articleChapters ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-16 mt-16"
                    >
                        <h2 className="text-3xl font-light tracking-widest uppercase text-white/50 border-b border-white/10 pb-6 mb-12">
                            Table of Contents
                        </h2>

                        <div className="relative pt-2">
                            {/* Continuous vertical line connector */}
                            <div className="absolute left-4 md:left-6 top-4 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                            {post.articleChapters.map((chapter) => (
                                <div key={chapter.id} className="relative mb-12">

                                    <div
                                        className="flex items-center gap-4 mb-4 relative pl-12 md:pl-16 cursor-pointer"
                                        onMouseEnter={() => setActiveId(chapter.id)}
                                        onClick={() => setActiveId(chapter.id)}
                                    >
                                        <div className="absolute left-[11px] md:left-[19px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/20" />

                                        {activeId === chapter.id && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className={`absolute left-[11px] md:left-[19px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aurora-${post.color} shadow-[0_0_15px_currentColor] z-10`}
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}

                                        <h3 className="text-2xl font-bold text-white capitalize">
                                            {chapter.title}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 mt-6">
                                        {chapter.subchapters.map((sub, i) => (
                                            <div
                                                key={sub.id}
                                                className="relative pl-12 md:pl-16"
                                                onMouseEnter={() => setActiveId(sub.id)}
                                                onClick={() => setActiveId(sub.id)}
                                            >
                                                <div className="absolute left-[30px] md:left-[38px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/20 bg-black" />

                                                {activeId === sub.id && (
                                                    <motion.div
                                                        layoutId="active-indicator"
                                                        className={`absolute left-[30px] md:left-[38px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-aurora-${post.color} shadow-[0_0_10px_currentColor] z-10`}
                                                        initial={false}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                <Link
                                                    to={`/article/${post.id}/read/${sub.id}`}
                                                    className={`group relative bg-white/5 rounded-2xl p-6 transition-all duration-300 overflow-hidden block border shadow-lg cursor-pointer ${activeId === sub.id ? `bg-white/10 border-aurora-${post.color} shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-[1.02]` : 'border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02]'}`}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r from-aurora-${post.color}/10 to-transparent opacity-0 transition-opacity duration-500 ${activeId === sub.id ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                                                    <div className="flex items-center justify-between relative z-10">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-full bg-black/50 border flex items-center justify-center transition-colors ${activeId === sub.id ? `border-aurora-${post.color} text-aurora-${post.color}` : `border-white/10 text-white/50 group-hover:text-aurora-${post.color}`}`}>
                                                                <span className="text-xs font-bold">{i + 1}</span>
                                                            </div>
                                                            <span className={`text-lg md:text-xl font-medium transition-colors ${activeId === sub.id ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                                                                {sub.title}
                                                            </span>
                                                        </div>
                                                        <ChevronRight className={`w-5 h-5 transition-all ${activeId === sub.id ? `text-aurora-${post.color} translate-x-1` : `text-white/30 group-hover:text-aurora-${post.color} group-hover:translate-x-1`}`} />
                                                    </div>
                                                </Link>

                                                {/* Nested Subchapters */}
                                                {sub.subchapters && sub.subchapters.length > 0 && (
                                                    <div className="grid grid-cols-1 gap-3 mt-4 ml-8 border-l-2 border-white/5 pl-6 relative">
                                                        {sub.subchapters.map((subsub, j) => (
                                                            <div
                                                                key={subsub.id}
                                                                className="relative"
                                                                onMouseEnter={(e) => { e.stopPropagation(); setActiveId(subsub.id); }}
                                                                onMouseLeave={(e) => { e.stopPropagation(); setActiveId(sub.id); }}
                                                                onClick={(e) => { e.stopPropagation(); setActiveId(subsub.id); }}
                                                            >
                                                                {activeId === subsub.id && (
                                                                    <motion.div
                                                                        layoutId="active-indicator"
                                                                        className={`absolute -left-[29px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-aurora-${post.color} shadow-[0_0_10px_currentColor] z-10`}
                                                                        initial={false}
                                                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                                    />
                                                                )}
                                                                <Link
                                                                    to={`/article/${post.id}/read/${subsub.id}`}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className={`group relative bg-white/5 rounded-xl p-4 transition-all duration-300 overflow-hidden block border shadow-sm cursor-pointer ${activeId === subsub.id ? `bg-white/10 border-aurora-${post.color} shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.01]` : 'border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01]'}`}
                                                                >
                                                                    <div className={`absolute inset-0 bg-gradient-to-r from-aurora-${post.color}/5 to-transparent opacity-0 transition-opacity duration-500 ${activeId === subsub.id ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                                                                    <div className="flex items-center justify-between relative z-10">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className={`w-6 h-6 rounded-full bg-black/50 border flex items-center justify-center transition-colors ${activeId === subsub.id ? `border-aurora-${post.color} text-aurora-${post.color}` : `border-white/10 text-white/50 group-hover:text-aurora-${post.color}`}`}>
                                                                                <span className="text-[10px] font-bold">{i + 1}.{j + 1}</span>
                                                                            </div>
                                                                            <span className={`text-base font-medium transition-colors ${activeId === subsub.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                                                                {subsub.title}
                                                                            </span>
                                                                        </div>
                                                                        <ChevronRight className={`w-4 h-4 transition-all ${activeId === subsub.id ? `text-aurora-${post.color} translate-x-1` : `text-white/30 group-hover:text-aurora-${post.color} group-hover:translate-x-1`}`} />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Hero Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full h-[400px] md:h-[500px] bg-white/5 rounded-[2rem] border border-white/10 mb-16 relative overflow-hidden group flex items-center justify-center"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-tr from-aurora-${post.color}/20 to-transparent opacity-50`} />
                            <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-md relative z-10">
                                <span className="text-sm text-center text-white/50 tracking-widest uppercase px-6">
                                    Featured<br />Image
                                </span>
                            </div>
                        </motion.div>

                        {/* Article Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <CommentableContent content={post.content} documentId={`article-${post.id}`} />
                        </motion.div>
                    </>
                )}
            </article>
        </div>
    );
};
