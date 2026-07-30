import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Cpu, Activity } from 'lucide-react';
import PortfolioLayout from '@/layouts/PortfolioLayout';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    url: string | null;
    image: string | null;
}

export default function ProjectShow({ project }: { project: Project }) {
    return (
        <PortfolioLayout>
            <Head title={`${project.title} | Architecture Case Study`} />

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
                
                {/* Back Link */}
                <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#00F0FF] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to All Projects
                </Link>

                {/* Hero Header */}
                <div className="space-y-4">
                    <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// ARCHITECTURE CASE STUDY</div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags?.map(tag => (
                            <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cover Image */}
                {project.image && (
                    <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[380px] relative">
                        <img 
                            src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`} 
                            alt={project.title} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    </div>
                )}

                {/* Deep Dive Grid */}
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-7 space-y-6 text-gray-300 leading-relaxed">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#00F0FF]" /> System Overview
                        </h2>
                        <p>{project.description}</p>
                        
                        <h3 className="text-lg font-bold text-white pt-4">Technical Architecture Solved</h3>
                        <p className="text-sm text-gray-400">
                            High-concurrency platforms suffer from lock contention and memory allocation bottlenecks. This architecture uses asynchronous thread pools, non-blocking I/O, and Redis memory caching to maintain predictable sub-second response times.
                        </p>
                    </div>

                    <div className="md:col-span-5 space-y-6">
                        {/* Metrics Card */}
                        <div className="p-6 rounded-2xl bg-[#090910] border border-white/15 space-y-4">
                            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-purple-400" /> System Metrics
                            </h3>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Target Latency:</span>
                                    <span className="text-[#00F0FF] font-mono font-bold">&lt; 20ms P99</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Reliability SLA:</span>
                                    <span className="text-emerald-400 font-mono font-bold">99.99% Uptime</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-400">Concurrency:</span>
                                    <span className="text-purple-400 font-mono font-bold">50k+ events/sec</span>
                                </div>
                            </div>
                        </div>

                        {/* External Link */}
                        {project.url && (
                            <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                            >
                                View Source on GitHub <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
