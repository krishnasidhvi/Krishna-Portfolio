import React from 'react';
import { GraduationCap, Award, CheckCircle2, Sparkles, ShieldCheck, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { education, certifications } from '../data/portfolioData';

export default function EducationCertifications() {
  const getCertIcon = (iconName) => {
    if (iconName === 'Sparkles') return <Sparkles className="w-5 h-5 text-cyan-400" />;
    if (iconName === 'CheckCircle') return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (iconName === 'ShieldCheck') return <ShieldCheck className="w-5 h-5 text-purple-400" />;
    return <Award className="w-5 h-5 text-amber-400" />;
  };

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Education Timeline (Col 6) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
                <GraduationCap className="w-3.5 h-3.5" /> Academic Background
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Education & Degrees
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 glass-panel glass-panel-hover shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
                      {edu.year}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {edu.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {edu.degree}
                  </h3>

                  <div className="text-sm font-semibold text-cyan-400">
                    {edu.institution}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Badges (Col 6) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-3">
                <Award className="w-3.5 h-3.5" /> Industry Credentials
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Certifications & Accreditations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 glass-panel glass-panel-hover flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        {getCertIcon(cert.icon)}
                      </div>
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1 transition-colors"
                        >
                          Verified <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                          {cert.date}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                      {cert.name}
                    </h4>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{cert.issuer}</span>
                    <a
                      href={cert.credentialUrl || cert.issuerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      {cert.credentialUrl ? 'View credential' : 'Issuer'} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
