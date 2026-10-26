import React, { useState, useEffect } from 'react';
import { Database, FileText, Menu, X, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'ETL Sandbox', href: '#sandbox' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-slate-950/50' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Database className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Krishna S. Nekkanti
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Forward Deployment AI Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a 
            href={personalInfo.linkedIn} 
            target="_blank" 
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4" />
            Resume PDF
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 py-4 mt-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-around">
            <a 
              href={personalInfo.linkedIn} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
