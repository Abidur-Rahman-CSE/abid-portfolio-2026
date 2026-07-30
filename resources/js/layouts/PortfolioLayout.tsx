import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, Sparkles, Sun, Moon } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import Background3D from '@/components/Background3D';

interface Props {
    children: ReactNode;
}

export default function PortfolioLayout({ children }: Props) {
    const { url } = usePage();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Dual Theme State: Default Dark mode (true)
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', next ? 'dark' : 'light');
            }
            return next;
        });
    };

    const navItems = [
        { name: 'Home', href: '/', active: url === '/' },
        { name: 'About', href: '/about', active: url.startsWith('/about') },
        { name: 'Experience', href: '/experience', active: url.startsWith('/experience') },
        { name: 'Projects', href: '/projects', active: url.startsWith('/projects') },
        { name: 'Skills', href: '/skills', active: url.startsWith('/skills') },
        { name: 'Contact', href: '/contact', active: url.startsWith('/contact') },
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden relative flex flex-col justify-between ${
            isDark 
                ? 'bg-[#030712] text-[#E2E8F0] selection:bg-[#00F0FF] selection:text-black dark' 
                : 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0D9488] selection:text-white'
        }`}>
            {/* Ambient 3D Three.js WebGL Background */}
            <Background3D isDark={isDark} />

            {/* Ambient Glowing Gradient Radial Blobs */}
            {isDark ? (
                <>
                    <div className="fixed top-[-15%] left-[15%] w-[650px] h-[650px] bg-[#00F0FF]/10 rounded-full blur-[180px] pointer-events-none z-0" />
                    <div className="fixed top-[35%] right-[-10%] w-[700px] h-[700px] bg-[#8B5CF6]/12 rounded-full blur-[200px] pointer-events-none z-0" />
                    <div className="fixed bottom-[-15%] left-[-5%] w-[600px] h-[600px] bg-[#EC4899]/08 rounded-full blur-[180px] pointer-events-none z-0" />
                </>
            ) : (
                <>
                    <div className="fixed top-[-15%] left-[15%] w-[650px] h-[650px] bg-[#0D9488]/10 rounded-full blur-[180px] pointer-events-none z-0" />
                    <div className="fixed top-[35%] right-[-10%] w-[700px] h-[700px] bg-[#6366F1]/10 rounded-full blur-[200px] pointer-events-none z-0" />
                </>
            )}

            {/* Subtle Grid Pattern Overlay */}
            <div className={`fixed inset-0 pointer-events-none z-0 ${
                isDark 
                    ? 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]' 
                    : 'bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]'
            }`} />

            {/* Top Scroll Progress Bar */}
            <motion.div 
                className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${
                    isDark 
                        ? 'bg-gradient-to-r from-[#00F0FF] via-[#8B5CF6] to-[#EC4899]' 
                        : 'bg-gradient-to-r from-[#0D9488] via-[#4F46E5] to-[#0284C7]'
                }`} 
                style={{ scaleX }} 
            />

            {/* Glassmorphism Navigation Header */}
            <header className={`fixed top-0 w-full z-40 backdrop-blur-2xl border-b transition-colors duration-500 ${
                isDark 
                    ? 'bg-[#030712]/90 border-white/10' 
                    : 'bg-white/85 border-slate-200/80 shadow-sm'
            }`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className={`w-10 h-10 rounded-xl p-[1px] shadow-xl transition-all duration-300 group-hover:scale-105 ${
                            isDark 
                                ? 'bg-gradient-to-br from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] shadow-[#00F0FF]/20' 
                                : 'bg-gradient-to-br from-[#0D9488] via-[#6366F1] to-[#0284C7] shadow-[#0D9488]/20'
                        }`}>
                            <div className={`w-full h-full rounded-[11px] flex items-center justify-center font-mono font-bold text-sm ${
                                isDark ? 'bg-[#030712] text-white' : 'bg-white text-slate-900'
                            }`}>
                                AR
                            </div>
                        </div>
                        <div>
                            <span className={`font-bold tracking-tight text-lg transition-colors ${
                                isDark ? 'text-white group-hover:text-[#00F0FF]' : 'text-slate-900 group-hover:text-[#0D9488]'
                            }`}>
                                Abidur Rahman
                            </span>
                            <span className="text-xs text-gray-400 block font-mono">Senior Software & AI Engineer</span>
                        </div>
                    </Link>

                    {/* Navigation Items */}
                    <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-xl backdrop-blur-md border ${
                        isDark ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100/90 border-slate-200'
                    }`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                    item.active
                                        ? isDark 
                                            ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/30 font-bold' 
                                            : 'bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/30 font-bold'
                                        : isDark 
                                            ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Header Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Theme Switcher Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                                isDark 
                                    ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10 hover:border-amber-400/50' 
                                    : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
                            }`}
                            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                        >
                            <motion.div 
                                key={isDark ? 'dark' : 'light'} 
                                initial={{ rotate: -90, opacity: 0 }} 
                                animate={{ rotate: 0, opacity: 1 }} 
                                transition={{ duration: 0.3 }}
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </motion.div>
                        </button>

                        <Link 
                            href="/contact"
                            className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:scale-105 cursor-pointer ${
                                isDark 
                                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] text-black shadow-lg shadow-[#00F0FF]/25' 
                                    : 'bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white shadow-lg shadow-[#0D9488]/25'
                            }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" /> Get in Touch
                        </Link>
                    </div>
                </div>
            </header>

            {/* Page Content Container */}
            <main className="relative z-10 pt-24 pb-16 flex-1">
                {children}
            </main>

            {/* Glassmorphic Footer */}
            <footer className={`py-12 border-t text-center text-sm relative z-10 transition-colors ${
                isDark ? 'bg-[#030712]/95 border-white/10 text-gray-400' : 'bg-slate-100/95 border-slate-200 text-slate-600'
            }`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg p-[1px] ${
                            isDark ? 'bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6]' : 'bg-gradient-to-br from-[#0D9488] to-[#4F46E5]'
                        }`}>
                            <div className={`w-full h-full rounded-[7px] flex items-center justify-center font-mono font-bold text-xs ${
                                isDark ? 'bg-[#030712] text-white' : 'bg-white text-slate-900'
                            }`}>
                                AR
                            </div>
                        </div>
                        <span className="text-xs font-mono">Abidur Rahman &bull; Senior Software & AI Engineer</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/Abidur-Rahman-CSE" target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40' : 'bg-slate-200 border-slate-300 text-slate-600 hover:text-[#0D9488]'
                        }`} title="GitHub Profile">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40' : 'bg-slate-200 border-slate-300 text-slate-600 hover:text-[#0D9488]'
                        }`} title="LinkedIn Profile">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="mailto:abidur.rahman.dev@gmail.com" className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40' : 'bg-slate-200 border-slate-300 text-slate-600 hover:text-[#0D9488]'
                        }`} title="Send Email">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>

                    <p className="text-xs font-mono">&copy; {new Date().getFullYear()} Abidur Rahman. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
