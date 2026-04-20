import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();

    // Determine active links or paths here
    const getLinkPath = (name: string) => {
        if (name === 'ABOUT') return '/about';
        if (name === 'ARTICLES' || name === 'EXPERTISE' || name === 'CONTACT') {
            // For now, redirect home or use hash if we are on home.
            return location.pathname === '/' ? `#${name.toLowerCase()}` : `/#${name.toLowerCase()}`;
        }
        return '/';
    };

    const links = ['ARTICLES', 'ABOUT'];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 md:py-6 px-6 md:px-16 flex justify-between items-center"
            >
                <Link
                    to="/"
                    className="font-serif italic text-2xl tracking-tighter mix-blend-difference relative z-50 hover:opacity-80 transition-opacity"
                >
                    A.V
                </Link>

                <div className="hidden md:flex gap-12">
                    {links.map((link, i) => (
                        <motion.div
                            key={link}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.5 }}
                            whileHover={{ y: -2 }}
                        >
                            <Link
                                to={getLinkPath(link)}
                                className="text-xs tracking-[0.3em] font-medium text-white/70 hover:text-aurora-emerald transition-colors"
                            >
                                {link}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden md:flex items-center gap-4 z-50">
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="text-xs font-bold tracking-widest uppercase text-white hover:text-aurora-teal transition-colors px-6 py-2 rounded-full border border-white/10 hover:bg-white/5"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-1.5 pl-1.5 pr-4 transition-all"
                            >
                                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-tr from-aurora-teal to-aurora-purple flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        user?.username?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <span className="text-sm font-medium text-white/90">{user?.username}</span>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
                                    >
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Toggle & Auth */}
                <div className="md:hidden relative z-50 flex items-center gap-4">
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
                        >
                            <UserIcon className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-tr from-aurora-teal to-aurora-purple flex items-center justify-center text-white text-xs font-bold overflow-hidden"
                        >
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                                user?.username?.charAt(0).toUpperCase()
                            )}
                        </button>
                    )}
                    
                    <AnimatePresence>
                        {isProfileOpen && isAuthenticated && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-12 top-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
                            >
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsProfileOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-aurora-teal transition-colors focus:outline-none"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
                    >
                        <div className="flex flex-col gap-8 items-center text-center">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                >
                                    <Link
                                        to={getLinkPath(link)}
                                        onClick={() => setIsOpen(false)} // Close menu on click
                                        className="text-2xl font-serif italic tracking-widest text-white hover:text-aurora-emerald transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};
