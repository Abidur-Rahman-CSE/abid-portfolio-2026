import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import PortfolioLayout from '@/layouts/PortfolioLayout';

const experiences = [
    {
        period: "2023 - PRESENT",
        role: "Senior Software & AI Engineer",
        company: "Nexus Technologies",
        description: "Architected real-time AI inference pipelines and high-throughput microservices. Reduced P99 system latency by 65% while handling over 10M requests daily.",
        achievements: [
            "Engineered distributed LLM inference cluster with vLLM & gRPC",
            "Led backend refactoring to Go & Rust microservices",
            "Mentored 6 junior/mid-level software engineers"
        ],
        skills: ["Go", "PyTorch", "Kubernetes", "gRPC", "Kafka"]
    },
    {
        period: "2021 - 2023",
        role: "Full Stack Systems Engineer",
        company: "Apex Enterprise Solutions",
        description: "Developed mission-critical web applications with Laravel, React, and Inertia.js. Integrated automated CI/CD pipelines with zero-downtime deployment.",
        achievements: [
            "Built modular ERP platform used by 50,000+ active enterprise users",
            "Optimized SQL query execution time by 80% with indexing & caching strategies",
            "Automated testing suite achieving 92% code coverage"
        ],
        skills: ["Laravel", "React", "TypeScript", "PostgreSQL", "Docker"]
    },
    {
        period: "2019 - 2021",
        role: "Software Developer",
        company: "Innovation Labs",
        description: "Built scalable REST & GraphQL APIs, microservices, and interactive web UIs for client projects across fintech and AI domains.",
        achievements: [
            "Designed real-time event streaming dashboards using WebSockets & Redis",
            "Implemented OAuth2 & JWT security protocol across 10+ internal services"
        ],
        skills: ["Python", "JavaScript", "Redis", "MySQL", "AWS"]
    }
];

export default function Experience() {
    return (
        <PortfolioLayout>
            <Head title="Career Experience | Abidur Rahman" />

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
                
                {/* Header */}
                <div className="max-w-3xl">
                    <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">// CAREER TRAJECTORY</div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Professional Engineering Experience
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A track record of architecting scalable distributed systems, leading software engineering teams, and shipping production applications.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-[#00F0FF] before:via-[#7000FF] before:to-transparent">
                    {experiences.map((exp, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className="relative flex flex-col sm:flex-row items-start group"
                        >
                            {/* Dot on Timeline */}
                            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050508] border-2 border-[#00F0FF] group-hover:scale-125 group-hover:bg-[#00F0FF] transition-all duration-300 z-10" />

                            <div className={`w-full sm:w-[45%] pl-12 sm:pl-0 ${idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'}`}>
                                <div className="p-6 rounded-2xl bg-[#09090f]/90 backdrop-blur-lg border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300">
                                    <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                                        {exp.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                    <div className="text-sm text-purple-400 font-semibold mb-4">{exp.company}</div>
                                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                                    
                                    <ul className="space-y-1.5 text-xs text-gray-400 mb-4 text-left">
                                        {exp.achievements.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.skills.map((s, i) => (
                                            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center border-t border-white/10 pt-12">
                    <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00F0FF] text-black font-bold text-xs hover:bg-white transition-colors">
                        Explore Featured Projects & Case Studies <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </PortfolioLayout>
    );
}
