import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, ExternalLink, MessageSquare, MessageCircle, Copy, Check, Briefcase } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mqkenvba", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          message: formState.message,
          _subject: `New Portfolio Recruiter Inquiry from ${formState.name} (${formState.company || 'Direct'})`
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Opportunity Inquiry: ${formState.company || formState.name}`)}&body=${encodeURIComponent(`Hi Krishna,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email}) - ${formState.company}`)}`;
        setSubmitted(true);
      }
    } catch (err) {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Opportunity Inquiry: ${formState.company || formState.name}`)}&body=${encodeURIComponent(`Hi Krishna,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email}) - ${formState.company}`)}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950/90 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
              <MessageSquare className="w-3.5 h-3.5" /> Let's Connect
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Get in Touch for Opportunities
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Open for Forward Deployment AI Engineer, Data Analytics Engineer, and Enterprise AI/Data Architecture roles. Feel free to reach out directly via WhatsApp, email, or LinkedIn.
            </p>

            <div className="space-y-3.5 pt-2">
              {/* WhatsApp Quick Connect Card */}
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/15 transition-all group shadow-lg"
              >
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-emerald-300 block font-semibold">Fastest Recruiter Response</span>
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    Instant WhatsApp Chat
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email Card with 1-Click Copy */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Direct Email</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Direct Phone</span>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location & Availability Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Work Availability</span>
                  <span className="text-sm font-semibold text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Github className="w-4 h-4" />
                Follow on GitHub
              </a>
            </div>

          </div>

          {/* Right Column - Recruiter Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Inquiring about a role, contract, or full-time opportunity? Leave your details below and Krishna will receive it immediately.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Krishna will review your message and reply promptly. For urgent requirements, feel free to connect via WhatsApp or phone.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', company: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Hiring Manager / Recruiter"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="recruiter@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Google, Microsoft, Startup..."
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Message / Role Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Krishna, we have an exciting Data Analytics / Data Engineering opportunity..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending Inquiry..." : "Send Message to Krishna"}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
