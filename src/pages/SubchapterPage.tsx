import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts, ArticleChapter, Subchapter } from '../data/posts';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { CommentableContent } from '../components/CommentableContent';

export const SubchapterPage = () => {
    const { id, subId } = useParams();
    const post = blogPosts.find(p => p.id === Number(id));

    // Find the specific subchapter
    let currentChapter: ArticleChapter | undefined;
    let currentSubchapter: Subchapter | undefined;

    if (post?.articleChapters) {
        for (const chapter of post.articleChapters) {
            let foundSub = chapter.subchapters.find(s => s.id === subId);
            
            if (!foundSub) {
                for (const sub of chapter.subchapters) {
                    if (sub.subchapters) {
                        const nestedSub = sub.subchapters.find(s => s.id === subId);
                        if (nestedSub) {
                            foundSub = nestedSub;
                            break;
                        }
                    }
                }
            }

            if (foundSub) {
                currentChapter = chapter;
                currentSubchapter = foundSub;
                break;
            }
        }
    }

    if (!post || !currentSubchapter || !currentChapter) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
                    <Link to={`/article/${id}`} className="text-aurora-teal hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Table of Contents
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-black text-white pt-32 pb-32">
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
                <div className="absolute inset-0 bg-black/[0.95]" />
            </div>

            <NoiseOverlay />
            {/* Background ambient glow based on category color */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-aurora-${post.color}/10 blur-[120px] rounded-full opacity-30`} />
            </div>

            <article className="max-w-3xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Breadcrumbs Navigation */}
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm tracking-widest uppercase mb-12 text-white/40">
                        <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Home
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to={`/article/${post.id}`} className="hover:text-white transition-colors text-aurora-teal">
                            {post.title}
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/80">{currentChapter.title}</span>
                    </div>

                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aurora-${post.color}`}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-bold tracking-widest uppercase text-aurora-${post.color}`}>
                                {currentChapter.title}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            {currentSubchapter.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white/60 text-sm mb-8 font-medium tracking-wide">
                            <span className="uppercase tracking-widest">{post.author || 'Muhammad Fikri Nabawi'}</span>
                            <span className="text-white/30">•</span>
                            <span className="uppercase tracking-widest">{post.date || 'March 10, 2026'}</span>
                        </div>
                        <div className={`w-24 h-1 bg-gradient-to-r from-aurora-${post.color} to-transparent rounded-full`} />
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <CommentableContent content={currentSubchapter.content} documentId={`${post.id}-${currentSubchapter.id}`} isSubchapter />
                </motion.div>

                {/* Bottom Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-24 pt-12 border-t border-white/10 flex justify-center"
                >
                    <Link
                        to={`/article/${post.id}`}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium tracking-widest uppercase">Return to Index</span>
                    </Link>
                </motion.div>
            </article>
        </div>
    );
};
