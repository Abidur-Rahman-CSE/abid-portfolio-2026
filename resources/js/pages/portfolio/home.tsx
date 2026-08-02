import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, Cpu, Layers, Activity, ChevronRight, Box, Code2, Zap, Server, MessageSquare, Quote, Mail, Check, Copy, Star, Network, Layers3 } from 'lucide-react';
import { useState } from 'react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ThreeCanvas, { SERVICE_NODES } from '@/components/ThreeCanvas';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    url: string | null;
    image: string | null;
}

const codeSnippets = {
    "llm_router.py": `# High-Throughput Async Inference Router
import asyncio
from typing import AsyncGenerator

class LLMRouter:
    def __init__(self, cluster_nodes: list[str]):
        self.nodes = cluster_nodes
        self.lock = asyncio.Lock()

    async def dispatch_prompt(self, prompt: str) -> AsyncGenerator[str, None]:
        node = await self._select_optimal_node()
        async for chunk in node.stream_inference(prompt):
            yield chunk

    async def _select_optimal_node(self):
        # Dynamic load balancing based on GPU VRAM telemetry
        return min(self.nodes, key=lambda n: n.current_gpu_utilization)`,
        
    "event_stream.go": `// High-Velocity Event Consumer Pipeline
package main

import (
	"context"
	"log"
	"github.com/segmentio/kafka-go"
)

type TelemetryProcessor struct {
	reader *kafka.Reader
}

func (tp *TelemetryProcessor) StartWorkerPool(ctx context.Context, workers int) {
	for i := 0; i < workers; i++ {
		go func(workerID int) {
			for {
				msg, err := tp.reader.ReadMessage(ctx)
				if err != nil { return }
				tp.processMessage(msg.Value)
			}
		}(i)
	}
}`,

    "architecture.ts": `// Inertia.js Event Bus & Optimistic UI State
import { router } from '@inertiajs/react';

export function useOptimisticMutation<T>(endpoint: string) {
    const execute = async (payload: T) => {
        router.post(endpoint, payload as any, {
            preserveScroll: true,
            onSuccess: () => console.log('State synchronized with server'),
            onError: (err) => console.error('Rollback executed', err),
        });
    };
    return { execute };
}`
};

const testimonials = [
    {
        quote: "Abidur's architectural vision transformed our data streaming pipeline. He delivered sub-20ms latency under extreme load while keeping code immensely clean.",
        name: "Marcus Vance",
        role: "VP of Engineering",
        company: "Apex Enterprise Systems"
    },
    {
        quote: "An extraordinary engineer who bridges the gap between deep AI GPU inference and high-performance WebGL web frontends effortlessly.",
        name: "Dr. Elena Rostova",
        role: "Lead AI Research Scientist",
        company: "Nexus AI Labs"
    },
    {
        quote: "Working with Abidur is a masterclass in full-stack engineering. His Laravel and React integration is crisp, reliable, and beautifully tested.",
        name: "David Chen",
        role: "Senior Product Manager",
        company: "Genesis Tech Solutions"
    }
];

const architecturePillars = [
    {
        icon: Zap,
        title: "High-Concurrency Streaming",
        description: "Event-driven microservices engineered with Go, Apache Kafka, and Redis memory clusters capable of processing 50,000+ msgs/sec.",
        color: "text-[#0D9488] dark:text-[#00F0FF]"
    },
    {
        icon: Cpu,
        title: "LLM & GPU Inference Cluster",
        description: "Distributed AI model serving with PyTorch, vLLM, and gRPC with dynamic KV caching and sub-20ms P99 latency SLAs.",
        color: "text-purple-600 dark:text-[#A855F7]"
    },
    {
        icon: Layers,
        title: "Reactive Full-Stack Architecture",
        description: "Modern single-page web applications built on Laravel 13, Inertia.js v3, React 19, and Tailwind CSS v4 with zero-lag state synchronization.",
        color: "text-emerald-600 dark:text-emerald-400"
    },
    {
        icon: Server,
        title: "Cloud Infrastructure & GitOps",
        description: "Automated provisioning with Terraform, Docker containerization, Kubernetes orchestration, and automated zero-downtime CI/CD pipelines.",
        color: "text-indigo-600 dark:text-[#00A3FF]"
    }
];

