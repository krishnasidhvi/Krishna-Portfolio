import React, { useState, useEffect } from 'react';
import { 
  Database, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Terminal,
  Download,
  Briefcase,
  MessageCircle
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' or 'avatar'

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubtitleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Background Animated Data Nodes / Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/10 to-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status & Availability Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-semibold text-white">Forward Deployment AI Engineer @ Trida Labs</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-cyan-300">Ex-Global Payments · Amazon · Vanguard</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">{personalInfo.name}</span>
              </h1>
              <div className="h-10 flex items-center justify-center lg:justify-start font-mono text-lg sm:text-xl text-cyan-400 font-semibold">
                <span className="mr-2 text-slate-500">&gt;</span>
                <span className="transition-all duration-500">{personalInfo.subtitles[activeSubtitleIndex]}</span>
                <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Executive Summary */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.summary}
            </p>

            {/* Quick Contact & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Open for Relocation & Remote</span>
              </div>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{personalInfo.email}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="./Krishna_Nekkanti_Resume.pdf"
                download="Krishna_Nekkanti_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                Download ATS Resume
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-semibold text-sm transition-all shadow-lg"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                View Master Resume
              </button>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-all hover:border-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Connect
              </a>
            </div>

            {/* Verified Social Profile Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-blue-600/20 border border-blue-500/30 hover:border-blue-500 text-xs font-semibold text-blue-400 transition-all group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                LinkedIn Profile
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 transition-all group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                GitHub Profile
              </a>
            </div>

          </div>

          {/* Profile Card & Headshot Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              
              {/* Outer Decorative Glow Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>

              {/* Card Container */}
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                
                {/* Photo vs Avatar View Switcher */}
                <div className="flex items-center justify-center p-1 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      viewMode === 'photo'
                        ? 'bg-slate-800 text-cyan-300 font-semibold shadow border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>📷 Real Photo</span>
                  </button>
                  <button
                    onClick={() => setViewMode('avatar')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      viewMode === 'avatar'
                        ? 'bg-slate-800 text-cyan-300 font-semibold shadow border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>🤖 AI Avatar</span>
                  </button>
                </div>

                {/* Photo Frame */}
                <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-inner group-hover:border-cyan-400 transition-colors">
                  <img 
                    src={viewMode === 'photo' ? personalInfo.profileImg : personalInfo.avatarImg} 
                    alt={personalInfo.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                    <span>{viewMode === 'photo' ? 'Professional Portrait' : '3D AI Data Avatar'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>

                {/* Core Expertise Chips */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider text-center">
                    Core AI & Data Engineering Stack
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["AgentSQL", "MCP Protocol", "Snowflake", "Databricks", "AWS Redshift", "AWS Glue", "Python", "SQL", "Tableau"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-[11px] font-mono text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Resume Download Action */}
                <div className="pt-2">
                  <button
                    onClick={onOpenResume}
                    className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Resume
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
