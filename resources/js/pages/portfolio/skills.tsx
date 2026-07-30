import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import PortfolioLayout from '@/layouts/PortfolioLayout';

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
                
                {/* Header */}
                <div className="max-w-3xl">
                    <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">// TECHNICAL MASTERY</div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Software Engineering Arsenal
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A comprehensive matrix of programming languages, frameworks, AI models, and cloud tools I use to engineer robust software architectures.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(groupedSkills).map(([category, catSkills], idx) => (
                        <motion.div 
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-[#09090f]/90 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300"
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
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00F0FF] text-black font-bold text-xs hover:bg-white transition-colors">
                        Initiate Engineering Contact <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </PortfolioLayout>
    );
}
