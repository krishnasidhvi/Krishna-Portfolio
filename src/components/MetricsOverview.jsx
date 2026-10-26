import React from 'react';
import { TrendingUp, ShieldAlert, Cpu, Zap, Award } from 'lucide-react';
import { keyImpactMetrics } from '../data/portfolioData';

export default function MetricsOverview() {
  const getIcon = (label) => {
    if (label.includes("Relational") || label.includes("SQL")) return <Cpu className="w-6 h-6 text-cyan-400" />;
    if (label.includes("Anomaly")) return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
    if (label.includes("Reliability")) return <Zap className="w-6 h-6 text-amber-400" />;
    return <TrendingUp className="w-6 h-6 text-purple-400" />;
  };

  const getGradient = (color) => {
    switch (color) {
      case 'cyan':
        return 'from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/30 text-cyan-400';
      case 'emerald':
        return 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30 text-amber-400';
      case 'purple':
        return 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-400';
      default:
        return 'from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <section className="py-12 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-800/50">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Quantified Career Impact
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Proven Results Across Agentic AI, Data Pipelines & Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md mt-2 md:mt-0 font-mono">
            Verified production metrics across Trida Labs, Global Payments, Amazon, and Vanguard.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyImpactMetrics.map((metric, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-b ${getGradient(metric.color)} border glass-panel glass-panel-hover group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  {getIcon(metric.label)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  Verified Metric
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                  {metric.prefix}{metric.value}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-200 mt-2">
                {metric.label}
              </h3>

              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