export default function Home({ featuredProjects }: { featuredProjects: Project[] }) {
    const [terminalTab, setTerminalTab] = useState<'status' | 'nodes' | 'stack'>('status');
    const [viewMode, setViewMode] = useState<'architecture' | 'dataflow'>('architecture');
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [activeCodeFile, setActiveCodeFile] = useState<keyof typeof codeSnippets>('llm_router.py');
    const [copiedSnippet, setCopiedSnippet] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(codeSnippets[activeCodeFile]);
        setCopiedSnippet(true);
        setTimeout(() => setCopiedSnippet(false), 2000);
    };

    return (
        <PortfolioLayout>
            <Head title="Abidur Rahman | Senior Software & AI Engineer" />

            {/* 1. HERO SECTION */}
            <section className="py-16 px-6 max-w-7xl mx-auto min-h-[88vh] flex flex-col justify-center">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {/* Live Status Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 font-mono text-xs backdrop-blur-md">
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 dark:bg-emerald-400 animate-pulse" />
                            <span>Available for Senior Engineering Roles & AI Consulting</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                            Architecting <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 dark:from-[#00F0FF] dark:via-[#A855F7] dark:to-[#EC4899]">
                                High-Throughput
                            </span> Systems & AI
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-2xl leading-relaxed font-normal">
                            Specializing in distributed microservices, GPU AI inference pipelines, reactive full-stack web platforms (Laravel/React/Inertia/TypeScript), and interactive 3D WebGL experiences.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link 
                                href="/projects" 
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] dark:from-[#00F0FF] dark:to-[#00A3FF] text-white dark:text-black font-extrabold flex items-center gap-2 shadow-lg shadow-[#0D9488]/20 dark:shadow-[#00F0FF]/25 hover:scale-[1.02] transition-all cursor-pointer"
                            >
                                Explore Projects <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a 
                                href="https://github.com/Abidur-Rahman-CSE" 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-7 py-4 rounded-xl bg-white/80 border border-slate-300 text-slate-800 hover:border-teal-500 dark:bg-[#090914]/90 dark:border-white/15 dark:text-white dark:hover:border-[#00F0FF]/50 dark:hover:text-[#00F0FF] font-semibold flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md hover:scale-[1.02] shadow-sm"
                            >
                                GitHub Profile <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Impact Metrics Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 dark:border-white/10 pt-8">
                            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-sm dark:bg-[#090914]/90 dark:border-white/10 dark:text-white backdrop-blur-xl hover:border-teal-500/40 dark:hover:border-[#00F0FF]/40 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold font-mono">99.99%</div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Uptime Target SLA</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-sm dark:bg-[#090914]/90 dark:border-white/10 dark:text-white backdrop-blur-xl hover:border-teal-500/40 dark:hover:border-[#00F0FF]/40 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-[#00F0FF] font-mono">50k+</div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Events / Sec Throughput</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-sm dark:bg-[#090914]/90 dark:border-white/10 dark:text-white backdrop-blur-xl hover:border-teal-500/40 dark:hover:border-[#00F0FF]/40 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold font-mono">5+ Yrs</div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Software Engineering</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-sm dark:bg-[#090914]/90 dark:border-white/10 dark:text-white backdrop-blur-xl hover:border-teal-500/40 dark:hover:border-[#00F0FF]/40 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-[#A855F7] font-mono">15+</div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Shipped Systems</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Right Interactive Intelligent Platform Architecture & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* 3D Intelligent Platform Architecture Card */}
                        <div className="rounded-2xl border bg-white/85 border-slate-200/80 text-slate-900 shadow-xl dark:bg-[#090914]/90 dark:border-white/15 dark:text-white backdrop-blur-2xl overflow-hidden font-mono text-sm relative flex flex-col justify-between">
                            
                            {/* Card Top Header */}
                            <div className="bg-slate-100/90 text-slate-900 border-slate-200 dark:bg-[#0f0f1c] dark:text-white border-b dark:border-white/10 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Box className="w-4 h-4 text-teal-600 dark:text-[#00F0FF]" />
                                    <span className="text-xs font-bold font-sans">Intelligent Platform Architecture</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" /> Live System
                                    </span>
                                    <button
                                        onClick={() => setViewMode(prev => prev === 'architecture' ? 'dataflow' : 'architecture')}
                                        className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1 cursor-pointer font-sans ${
                                            viewMode === 'dataflow'
                                                ? 'bg-teal-600 text-white dark:bg-[#00F0FF] dark:text-black font-bold' 
                                                : 'bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {viewMode === 'architecture' ? <Network className="w-3 h-3" /> : <Layers3 className="w-3 h-3" />}
                                        <span className="capitalize">{viewMode}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Main 3D Visualization Area (Occupies ~70% visual space) */}
                            <div className="h-[380px] sm:h-[400px] w-full relative">
                                <ThreeCanvas 
                                    viewMode={viewMode} 
                                    onNodeSelect={(nodeId) => setSelectedNodeId(nodeId)} 
                                />

                                {/* Bottom System Status Overlay */}
                                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-700 dark:text-gray-300 bg-white/70 dark:bg-black/60 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Platform Operational</span>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-3">
                                        <span>6 Connected Services</span>
                                        <span>&bull;</span>
                                        <span className="text-teal-600 dark:text-[#00F0FF]">Real-time Data Flow</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Redesigned Realistic Engineering Terminal Card */}
                        <div className="rounded-2xl border bg-white/85 border-slate-200/80 text-slate-900 shadow-xl dark:bg-[#090914]/90 dark:border-white/15 dark:text-white backdrop-blur-2xl overflow-hidden font-mono text-sm">
                            <div className="bg-slate-100/90 text-slate-700 border-slate-200 dark:bg-[#0f0f1c] dark:text-gray-400 border-b dark:border-white/10 px-4 py-2.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    <span className="text-xs ml-1 flex items-center gap-1.5">
                                        <Terminal className="w-3.5 h-3.5 text-teal-600 dark:text-[#00F0FF]" /> abid-platform-core — running
                                    </span>
                                </div>
                                <div className="flex gap-1 text-xs">
                                    <button 
                                        onClick={() => setTerminalTab('status')} 
                                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${terminalTab === 'status' ? 'bg-teal-500/20 text-teal-700 dark:text-[#00F0FF]' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        status
                                    </button>
                                    <button 
                                        onClick={() => setTerminalTab('nodes')} 
                                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${terminalTab === 'nodes' ? 'bg-teal-500/20 text-teal-700 dark:text-[#00F0FF]' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        services
                                    </button>
                                    <button 
                                        onClick={() => setTerminalTab('stack')} 
                                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${terminalTab === 'stack' ? 'bg-teal-500/20 text-teal-700 dark:text-[#00F0FF]' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        stack
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 text-xs leading-relaxed min-h-[140px] bg-slate-50 text-slate-800 dark:bg-[#070710] dark:text-gray-300">
                                {terminalTab === 'status' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0.5">
                                        <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">● abid-platform-core — running</div>
                                        <div>[OK] Laravel API Gateway connected</div>
                                        <div>[OK] React client synchronized</div>
                                        <div>[OK] PostgreSQL data layer healthy</div>
                                        <div>[OK] AI vision worker available</div>
                                        <div>[OK] Workflow queue processing</div>
                                        <div>[OK] Production runtime operational</div>
                                    </motion.div>
                                )}

                                {terminalTab === 'nodes' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                                        <div className="text-teal-600 dark:text-[#00F0FF] font-bold">CONNECTED PLATFORM SERVICES (6)</div>
                                        {SERVICE_NODES.map(n => (
                                            <div key={n.id} className="flex items-center justify-between text-[11px]">
                                                <span>&bull; {n.title}</span>
                                                <span className="text-emerald-600 dark:text-emerald-400">ONLINE</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {terminalTab === 'stack' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="text-indigo-600 dark:text-yellow-400 font-mono">
                                            ["Laravel 13", "React 19", "Inertia.js v3", "TypeScript", "PostgreSQL", "AI Vision", "Docker"]
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. CORE ARCHITECTURE PILLARS */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// SYSTEM DESIGN PILLARS</div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Core Software Engineering Foundations</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">
                        Building mission-critical software systems requiring ultra-fast execution, zero downtime, and clean modular code.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {architecturePillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-2xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-md hover:shadow-xl hover:border-teal-500/50 dark:bg-[#090914]/90 dark:border-white/10 dark:text-white dark:hover:border-[#00F0FF]/40 dark:hover:shadow-2xl backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-[#00F0FF] transition-colors mb-3">{pillar.title}</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed">{pillar.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 3. FEATURED PROJECTS SHOWCASE */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-2">// FEATURED WORK</div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Highlighted Software Projects</h2>
                    </div>
                    <Link href="/projects" className="text-xs font-mono text-teal-600 dark:text-[#00F0FF] hover:underline flex items-center gap-1 transition-colors">
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
                            className="bg-white/80 border border-slate-200/80 text-slate-900 shadow-md hover:shadow-xl hover:border-teal-500/50 dark:bg-[#090914]/90 dark:border-white/10 dark:text-white dark:hover:border-[#00F0FF]/40 dark:hover:shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden transition-all flex flex-col group"
                        >
                            {project.image && (
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#090914] via-transparent to-transparent opacity-80" />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-[#00F0FF] transition-colors mb-2">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-xs mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags?.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-teal-700 border border-slate-200 dark:bg-white/5 dark:text-[#00F0FF] dark:border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link 
                                    href={`/projects/${project.id}`}
                                    className="text-xs font-bold text-teal-600 border-t border-slate-200 dark:text-[#00F0FF] dark:border-white/10 flex items-center gap-1 hover:underline transition-colors pt-3 cursor-pointer"
                                >
                                    Read Architecture Case Study <Activity className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. LIVE PRODUCTION CODE PLAYGROUND WIDGET */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// PRODUCTION CODE PATTERNS</div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Clean Code Architecture Snippets</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-sm">Inspecting live asynchronous code routines, stream consumer workers, and optimistic UI hooks.</p>
                </div>

                <div className="rounded-2xl border border-slate-300 bg-slate-950 text-white shadow-2xl dark:border-white/15 dark:bg-[#090914]/90 overflow-hidden font-mono text-xs max-w-4xl mx-auto backdrop-blur-xl">
                    <div className="bg-slate-900 border-b border-slate-800 dark:bg-[#0f0f1c] dark:border-white/10 px-4 py-3 flex items-center justify-between overflow-x-auto">
                        <div className="flex gap-2">
                            {(Object.keys(codeSnippets) as Array<keyof typeof codeSnippets>).map(file => (
                                <button
                                    key={file}
                                    onClick={() => setActiveCodeFile(file)}
                                    className={`px-3 py-1.5 rounded-lg transition-all text-xs flex items-center gap-2 cursor-pointer ${
                                        activeCodeFile === file 
                                            ? 'bg-teal-500/20 text-teal-400 dark:text-[#00F0FF] border border-teal-500/40 font-semibold' 
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Code2 className="w-3.5 h-3.5" />
                                    {file}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={copyCode}
                            className="px-3 py-1 rounded bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                        >
                            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>

                    <div className="p-6 overflow-x-auto text-gray-300 bg-[#050508] max-h-[380px] leading-relaxed">
                        <pre><code>{codeSnippets[activeCodeFile]}</code></pre>
                    </div>
                </div>
            </section>

            {/* 5. PEER TESTIMONIALS & ENDORSEMENTS */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// ENDORSEMENTS & RECOMMENDATIONS</div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Engineering Leadership Testimonials</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-2xl bg-white/80 border border-slate-200/80 text-slate-900 shadow-md hover:shadow-xl dark:bg-[#090914]/90 dark:border-white/10 dark:text-white backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative"
                        >
                            <Quote className="w-8 h-8 text-teal-500/20 dark:text-[#00F0FF]/20 absolute top-6 right-6" />
                            
                            <div className="flex items-center gap-1 text-amber-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm italic mb-8 leading-relaxed relative z-10">
                                "{item.quote}"
                            </p>

                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                                <div className="text-xs text-teal-600 dark:text-[#00F0FF] font-mono">{item.role}</div>
                                <div className="text-[11px] text-slate-500 dark:text-gray-500">{item.company}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6. GLASSMORPHIC CONTACT CTA BANNER */}
            <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="rounded-3xl bg-gradient-to-r from-teal-50/90 via-indigo-50/90 to-purple-50/90 border border-teal-200 shadow-xl dark:from-teal-900/40 dark:via-indigo-900/30 dark:to-purple-900/40 dark:border-teal-500/30 p-10 sm:p-16 backdrop-blur-2xl text-center space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-[#00F0FF] font-mono text-xs">
                        <MessageSquare className="w-3.5 h-3.5" /> Open for Engineering Consulting & Opportunities
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Ready to Build Scalable Systems?
                    </h2>

                    <p className="text-slate-600 dark:text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
                        Whether you are scaling high-concurrency microservices, deploying GPU AI models, or building full-stack WebGL applications, let's connect.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link 
                            href="/contact" 
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] dark:from-[#00F0FF] dark:to-[#00A3FF] text-white dark:text-black font-extrabold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                        >
                            Initiate Direct Contact <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a 
                            href="mailto:abidur.rahman.dev@gmail.com"
                            className="px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 dark:bg-black/50 dark:border-white/20 dark:text-white font-bold text-sm hover:border-teal-500 dark:hover:border-[#00F0FF] transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md shadow-sm"
                        >
                            <Mail className="w-4 h-4 text-teal-600 dark:text-[#00F0FF]" /> Direct Email
                        </a>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
