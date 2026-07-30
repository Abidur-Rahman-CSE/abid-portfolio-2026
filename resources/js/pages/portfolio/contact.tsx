import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PortfolioLayout from '@/layouts/PortfolioLayout';

export default function Contact() {
    const { props } = usePage();
    const flash = props.flash as { success?: string };
    const [copiedEmail, setCopiedEmail] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('abid@example.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <PortfolioLayout>
            <Head title="Contact | Abidur Rahman" />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="rounded-3xl bg-gradient-to-br from-[#0c0c16] to-[#050508] border border-white/15 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">// LET'S CONNECT</div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Initialize Engineering Communication
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Looking to hire a Senior Software Engineer, build scalable AI architecture, or discuss complex system design? Send a direct message below.
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-gray-200">
                                <span>abid@example.com</span>
                                <button onClick={copyEmail} className="text-gray-400 hover:text-[#00F0FF] transition-colors">
                                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {flash?.success && (
                        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-center text-sm font-medium">
                            {flash.success}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="bg-[#050508] border-white/10 focus:border-[#00F0FF] text-white h-12 rounded-xl text-sm"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="bg-[#050508] border-white/10 focus:border-[#00F0FF] text-white h-12 rounded-xl text-sm"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <Textarea
                                placeholder="Message / Project Details..."
                                rows={6}
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="bg-[#050508] border-white/10 focus:border-[#00F0FF] text-white rounded-xl text-sm"
                            />
                            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] hover:from-[#00A3FF] hover:to-[#00F0FF] text-black font-extrabold h-13 rounded-xl transition-all shadow-lg shadow-[#00F0FF]/20"
                        >
                            {processing ? 'Transmitting Message...' : 'Send Message'}
                        </Button>
                    </form>
                </div>
            </div>
        </PortfolioLayout>
    );
}
