'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Cpu, 
  Database, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Award, 
  Layers, 
  LineChart, 
  Mail, 
  MapPin, 
  GitBranch
} from 'lucide-react';

// Animated counter component for modern UX
function Counter({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function CarbonMitraDetails() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'learnings'>('overview');

  return (
    <div className="min-h-screen bg-[#060807] text-[#E2E8F0] font-sans antialiased relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background Decorative Gradients - Premium Aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600/5 to-emerald-500/10 blur-[150px] pointer-events-none z-0" />
      
      {/* Tiny Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/#work" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#94A3B8] hover:text-[#10B981] transition-colors duration-300 mb-12 group"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981]">
                Featured Project
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#3B82F6]">
                Sustainability & AI
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              CarbonMitra
              <span className="block text-2xl md:text-3xl font-light text-[#94A3B8] mt-2">
                Sustainability Analytics Platform
              </span>
            </h1>

            <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
              A comprehensive full-stack sustainability platform engineered to enable users and organizations to monitor, analyze, and reduce their carbon footprint. Utilizing advanced calculation engines, Redis-cached analytics, and Cohere AI-driven recommendations, CarbonMitra empowers individuals to transition towards eco-friendly habits.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0D1512]/60 border border-[#1E293B] rounded-xl p-4 backdrop-blur-md">
                <span className="block text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase mb-1">Duration</span>
                <span className="text-sm font-bold text-white">Full-Stack Project</span>
              </div>
              <div className="bg-[#0D1512]/60 border border-[#1E293B] rounded-xl p-4 backdrop-blur-md">
                <span className="block text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase mb-1">Role</span>
                <span className="text-sm font-bold text-emerald-400">Full Stack Developer</span>
              </div>
              <div className="bg-[#0D1512]/60 border border-[#1E293B] rounded-xl p-4 backdrop-blur-md">
                <span className="block text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase mb-1">Status</span>
                <span className="text-sm font-bold text-blue-400">Completed</span>
              </div>
              <div className="bg-[#0D1512]/60 border border-[#1E293B] rounded-xl p-4 backdrop-blur-md">
                <span className="block text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase mb-1">Target</span>
                <span className="text-sm font-bold text-white">ATS & ESG Ready</span>
              </div>
            </div>

            {/* Links CTA */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://vercel.com/milind24/carbon-tracker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#060807] text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg shadow-emerald-500/10 transition-all duration-300"
              >
                Live Demo
                <ArrowUpRight size={14} />
              </a>
              <a 
                href="https://github.com/Milindverma24/carbon_tracker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0E1714] hover:bg-[#15231F] border border-[#10B981]/30 hover:border-[#10B981]/60 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub Code
              </a>
            </div>
          </div>

          {/* Quick Metrics (ATS Friendly and visually striking) */}
          <div className="lg:col-span-4 bg-[#0A0D0C]/80 border border-[#1E293B] rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-6">Development Metrics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-semibold text-[#94A3B8]">Modules Developed</span>
                <span className="text-xl font-bold text-white"><Counter end={8} /></span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-semibold text-[#94A3B8]">APIs Integrated</span>
                <span className="text-xl font-bold text-white"><Counter end={7} /></span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-semibold text-[#94A3B8]">Technologies Used</span>
                <span className="text-xl font-bold text-emerald-400"><Counter end={11} /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#94A3B8]">Core Features Built</span>
                <span className="text-xl font-bold text-blue-400"><Counter end={12} /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 gap-6 mb-12 overflow-x-auto pb-px">
          {(['overview', 'features', 'architecture', 'learnings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-widest pb-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-[#10B981] text-emerald-400' 
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mb-16">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-xl font-bold text-white">Platform Summary</h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  CarbonMitra enables individuals and enterprise entities to track environmental footprint profiles over dynamic operational scopes. The UI is custom built to deliver high usability, responsiveness, and dark-themed sleek styling.
                </p>
                <div className="bg-[#0E1714] border border-[#10B981]/15 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Key Project Highlights</h3>
                  <ul className="space-y-2 text-xs text-[#E2E8F0]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Built a highly scalable full-stack app adhering strictly to standard REST architectural practices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Implemented secure authentication protocols utilizing state-of-the-art JWT & Google OAuth.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Optimized analytical queries by configuring high-throughput Redis caching databases.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Configured detailed multi-category carbon engines targeting transport, energy, food, & logistics.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="border border-[#1E293B] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md p-2 group shadow-xl">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden">
                    <Image
                      src="/projects/carbon_mitra.png"
                      alt="CarbonMitra Dashboard Screenshot"
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase font-semibold">Interactive Platform Dashboard mockup</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURES TAB */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: <LineChart className="text-emerald-400" size={20} />, 
                  title: "Carbon Footprint Tracking", 
                  desc: "Log daily activities across transportation, electricity usage, diets, and consumer habits to quantify precise emissions." 
                },
                { 
                  icon: <Layers className="text-blue-400" size={20} />, 
                  title: "Interactive Analytics Dashboard", 
                  desc: "Modern graphs showing emission levels, monthly deviations, category metrics, and sustainable progress." 
                },
                { 
                  icon: <Cpu className="text-emerald-400" size={20} />, 
                  title: "AI-powered Eco Assistant", 
                  desc: "Integrated Cohere AI model providing custom sustainability tips based on historical emission logs." 
                },
                { 
                  icon: <ShieldCheck className="text-blue-400" size={20} />, 
                  title: "Secure Authentication", 
                  desc: "Enterprise-grade authorization utilizing JWT keys and seamless Google OAuth integration." 
                },
                { 
                  icon: <MapPin className="text-emerald-400" size={20} />, 
                  title: "Eco-Friendly Routing", 
                  desc: "Uses OSRM and Leaflet Maps to calculate lower-carbon travel paths for routine transport." 
                },
                { 
                  icon: <Mail className="text-blue-400" size={20} />, 
                  title: "Email Reports & Alerting", 
                  desc: "Uses Resend service to fire weekly summaries, milestone achievements, and profile goal alerts." 
                }
              ].map((feature, i) => (
                <div key={i} className="bg-[#0A0D0C]/80 border border-[#1E293B] rounded-xl p-5 hover:border-[#10B981]/30 transition-all duration-300 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* ARCHITECTURE TAB */}
          {activeTab === 'architecture' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-white">Full-Stack Data Flow</h2>
              
              {/* Architecture Diagram Visualization */}
              <div className="bg-[#0A0D0C]/70 border border-[#1E293B] rounded-2xl p-6 md:p-8 backdrop-blur-md overflow-x-auto">
                <div className="min-w-[600px] grid grid-cols-3 gap-6 relative">
                  
                  {/* Column 1: Client Front-End */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest text-center mb-4">Client Layer</h3>
                    <div className="bg-[#0D1512] border border-[#10B981]/25 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">React.js App</div>
                      <div className="text-[10px] text-[#94A3B8]">Vite & Tailwind CSS</div>
                    </div>
                    <div className="bg-[#0D1512] border border-[#10B981]/25 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">Material UI</div>
                      <div className="text-[10px] text-[#94A3B8]">Interactive Dashboard & Leaflet</div>
                    </div>
                  </div>

                  {/* Column 2: Backend API Service */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest text-center mb-4">Application Services</h3>
                    <div className="bg-[#0E1714] border border-[#10B981]/35 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">Spring Boot API Gateway</div>
                      <div className="text-[10px] text-emerald-400">Spring Security & JWT</div>
                    </div>
                    <div className="bg-[#0E1714] border border-[#10B981]/35 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">Carbon Engine Module</div>
                      <div className="text-[10px] text-[#94A3B8]">Calculation Engine</div>
                    </div>
                  </div>

                  {/* Column 3: Data Store & External APIs */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest text-center mb-4">Databases & Integrations</h3>
                    <div className="bg-[#0D1512] border border-blue-500/25 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">PostgreSQL & Redis</div>
                      <div className="text-[10px] text-blue-400">Primary DB & Cache Layer</div>
                    </div>
                    <div className="bg-[#0D1512] border border-blue-500/25 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-white mb-1">External Integrations</div>
                      <div className="text-[10px] text-[#94A3B8]">Cohere AI, Resend, OSRM</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Technologies details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Cpu size={16} />
                    Frontend Stack
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Built using **React.js** bootstrapped with **Vite** for rapid bundling. Stylized with **Tailwind CSS** utilities and UI modularity from **Material UI**. Map services run via **Leaflet Maps** APIs.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Server size={16} />
                    Backend Stack
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    High performance REST microservices powered by **Java** and **Spring Boot**. Secure validation managed by **Spring Security** filter-chains and sign-on validation keys.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Database size={16} />
                    Data & Caching
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Uses relational schema setups in **PostgreSQL** databases, paired with low-latency memory lookup indexes mapped on **Redis** keys to accelerate carbon dashboards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LEARNINGS TAB */}
          {activeTab === 'learnings' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Challenges Faced */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                    Challenges Faced
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4 border-l-2 border-red-500">
                      <h4 className="text-xs font-bold text-white mb-1">State Synchronicity and Speed</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        Rendering highly complex graphs in real-time while loading mapping APIs caused UI lag and latency on low-end test client viewports.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border-l-2 border-red-500">
                      <h4 className="text-xs font-bold text-white mb-1">Configurable Calculation Engines</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        Formulating a standardized mathematical calculation model mapping varied carbon factors (transit rates, calorie types, regional grids) dynamically.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Solutions Implemented */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Solutions Implemented
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4 border-l-2 border-emerald-500">
                      <h4 className="text-xs font-bold text-white mb-1">Redis Caching & Lazy Loading</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        Configured Redis cache keys for heavy query results and structured Leaflet scripts to bundle lazy-loaded dependencies.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border-l-2 border-emerald-500">
                      <h4 className="text-xs font-bold text-white mb-1">Isolated Rule Engines</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        Isolated carbon metrics configuration properties into server-side environment metadata databases, letting administrators refresh rates without recompiling code.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Core Learnings & Future Enhancements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="bg-white/5 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Award size={14} className="text-emerald-400" />
                    Key Learnings
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    This project strengthened my skills in **Java backend architecture** and integration workflows. I learned how to build high-performance data pipelines with **Redis** and how to orchestrate advanced authorization filters with **Spring Security** and JWT tokens.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-blue-400" />
                    Future Enhancements
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Plans include building native mobile apps using **React Native**, developing automated utility bill scraping APIs, and adding cooperative league systems where groups can run carbon mitigation contests.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Call to action */}
        <div className="border border-white/5 rounded-2xl p-8 bg-[#090D0C]/80 text-center space-y-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white">Interested in reviewing the code?</h2>
          <p className="text-xs text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            The complete source code for CarbonMitra is fully documented, containing extensive test suites and build files. Check the GitHub repository or launch the live dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://github.com/Milindverma24/carbon_tracker"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-400 text-[#060807] text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <GitBranch size={12} />
              GitHub Repository
            </a>
            <a 
              href="https://vercel.com/milind24/carbon-tracker"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg border border-white/10 transition-colors duration-300"
            >
              Live Demo Link
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
