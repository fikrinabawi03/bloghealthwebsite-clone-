import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal = ({ children, delay = 0, className = '', direction = 'up' }: ScrollRevealProps) => {
    const getInitialState = () => {
        switch (direction) {
            case 'down': return { opacity: 0, y: -50, filter: 'blur(8px)' };
            case 'left': return { opacity: 0, x: -50, filter: 'blur(8px)' };
            case 'right': return { opacity: 0, x: 50, filter: 'blur(8px)' };
            case 'up':
            default: return { opacity: 0, y: 50, filter: 'blur(8px)' };
        }
    };

    const getInViewState = () => {
        switch (direction) {
            case 'down':
            case 'up': return { opacity: 1, y: 0, filter: 'blur(0px)' };
            case 'left':
            case 'right': return { opacity: 1, x: 0, filter: 'blur(0px)' };
        }
    };

    return (
        <motion.div
            initial={getInitialState()}
            whileInView={getInViewState()}
            viewport={{ once: false, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.16, 1, 0.3, 1] // Custom ease out cubic
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
