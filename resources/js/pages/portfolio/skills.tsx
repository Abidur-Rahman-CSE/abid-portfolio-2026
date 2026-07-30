import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ThreeCanvas from '@/components/ThreeCanvas';

interface Skill {
    id: number;
    name: string;
    category: string;
    icon: string | null;
}

export default function Skills({ skills }: { skills: Skill[] }) {
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <PortfolioLayout>
            <Head title="Technical Arsenal | Abidur Rahman" />

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
                
                {/* Header & 3D Interactive WebGL Node Preview */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase">// TECHNICAL MASTERY & 3D WEBGL</div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Software Engineering Arsenal
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            A comprehensive matrix of programming languages, microservice architectures, Three.js WebGL rendering, AI models, and cloud tools.
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="h-64 rounded-2xl border border-white/15 bg-[#090914]/90 overflow-hidden shadow-2xl relative backdrop-blur-xl">
                            <ThreeCanvas color="#8B5CF6" speed={0.008} />
                            <div className="absolute top-3 left-3 text-xs font-mono text-[#00F0FF] bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
                                3D Polyhedron Node Network
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(groupedSkills).map(([category, catSkills], idx) => (
                        <motion.div 
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-[#090914]/90 backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <h3 className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-6 pb-3 border-b border-white/10 flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-[#00F0FF]" /> {category}
                            </h3>
                            <ul className="space-y-3.5">
                                {catSkills.map(skill => (
                                    <li key={skill.id} className="flex items-center justify-between text-sm text-gray-300 hover:text-white transition-colors">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                                            <span>{skill.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center border-t border-white/10 pt-12">
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00F0FF] text-black font-bold text-xs hover:bg-white transition-colors shadow-lg cursor-pointer">
                        Initiate Engineering Contact <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </PortfolioLayout>
    );
}
