import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/posts';

export const BlogGrid = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.2 });

    useEffect(() => {
        if (!isInView) {
            setActiveIndex(null);
        }
    }, [isInView]);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 relative z-10" id="articles">
            <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50 min-h-[500px] flex flex-col justify-center transition-all duration-700">
                <motion.div 
                    layout
                    className={`w-full flex ${activeIndex === null ? 'flex-col items-center' : 'flex-col md:flex-row gap-12 lg:gap-20'}`}
                >
                    
                    {/* Left Sidebar / Centered List */}
                    <motion.div 
                        layout
                        className={`flex flex-col shrink-0 ${
                            activeIndex === null ? 'w-full max-w-xl' : 'w-full md:w-1/4'
                        }`}
                    >
                        <motion.h3 
                            layout
                            className={`text-sm font-semibold text-slate-400 tracking-widest uppercase mb-6 ${
                                activeIndex === null ? 'text-center' : 'px-6'
                            }`}
                        >
                            {activeIndex === null ? 'Pilih Topik Artikel' : 'Daftar Topik'}
                        </motion.h3>
                        <motion.div layout className="flex flex-col gap-2">
                            {blogPosts.map((post, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <motion.button
                                        layout
                                        key={post.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`transition-all duration-300 w-full ${
                                            activeIndex === null
                                                ? 'px-6 py-5 text-center text-slate-800 font-semibold text-lg hover:bg-white/80 rounded-xl hover:shadow-sm'
                                                : `text-left px-6 py-4 rounded-xl ${
                                                    isActive 
                                                        ? 'bg-blue-600/10 text-blue-700 font-semibold shadow-sm' 
                                                        : 'text-slate-600 hover:bg-white/50 font-medium'
                                                }`
                                        }`}
                                    >
                                        {post.title}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Content */}
                    <AnimatePresence mode="wait">
                        {activeIndex !== null && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, filter: 'blur(10px)', x: 20 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                                exit={{ opacity: 0, filter: 'blur(10px)', x: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full md:w-3/4 flex flex-col lg:flex-row gap-10"
                            >
                                <div className="flex-1 flex flex-col">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                        {blogPosts[activeIndex].title}
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed text-justify">
                                        {blogPosts[activeIndex].description}
                                    </p>
                                    
                                    {blogPosts[activeIndex].category !== 'TBA' && (
                                        <Link 
                                            to={`/article/${blogPosts[activeIndex].id}`} 
                                            className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors w-max group bg-white/60 hover:bg-white px-6 py-3 rounded-full shadow-sm border border-white/50"
                                        >
                                            Read Article
                                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                                <div className="w-full lg:w-5/12 shrink-0">
                                    {blogPosts[activeIndex].coverImage ? (
                                        <img 
                                            src={blogPosts[activeIndex].coverImage} 
                                            alt={blogPosts[activeIndex].imageAlt}
                                            className="w-full h-auto object-cover rounded-2xl shadow-md border border-white/50"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video bg-black/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/30">
                                            <span className="text-slate-500 font-medium text-sm uppercase tracking-widest text-center px-4">
                                                {blogPosts[activeIndex].category === 'TBA' ? 'Coming Soon' : 'No Image Available'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
