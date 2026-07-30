import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity } from 'lucide-react';
import { useState } from 'react';
import PortfolioLayout from '@/layouts/PortfolioLayout';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    url: string | null;
    image: string | null;
}

export default function Projects({ projects }: { projects: Project[] }) {
    const [activeTab, setActiveTab] = useState<string>('All');

    const filteredProjects = projects.filter(p => {
        if (activeTab === 'All') return true;
        if (activeTab === 'AI & ML Systems') return p.tags?.some(t => ['PyTorch', 'vLLM', 'C++', 'CUDA', 'TensorRT', 'OpenCV'].includes(t));
        if (activeTab === 'Backend & Cloud') return p.tags?.some(t => ['Golang', 'Apache Kafka', 'Redis', 'Docker', 'Terraform', 'AWS', 'Python'].includes(t));
        if (activeTab === 'Full Stack & Inertia') return p.tags?.some(t => ['Laravel', 'Laravel 13', 'React', 'React 19', 'TypeScript', 'Inertia.js'].includes(t));
        return true;
    });

    return (
        <PortfolioLayout>
            <Head title="Projects Showcase | Abidur Rahman" />

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="text-teal-600 dark:text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">// PORTFOLIO OF WORK</div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Engineered Projects & Case Studies
                        </h1>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                        {['All', 'AI & ML Systems', 'Backend & Cloud', 'Full Stack & Inertia'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                    activeTab === tab 
                                        ? 'bg-teal-600 dark:bg-[#00F0FF] text-white dark:text-black shadow-md font-bold' 
                                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/60 dark:bg-[#0a0a10]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 dark:hover:border-[#00F0FF]/50 hover:shadow-2xl transition-all duration-300 flex flex-col group shadow-md"
                        >
                            {project.image && (
                                <div className="h-52 overflow-hidden relative">
                                    <img 
                                        src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-[#0a0a10] via-transparent to-transparent opacity-80" />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 dark:group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags?.map(tag => (
                                            <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-teal-700 dark:text-[#00F0FF] border border-slate-200 dark:border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                                    <Link 
                                        href={`/projects/${project.id}`}
                                        className="text-xs font-bold text-teal-600 dark:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                                    >
                                        Read Case Study <Activity className="w-3.5 h-3.5" />
                                    </Link>
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                                            Code <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PortfolioLayout>
    );
}
