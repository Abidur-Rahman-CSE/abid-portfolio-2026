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
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-[#00F0FF] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to All Projects
                </Link>

                {/* Hero Header */}
                <div className="space-y-4">
                    <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// ARCHITECTURE CASE STUDY</div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags?.map(tag => (
                            <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-teal-500/10 dark:bg-[#00F0FF]/10 text-teal-600 dark:text-[#00F0FF] border border-teal-500/20 dark:border-[#00F0FF]/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cover Image */}
                {project.image && (
                    <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/15 shadow-2xl h-[380px] relative backdrop-blur-xl">
                        <img 
                            src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`} 
                            alt={project.title} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#050505] via-transparent to-transparent opacity-60" />
                    </div>
                )}

                {/* Deep Dive Grid */}
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-7 space-y-6 text-slate-700 dark:text-gray-300 leading-relaxed">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-teal-600 dark:text-[#00F0FF]" /> System Overview
                        </h2>
                        <p>{project.description}</p>
                        
                        <h3 className="text-lg font-bold pt-4">Technical Architecture Solved</h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                            High-concurrency platforms suffer from lock contention and memory allocation bottlenecks. This architecture uses asynchronous thread pools, non-blocking I/O, and Redis memory caching to maintain predictable sub-second response times.
                        </p>
                    </div>

                    <div className="md:col-span-5 space-y-6">
                        {/* Metrics Card */}
                        <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#090910] border border-slate-200/80 dark:border-white/15 backdrop-blur-xl space-y-4 shadow-md">
                            <h3 className="text-sm font-bold font-mono flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-indigo-600 dark:text-purple-400" /> System Metrics
                            </h3>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/10">
                                    <span className="text-slate-500 dark:text-gray-400">Target Latency:</span>
                                    <span className="text-teal-600 dark:text-[#00F0FF] font-mono font-bold">&lt; 20ms P99</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/10">
                                    <span className="text-slate-500 dark:text-gray-400">Reliability SLA:</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">99.99% Uptime</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate-500 dark:text-gray-400">Concurrency:</span>
                                    <span className="text-indigo-600 dark:text-purple-400 font-mono font-bold">50k+ events/sec</span>
                                </div>
                            </div>
                        </div>

                        {/* External Link */}
                        {project.url && (
                            <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] dark:from-[#00F0FF] dark:to-[#00A3FF] text-white dark:text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
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
