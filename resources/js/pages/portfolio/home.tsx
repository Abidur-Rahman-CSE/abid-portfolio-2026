import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Terminal, Sparkles, Cpu, Layers, Activity, ChevronRight, Eye, Box, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ThreeCanvas from '@/components/ThreeCanvas';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    url: string | null;
    image: string | null;
}

export default function Home({ featuredProjects }: { featuredProjects: Project[] }) {
    const [terminalTab, setTerminalTab] = useState<'status' | 'metrics' | 'stack'>('status');
    const [is3DWireframe, setIs3DWireframe] = useState(false);
    const [canvasColor, setCanvasColor] = useState('#00F0FF');

    return (
        <PortfolioLayout>
            <Head title="Abidur Rahman | Senior Software & AI Engineer" />

            {/* Hero Section */}
            <section className="py-16 px-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Hi, I'm Abidur Rahman &bull; Senior Software & AI Engineer</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            Architecting <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#7000FF]">
                                High-Throughput
                            </span> Systems & AI
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed font-normal">
                            I specialize in building distributed microservices, AI inference pipelines, reactive full-stack web applications (Laravel/React/Inertia/TypeScript), and interactive 3D WebGL experiences.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-14">
                            <Link href="/projects" className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-[1.02]">
                                Explore Projects <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a 
                                href="https://github.com/Abidur-Rahman-CSE" 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-7 py-4 rounded-xl bg-[#0d0d14] border border-white/15 text-white font-semibold flex items-center gap-2 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all"
                            >
                                GitHub Profile <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Engineering Impact Metrics Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.99%</div>
                                <div className="text-xs text-gray-400 font-medium">Uptime Target SLA</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#00F0FF] font-mono">50k+</div>
                                <div className="text-xs text-gray-400 font-medium">Events / Sec Throughput</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">5+ Yrs</div>
                                <div className="text-xs text-gray-400 font-medium">Software Engineering</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#A855F7] font-mono">15+</div>
                                <div className="text-xs text-gray-400 font-medium">Shipped Systems</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Right Interactive Three.js WebGL Core & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Three.js 3D WebGL Canvas Card */}
                        <div className="rounded-2xl border border-white/15 bg-[#09090e]/90 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono text-sm relative">
                            <div className="bg-[#12121c] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Box className="w-4 h-4 text-[#00F0FF]" />
                                    <span className="text-xs font-bold text-white">Three.js 3D Cyber Core</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIs3DWireframe(!is3DWireframe)}
                                        className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                                            is3DWireframe ? 'bg-[#00F0FF] text-black font-bold' : 'bg-white/5 text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        <Eye className="w-3 h-3" /> Wireframe
                                    </button>
                                </div>
                            </div>

                            {/* Three.js Canvas Container */}
                            <div className="h-[260px] relative">
                                <ThreeCanvas wireframe={is3DWireframe} color={canvasColor} />
                            </div>
                        </div>

                        {/* CLI IDE Terminal Widget */}
                        <div className="rounded-2xl border border-white/15 bg-[#09090e]/90 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono text-sm">
                            <div className="bg-[#12121c] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    <span className="text-xs text-gray-400 ml-1 flex items-center gap-1.5">
                                        <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" /> abid@engineer-node:~
                                    </span>
                                </div>
                                <div className="flex gap-1 text-xs">
                                    <button 
                                        onClick={() => setTerminalTab('status')} 
                                        className={`px-2 py-0.5 rounded transition-colors ${terminalTab === 'status' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        status
                                    </button>
                                    <button 
                                        onClick={() => setTerminalTab('metrics')} 
                                        className={`px-2 py-0.5 rounded transition-colors ${terminalTab === 'metrics' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        metrics
                                    </button>
                                    <button 
                                        onClick={() => setTerminalTab('stack')} 
                                        className={`px-2 py-0.5 rounded transition-colors ${terminalTab === 'stack' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        stack
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 text-xs leading-relaxed min-h-[140px]">
                                {terminalTab === 'status' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="text-emerald-400 font-bold">● abid-systems.service - Running</div>
                                        <div className="text-gray-300 pt-1">
                                            [OK] Three.js WebGL 3D Engine initialized<br />
                                            [OK] Genesis AI Allocation Engine active<br />
                                            [OK] Distributed GPU inference cluster active
                                        </div>
                                    </motion.div>
                                )}

                                {terminalTab === 'metrics' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                                        <div className="text-purple-400 font-bold">CORE PERFORMANCE METRICS</div>
                                        <div className="text-gray-300">
                                            WebGL Render Target: <span className="text-[#00F0FF]">60 FPS</span><br />
                                            Avg Latency P99     : <span className="text-[#00F0FF]">14.2ms</span>
                                        </div>
                                    </motion.div>
                                )}

                                {terminalTab === 'stack' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="text-yellow-400 font-mono">
                                            ["Laravel 13", "React 19", "Three.js", "Golang", "PyTorch", "Docker"]
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Highlights */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-2">// FEATURED WORK</div>
                        <h2 className="text-3xl font-extrabold text-white">Highlighted Software Projects</h2>
                    </div>
                    <Link href="/projects" className="text-xs font-mono text-[#00F0FF] hover:text-white flex items-center gap-1 transition-colors">
                        View All Projects <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a0a10]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#00F0FF]/40 transition-all flex flex-col group"
                        >
                            {project.image && (
                                <div className="h-44 overflow-hidden relative">
                                    <img 
                                        src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-xs mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                                </div>
                                <Link 
                                    href={`/projects/${project.id}`}
                                    className="text-xs font-bold text-[#00F0FF] flex items-center gap-1 hover:text-white transition-colors pt-3 border-t border-white/10"
                                >
                                    Read Architecture Case Study <Activity className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Navigation Cards Grid */}
            <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10">
                <div className="grid sm:grid-cols-3 gap-6">
                    <Link href="/about" className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00F0FF]/40 hover:bg-white/[0.04] transition-all group">
                        <Cpu className="w-8 h-8 text-[#00F0FF] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">About & Principles</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">Engineering philosophy, SOLID principles, and live architecture playground.</p>
                        <span className="text-xs font-mono text-[#00F0FF] flex items-center gap-1">Explore About &rarr;</span>
                    </Link>

                    <Link href="/experience" className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#7000FF]/40 hover:bg-white/[0.04] transition-all group">
                        <Layers className="w-8 h-8 text-[#A855F7] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Career Experience</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">Chronological software engineering trajectory, roles, and achievements.</p>
                        <span className="text-xs font-mono text-[#A855F7] flex items-center gap-1">View Experience &rarr;</span>
                    </Link>

                    <Link href="/skills" className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all group">
                        <Terminal className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Technical Arsenal</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">Full breakdown of programming languages, frameworks, cloud, and Three.js 3D WebGL.</p>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">Browse Arsenal &rarr;</span>
                    </Link>
                </div>
            </section>
        </PortfolioLayout>
    );
}
