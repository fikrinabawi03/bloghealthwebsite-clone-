import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface InteractiveReaderProps {
    content: string;
}

export const InteractiveReader: React.FC<InteractiveReaderProps> = ({ content }) => {
    const blocks = useMemo(() => {
        if (typeof window === 'undefined') return [content];
        const div = document.createElement('div');
        div.innerHTML = content;
        
        const extractedBlocks: string[] = [];
        Array.from(div.children).forEach(child => {
            // Ignore isolated <br> tags
            if (child.tagName.toLowerCase() !== 'br') {
                extractedBlocks.push(child.outerHTML);
            }
        });
        
        return extractedBlocks.length > 0 ? extractedBlocks : [content];
    }, [content]);

    return (
        <div className="w-full relative py-8">
            {/* Scroll Container */}
            <div className="flex flex-row md:flex-col overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-visible snap-x snap-mandatory md:snap-none w-[100vw] md:w-full -ml-[50vw] left-1/2 relative md:ml-0 md:left-auto md:h-auto gap-6 md:gap-12 px-6 md:px-0 pb-12 pt-4 scrollbar-hide">
                
                {blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ 
                            duration: 0.6, 
                            type: 'spring', 
                            stiffness: 100,
                            damping: 20
                        }}
                        className="snap-center shrink-0 w-[85vw] md:w-full min-h-[50vh] md:min-h-[200px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group"
                    >
                        {/* Decorative glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Content */}
                        <div 
                            className="prose prose-invert max-w-none prose-p:text-white/90 prose-p:font-light prose-p:leading-[1.8] prose-p:text-lg md:prose-p:text-xl prose-p:text-justify relative z-10"
                            dangerouslySetInnerHTML={{ __html: block }} 
                        />
                    </motion.div>
                ))}
                
                {/* Spacer for mobile to allow last item to center */}
                <div className="shrink-0 w-[5vw] md:hidden" />
            </div>
        </div>
    );
};
