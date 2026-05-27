import { Hero } from '../components/Hero';
import { BlogGrid } from '../components/BlogGrid';
import { VideoBackground } from '../components/VideoBackground';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Home = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
    const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

    return (
        <div className="relative min-h-screen">
            <NoiseOverlay />
            <VideoBackground />

            <div className="relative z-10 font-sans">
                <main className="relative">
                    <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-0">
                        <Hero />
                    </motion.div>
                    <div className="relative z-10">
                        <BlogGrid />
                    </div>
                </main>
            </div>
        </div>
    );
};
