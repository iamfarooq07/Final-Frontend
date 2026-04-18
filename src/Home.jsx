import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    // Component-level SVG Icons (No installation required)
    const Icons = {
        Sparkles: () => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 15L18 16.125l-1.125.125 1.125.125L18 17.5l.125-1.125L19.25 16.25l-1.125-.125L18.25 15z" />
            </svg>
        ),
        ArrowRight: () => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        ),
        Rocket: () => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a6 6 0 015.96 5.96z" />
            </svg>
        )
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white scroll-smooth">

            {/* 1. NAVBAR */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Icons.Sparkles />
                        </div>
                        <span className="text-2xl font-black tracking-tighter italic uppercase">Nova<span className="text-blue-600">.</span></span>
                    </div>
                    <div className="hidden md:flex gap-8 font-bold text-sm text-slate-600">
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#process" className="hover:text-blue-600 transition-colors">Process</a>
                        <a href="#footer" className="hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={"/login"} className="text-sm font-bold text-slate-600">Login</Link>
                        <Link to={"/register"} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 shadow-md">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* 2. HERO SECTION */}
            <section className="pt-48 pb-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-transparent">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
                        🚀 Final Project Prep
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mt-8 mb-6">
                        Building the next <br /> <span className="text-blue-600">Generation</span> of Apps.
                    </h1>
                    <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 font-medium italic">
                        MERN Stack ki power aur modern design ka combination. Hackathon ke liye perfect starter.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform">
                            Start Journey <Icons.ArrowRight />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* 3. FEATURES (The "Lambi" Grid) */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black mb-4">Powerful Features</h2>
                    <p className="text-slate-500 font-medium">Everything you need to win the competition.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Icons.Rocket />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Feature 0{item}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Modern UI/UX design integrated with high-performance backend systems for real-world applications.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. PROCESS SECTION (Visual Steps) */}
            <section id="process" className="py-32 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-5xl font-black leading-tight mb-8">How it works? <br /> <span className="text-blue-500">Simple & Effective.</span></h2>
                        <div className="space-y-8">
                            {['Define Project Scope', 'UI/UX Prototype', 'MERN Development', 'Cloud Deployment'].map((step, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <span className="text-4xl font-black text-blue-600/30">0{i + 1}</span>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">{step}</h4>
                                        <p className="text-slate-400 text-sm">Professional approach following industry standards.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 h-[400px] rounded-[3rem] shadow-2xl flex items-center justify-center">
                        <span className="text-white/20 font-black text-8xl italic">CODE</span>
                    </div>
                </div>
            </section>

            {/* 5. PROFESSIONAL FOOTER (Dark & Detailed) */}
            <footer id="footer" className="bg-white pt-24 pb-12 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Column 1: Brand */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Icons.Sparkles />
                                </div>
                                <span className="text-xl font-black tracking-tighter uppercase italic">Nova.</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Professional Full-Stack Developer solution for high-end web applications and modern SaaS products.
                            </p>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Explore</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
                                <li><a href="#" className="hover:text-blue-600">Components</a></li>
                                <li><a href="#" className="hover:text-blue-600">Cloud Storage</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Company */}
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
                                <li><a href="#" className="hover:text-blue-600">Contact Team</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Email address" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
                                <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800">
                                    <Icons.ArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="pt-10 border-t border-slate-100 flex flex-col md:row justify-between items-center gap-6">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 NOVA DIGITAL - KARACHI, PAKISTAN</p>
                        <div className="flex gap-8 font-black text-[10px] tracking-[0.2em] text-slate-400">
                            <span className="hover:text-blue-600 cursor-pointer">GITHUB</span>
                            <span className="hover:text-blue-600 cursor-pointer">LINKEDIN</span>
                            <span className="hover:text-blue-600 cursor-pointer">FACEBOOK</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;