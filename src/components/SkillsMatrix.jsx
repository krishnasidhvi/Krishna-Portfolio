import React, { useState } from 'react';
import { 
  Cloud, 
  Code, 
  Database, 
  BarChart3, 
  Search, 
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { technicalSkills, competencies } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    'Agentic AI & LLM Systems': <Sparkles className="w-4 h-4 text-cyan-400" />,
    'Cloud & Data Warehousing': <Cloud className="w-4 h-4 text-sky-400" />,
    'Languages & Data Processing': <Code className="w-4 h-4 text-emerald-400" />,
    'Analytics, BI & Governance': <BarChart3 className="w-4 h-4 text-amber-400" />
  };

  const categories = ['All', ...technicalSkills.map((cat) => cat.category)];

  // Filter skills based on tab selection & search query
  const filteredSkillsCategories = technicalSkills.map((cat) => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) {
      return null;
    }

    const matchingSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingSkills.length === 0) return null;

    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" /> Technical Expertise & Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Agentic AI, Cloud Architecture & Analytics Stack
          </h2>
          <p className="text-slate-400 text-sm">
            Comprehensive technical proficiency across AgentSQL, Model Context Protocol (MCP), distributed cloud data warehousing, PySpark ETL, and enterprise BI engines.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Redshift, Spark)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkillsCategories.map((cat) => (
            <div
              key={cat.category}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 glass-panel hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  {categoryIcons[cat.category]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.category}</h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {cat.skills.length} core technologies
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {skill.tag}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-1000 group-hover:brightness-125"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Core Functional Competencies</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {competencies.map((comp, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {comp}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
