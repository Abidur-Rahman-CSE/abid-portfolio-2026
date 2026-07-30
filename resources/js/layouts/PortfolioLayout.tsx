import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function PortfolioLayout({ children }: Props) {
    const { url } = usePage();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const navItems = [
        { name: 'Home', href: '/', active: url === '/' },
        { name: 'About', href: '/about', active: url.startsWith('/about') },
        { name: 'Experience', href: '/experience', active: url.startsWith('/experience') },
        { name: 'Projects', href: '/projects', active: url.startsWith('/projects') },
        { name: 'Skills', href: '/skills', active: url.startsWith('/skills') },
        { name: 'Contact', href: '/contact', active: url.startsWith('/contact') },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-[#D1D5DB] font-sans selection:bg-[#00F0FF] selection:text-black overflow-x-hidden relative flex flex-col justify-between">
            {/* Top Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#00F0FF] z-50 origin-left" 
                style={{ scaleX }} 
            />

            {/* Ambient Background Radial Lights */}
            <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#7000FF]/15 rounded-full blur-[160px] pointer-events-none z-0" />
            <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[180px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-[#7000FF]/10 rounded-full blur-[170px] pointer-events-none z-0" />

            {/* Subtle Grid Overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

            {/* Navigation Header */}
            <header className="fixed top-0 w-full z-40 bg-[#08080c]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#7000FF] p-[1px] shadow-lg shadow-[#00F0FF]/20 group-hover:scale-105 transition-transform">
                            <div className="w-full h-full bg-[#050508] rounded-[11px] flex items-center justify-center font-mono font-bold text-white text-sm">
                                AR
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-white tracking-tight text-lg group-hover:text-[#00F0FF] transition-colors">Abidur Rahman</span>
                            <span className="text-xs text-gray-400 block font-mono">Software & AI Architect</span>
                        </div>
                    </Link>

                    {/* Status Pill */}
                    <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Available for Senior Roles & Architecture Consulting
                    </div>

                    <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-md">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                                    item.active
                                        ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/30 font-bold'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <Link 
                        href="/contact"
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] text-black font-bold text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Contact
                    </Link>
                </div>
            </header>

            {/* Page Content Container */}
            <main className="relative z-10 pt-24 pb-16 flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-sm text-gray-500 relative z-10 bg-[#050508]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#7000FF] p-[1px]">
                            <div className="w-full h-full bg-[#050508] rounded-[7px] flex items-center justify-center font-mono font-bold text-white text-xs">
                                AR
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">Abidur Rahman &bull; Senior Software Engineer</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/Abidur-Rahman-CSE" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="mailto:abid@example.com" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>

                    <p className="text-xs text-gray-600 font-mono">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
