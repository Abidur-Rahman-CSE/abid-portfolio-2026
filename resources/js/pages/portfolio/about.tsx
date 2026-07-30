import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Cpu, Layers, ShieldCheck, CheckCircle2, Code2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PortfolioLayout from '@/layouts/PortfolioLayout';

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

export default function About() {
    const [activeCodeFile, setActiveCodeFile] = useState<keyof typeof codeSnippets>('llm_router.py');

    return (
        <PortfolioLayout>
            <Head title="About | Abidur Rahman - Senior Software Engineer" />

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
                
                {/* Header */}
                <div className="max-w-3xl">
                    <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">// ABOUT ABIDUR RAHMAN</div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                        Engineered for Resilience, Scalability & Performance
                    </h1>
                    <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                        I am a Senior Software & AI Engineer. My engineering focus is on distributed backend architecture, high-concurrency event pipelines, full-stack reactive applications, and interactive 3D WebGL web platforms.
                    </p>
                </div>

                {/* Grid Info */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6 text-slate-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                        <p>
                            With over 5 years of software development experience, I design production systems capable of handling thousands of requests per second without compromising data integrity.
                        </p>
                        <p>
                            I build clean, maintainable software architectures—leveraging Laravel, React, Inertia, and TypeScript for responsive user interfaces, and Golang, Python, and Rust for high-throughput backend services.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                                <Cpu className="w-5 h-5 text-teal-600 dark:text-[#00F0FF] mb-2" />
                                <h4 className="font-bold text-sm mb-1">Distributed Backend</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400">Go, Kafka, Redis & Microservices</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                                <Layers className="w-5 h-5 text-indigo-600 dark:text-[#A855F7] mb-2" />
                                <h4 className="font-bold text-sm mb-1">Full-Stack Inertia/React</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400">Laravel 13, React 19 & Three.js</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="p-8 rounded-2xl bg-white/70 dark:bg-gradient-to-br dark:from-[#0c0c16] dark:to-[#050508] border border-slate-200/80 dark:border-white/15 shadow-2xl backdrop-blur-xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-[#00F0FF]" /> Core Engineering Principles
                            </h3>
                            <ul className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <span><strong>Clean Architecture & Scalability:</strong> Domain-Driven Design (DDD), SOLID principles, and loose coupling.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <span><strong>High Throughput SLA:</strong> Sub-20ms P99 response times using non-blocking I/O and memory pooling.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <span><strong>Test-Driven Engineering:</strong> High unit/integration test coverage and zero-downtime CI/CD deployment pipelines.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Code Playground Section */}
                <div className="border-t border-slate-200 dark:border-white/10 pt-16">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-2">// CODE PLAYGROUND</div>
                        <h2 className="text-3xl font-extrabold">Production Engineering Patterns</h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-slate-900 text-white shadow-2xl overflow-hidden font-mono text-xs max-w-4xl mx-auto">
                        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between overflow-x-auto">
                            <div className="flex gap-2">
                                {(Object.keys(codeSnippets) as Array<keyof typeof codeSnippets>).map(file => (
                                    <button
                                        key={file}
                                        onClick={() => setActiveCodeFile(file)}
                                        className={`px-3 py-1.5 rounded-lg transition-all text-xs flex items-center gap-2 cursor-pointer ${
                                            activeCodeFile === file 
                                                ? 'bg-teal-500/20 text-[#00F0FF] border border-teal-500/40 font-semibold' 
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <Code2 className="w-3.5 h-3.5" />
                                        {file}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 overflow-x-auto text-gray-300 bg-[#050508] max-h-[400px] leading-relaxed">
                            <pre><code>{codeSnippets[activeCodeFile]}</code></pre>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center border-t border-slate-200 dark:border-white/10 pt-12">
                    <Link href="/experience" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 dark:bg-[#00F0FF] text-white dark:text-black font-bold text-xs hover:bg-slate-900 dark:hover:bg-white transition-colors shadow-lg cursor-pointer">
                        View Career Experience & Timeline <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </PortfolioLayout>
    );
}
