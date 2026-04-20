import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Chrome, User as UserIcon } from 'lucide-react';
import { auth } from '../lib/firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    updateProfile 
} from 'firebase/auth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Google login error:", error);
            alert("Google login error: " + (error as any).message);
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (mode === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (username) {
                    await updateProfile(userCredential.user, { displayName: username });
                }
                onClose();
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                onClose();
            }
        } catch (error) {
            console.error("Email authentication error:", error);
            alert("Authentication error: " + (error as any).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex py-12 md:items-center justify-center overflow-y-auto"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black/80 border border-white/10 p-8 rounded-[2rem] shadow-2xl w-full max-w-md relative m-4"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-8 mt-2">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify Email'}
                                </h2>
                                <p className="text-white/50 text-sm">
                                    {mode === 'login' 
                                        ? 'Log in to join the conversation.' 
                                        : mode === 'signup'
                                            ? 'Sign up to reply and interact.'
                                            : `A verification code was sent to your email with Google Verification.`}
                                </p>
                            </div>

                            {mode !== 'verify' && (
                                <div className="space-y-4 mb-6">
                                    <button 
                                        onClick={handleGoogleLogin}
                                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors"
                                    >
                                        <Chrome className="w-5 h-5 text-red-500" />
                                        Continue with Google
                                    </button>
                                </div>
                            )}

                            {mode !== 'verify' && (
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">Or</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>
                            )}

                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                {mode === 'signup' && (
                                    <div>
                                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">Username</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                            <input
                                                type="text"
                                                required
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aurora-teal transition-colors"
                                                placeholder="Your display name"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                {mode !== 'verify' && (
                                    <>
                                        <div>
                                            <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">Email address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aurora-teal transition-colors"
                                                    placeholder="you@domain.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aurora-teal transition-colors"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </>
                                )}

                                {mode === 'verify' && (
                                    <div>
                                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">6-Digit Code</label>
                                        <input
                                            type="text"
                                            required
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-center tracking-[0.5em] focus:outline-none focus:border-aurora-teal transition-colors"
                                            placeholder="------"
                                            maxLength={6}
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-aurora-teal/20 text-aurora-teal font-semibold rounded-xl hover:bg-aurora-teal/30 transition-colors border border-aurora-teal/50 disabled:opacity-50"
                                >
                                    {isLoading ? 'Wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Continue' : 'Verify & Complete'}
                                </button>
                            </form>

                            {mode !== 'verify' && (
                                <div className="mt-6 text-center">
                                    <button 
                                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                        className="text-white/50 text-sm hover:text-white transition-colors"
                                    >
                                        {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
