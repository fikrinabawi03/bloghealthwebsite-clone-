import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '../data/posts';

const VisualDisplay = ({ post }: { post: BlogPost }) => {
    const isTBA = post.category === 'TBA';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center absolute inset-0"
        >
            <div className="w-full aspect-square max-h-[600px] bg-white/5 rounded-[2rem] relative flex items-center justify-center overflow-hidden border border-white/10 group">
                {/* Decorative radial gradient based on category color */}
                <div className={`absolute inset-0 bg-aurora-${post.color || 'teal'}/20 blur-[80px] scale-150 opacity-50 transition-opacity duration-700`} />

                {isTBA ? (
                     <div className="w-48 h-48 rounded-3xl border border-white/10 relative z-10 flex items-center justify-center bg-black/50 backdrop-blur-md grayscale opacity-50">
                        <span className="text-sm text-center text-white/30 tracking-widest uppercase">
                            Coming<br />Soon
                        </span>
                    </div>
                ) : post.coverImage ? (
                    <img
                        src={post.coverImage}
                        alt={post.imageAlt}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                    />
                ) : (
                    <div className={`w-48 h-48 rounded-3xl border border-aurora-${post.color || 'teal'}/30 rotate-12 transition-transform duration-700 relative z-10 flex items-center justify-center bg-black/50 backdrop-blur-md`}>
                        <span className="text-sm text-center text-white/50 tracking-widest uppercase">
                            3D Model<br />Placeholder
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ArticleItem = ({ post, index, activeIndex, setActiveIndex }: { post: BlogPost, index: number, activeIndex: number, setActiveIndex: (idx: number) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    const isActive = activeIndex === index;
    const isTBA = post.category === 'TBA';

    return (
        <div ref={ref} className={`transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} flex flex-col gap-6 py-12 md:py-24`}>
            {/* Mobile Visual (Visible only on mobile) */}
            <div className="md:hidden w-full h-64 rounded-3xl overflow-hidden relative">
                <div className="w-full h-full bg-white/5 relative flex items-center justify-center overflow-hidden border border-white/10">
                    <div className={`absolute inset-0 bg-aurora-${post.color || 'teal'}/20 blur-[80px] scale-150 opacity-50`} />
                    {isTBA ? (
                         <div className="w-32 h-32 rounded-3xl border border-white/10 relative z-10 flex items-center justify-center bg-black/50 backdrop-blur-md grayscale opacity-50">
                            <span className="text-xs text-center text-white/30 tracking-widest uppercase">Coming<br />Soon</span>
                        </div>
                    ) : post.coverImage ? (
                        <img src={post.coverImage} alt={post.imageAlt} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                    ) : (
                        <div className={`w-32 h-32 rounded-3xl border border-aurora-${post.color || 'teal'}/30 rotate-12 relative z-10 flex items-center justify-center bg-black/50 backdrop-blur-md`}>
                            <span className="text-xs text-center text-white/50 tracking-widest uppercase">3D Model<br />Placeholder</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
                <span className={`text-xs font-bold tracking-widest uppercase text-aurora-${post.color || 'teal'} mb-4 block`}>
                    {post.category}
                </span>
                <h3 className="text-3xl lg:text-5xl font-semibold mb-6 text-white leading-tight">
                    {post.title}
                </h3>
                <p className="text-white/70 font-light text-lg leading-relaxed mb-8">
                    {post.description}
                </p>

                {!isTBA && (
                    <Link to={`/article/${post.id}`} className="flex items-center gap-4 group w-max mt-4">
                        <span className="text-sm tracking-widest text-white/60 uppercase font-medium group-hover:text-white transition-colors">Read Article</span>
                        <motion.div
                            className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-aurora-${post.color || 'teal'} group-hover:text-aurora-${post.color || 'teal'} transition-colors`}
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export const BlogGrid = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 md:py-32 px-6 relative z-10" id="articles">
            <div className="max-w-7xl mx-auto mb-8 md:mb-16">
                <ScrollReveal className="mb-8" direction="up">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Recent <br />
                        <span className="font-serif italic text-aurora-teal text-glow">Article</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-aurora-teal to-transparent rounded-full" />
                </ScrollReveal>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-24 relative">
                {/* Left Column - Scrollable Text */}
                <div className="w-full md:w-1/2 flex flex-col md:py-[20vh]">
                    {blogPosts.map((post, index) => (
                        <ArticleItem 
                            key={post.id} 
                            post={post} 
                            index={index} 
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex} 
                        />
                    ))}
                </div>

                {/* Right Column - Sticky Visuals (Desktop only) */}
                <div className="hidden md:block w-1/2 sticky top-0 h-screen">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                            <VisualDisplay key={activeIndex} post={blogPosts[activeIndex]} />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
