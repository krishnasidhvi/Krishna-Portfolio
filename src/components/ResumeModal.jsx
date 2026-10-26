import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { personalInfo, workExperience, projects, education, certifications, competencies } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print/save the PDF resume.');
      return;
    }

    const resumeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${personalInfo.name.replace(/\s+/g, '_')}_Resume</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          @page {
            size: letter portrait;
            margin: 0.4in;
          }

          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #ffffff;
            color: #0f172a;
            font-size: 9pt;
            line-height: 1.35;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .header {
            text-align: center;
            padding-bottom: 8px;
            border-bottom: 2px solid #0f172a;
            margin-bottom: 10px;
          }

          .header h1 {
            font-size: 20pt;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          .contact-line {
            font-family: 'Fira Code', monospace;
            font-size: 8pt;
            color: #475569;
            margin-bottom: 3px;
          }

          .links-line {
            font-family: 'Fira Code', monospace;
            font-size: 8pt;
            color: #0284c7;
          }

          .links-line a {
            color: #0284c7;
            text-decoration: none;
            font-weight: 600;
          }

          .section {
            margin-bottom: 10px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .section-title {
            font-family: 'Fira Code', monospace;
            font-size: 9.5pt;
            font-weight: 700;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1.5px solid #0284c7;
            padding-bottom: 2px;
            margin-bottom: 5px;
          }

          .summary-text, .competencies-text {
            color: #334155;
            font-size: 8.5pt;
            line-height: 1.35;
          }

          .skills-list {
            list-style: none;
            padding-left: 0;
          }

          .skills-list li {
            font-family: 'Fira Code', monospace;
            font-size: 8pt;
            color: #334155;
            margin-bottom: 2.5px;
          }

          .job-block {
            margin-bottom: 8px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
          }

          .job-title {
            font-weight: 700;
            color: #0f172a;
            font-size: 9pt;
            text-transform: uppercase;
          }

          .job-company {
            color: #0284c7;
            font-weight: 600;
            font-size: 8.5pt;
          }

          .job-period {
            font-family: 'Fira Code', monospace;
            font-size: 7.5pt;
            color: #64748b;
          }

          .bullet-list {
            padding-left: 16px;
            margin-top: 2px;
          }

          .bullet-list li {
            color: #334155;
            font-size: 8.2pt;
            margin-bottom: 2.5px;
            line-height: 1.3;
          }

          .edu-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 8.2pt;
            margin-bottom: 3px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${personalInfo.name}</h1>
          <div class="contact-line">
            ${personalInfo.location} • ${personalInfo.phone} • ${personalInfo.email}
          </div>
          <div class="links-line">
            <a href="${personalInfo.linkedIn}" target="_blank">LinkedIn Profile</a> • 
            <a href="${personalInfo.github}" target="_blank">GitHub Profile</a>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Summary</div>
          <p class="summary-text">${personalInfo.summary}</p>
        </div>

        <div class="section">
          <div class="section-title">Core Competencies</div>
          <p class="competencies-text">
            ${competencies.join(' | ')}
          </p>
        </div>

        <div class="section">
          <div class="section-title">Technical Skills</div>
          <ul class="skills-list">
            <li>• <strong>Agentic AI & LLMs:</strong> AgentSQL, TridaPad, Model Context Protocol (MCP), Text-to-SQL, Prompt Guardrails, LangChain, RAG</li>
            <li>• <strong>Cloud & Data Warehouses:</strong> Snowflake, Databricks, AWS (Redshift, Glue, Lambda, Athena), PostgreSQL, SQL Server, Azure Data Factory, dbt, Informatica</li>
            <li>• <strong>Languages & Processing:</strong> Python, Advanced SQL, Apache Spark (PySpark), Apache Kafka, Pandas, NumPy, Docker, REST & MCP APIs</li>
            <li>• <strong>Analytics, BI & Governance:</strong> Tableau, Power BI, Enterprise RBAC & Data Governance, Fraud Detection Analytics, Matplotlib, Seaborn</li>
          </ul>
        </div>

        <div class="section">
          <div class="section-title">Work Experience</div>
          ${workExperience.map(job => `
            <div class="job-block">
              <div class="job-header">
                <div>
                  <span class="job-title">${job.role}</span>
                  <span class="job-company">— ${job.company}, ${job.location}</span>
                </div>
                <span class="job-period">${job.period}</span>
              </div>
              <ul class="bullet-list">
                ${job.achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Master's Degree Research – Data Science Projects</div>
          ${projects.map(proj => `
            <div class="job-block">
              <div class="job-header">
                <span class="job-title" style="text-transform:none;">${proj.title}</span>
                <span class="job-period">${proj.period}</span>
              </div>
              <ul class="bullet-list">
                ${proj.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Education</div>
          ${education.map(edu => `
            <div class="edu-row">
              <div>
                <strong>${edu.institution}</strong> – ${edu.location} | <span style="color:#0284c7">${edu.degree}</span>
              </div>
              <span class="job-period">${edu.year}</span>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Certifications</div>
          <ul class="skills-list">
            ${certifications.map(c => `<li>• <strong>${c.name}</strong> by ${c.issuer}</li>`).join('')}
          </ul>
        </div>

      </body>
      </html>
    `;

    printWindow.document.write(resumeHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleCopyText = () => {
    const rawResumeText = `
KRISHNA SIDHVI NEKKANTI
Relocated: Hyderabad, India | ${personalInfo.phone} | ${personalInfo.email}
LinkedIn: ${personalInfo.linkedIn} | GitHub: ${personalInfo.github}

SUMMARY:
${personalInfo.summary}

CORE COMPETENCIES:
${competencies.join(' | ')}

TECHNICAL SKILLS:
• Agentic AI & LLM Systems: AgentSQL, TridaPad, Model Context Protocol (MCP), Text-to-SQL, Prompt Guardrails, LangChain, RAG
• Cloud & Data Warehouses: Snowflake, Databricks, AWS (Redshift, Glue, Lambda, Athena), PostgreSQL, SQL Server, Azure Data Factory, dbt, Informatica
• Languages & Processing: Python, Advanced SQL, Apache Spark (PySpark), Apache Kafka, Pandas, NumPy, Docker, REST & MCP APIs
• Analytics, BI & Governance: Tableau, Power BI, Enterprise RBAC, Fraud Detection Analytics

WORK EXPERIENCE:
${workExperience.map(j => `${j.role} - ${j.company} (${j.period})\n` + j.achievements.map(a => `• ${a}`).join('\n')).join('\n\n')}

RESEARCH PROJECTS:
${projects.map(p => `${p.title} (${p.subtitle})\n` + p.keyPoints.map(k => `• ${k}`).join('\n')).join('\n\n')}

EDUCATION:
${education.map(e => `${e.degree} - ${e.institution} (${e.year})`).join('\n')}

CERTIFICATIONS:
${certifications.map(c => `• ${c.name} (${c.issuer})`).join('\n')}
    `;
    navigator.clipboard.writeText(rawResumeText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Modal Toolbar (Sticky Top) */}
        <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <h3 className="text-sm font-bold text-white font-mono">Master Resume View</h3>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="./Krishna_Nekkanti_Resume.pdf"
              download="Krishna_Nekkanti_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Direct PDF
            </a>

            <button
              onClick={handleCopyText}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div id="resume-print-area" className="p-8 sm:p-12 space-y-8 bg-slate-900 text-slate-100">
          
          {/* Resume Header */}
          <div className="text-center pb-6 border-b border-slate-800 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-300">
              <span>{personalInfo.location}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex justify-center items-center gap-4 pt-1 text-xs font-mono text-cyan-400">
              <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer">LinkedIn Profile</a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub Profile</a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              CORE COMPETENCIES
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {competencies.join(' | ')}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              TECHNICAL SKILLS
            </h2>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li>• <strong className="text-slate-100">Agentic AI & LLM Systems:</strong> AgentSQL, TridaPad, Model Context Protocol (MCP), Text-to-SQL, Prompt Guardrails, LangChain, RAG</li>
              <li>• <strong className="text-slate-100">Cloud & Data Warehouses:</strong> Snowflake, Databricks, AWS (Redshift, Glue, Lambda, Athena), PostgreSQL, SQL Server, Azure Data Factory, dbt, Informatica</li>
              <li>• <strong className="text-slate-100">Languages & Data Processing:</strong> Python, Advanced SQL, Apache Spark (PySpark), Apache Kafka, Pandas, NumPy, Docker, REST & MCP APIs</li>
              <li>• <strong className="text-slate-100">Analytics, BI & Governance:</strong> Tableau, Power BI, Enterprise RBAC & Data Governance, Fraud Detection Analytics, Matplotlib, Seaborn</li>
            </ul>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              WORK EXPERIENCE
            </h2>
            {workExperience.map((job) => (
              <div key={job.id} className="space-y-2 resume-item-block">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white uppercase text-sm">{job.role}</span>
                    <span className="text-cyan-400 font-semibold ml-2">— {job.company}, {job.location}</span>
                  </div>
                  <span className="font-mono text-slate-400">{job.period}</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300">
                  {job.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Master's Research Projects */}
          <div className="space-y-6">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              MASTER'S DEGREE RESEARCH – DATA SCIENCE PROJECTS
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-2 resume-item-block">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white text-sm">{proj.title}</span>
                  <span className="font-mono text-slate-400">{proj.period}</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300">
                  {proj.keyPoints.map((kp, idx) => (
                    <li key={idx} className="leading-relaxed">{kp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3 resume-item-block">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-xs text-slate-300">
                <div>
                  <strong className="text-white">{edu.institution}</strong> – {edu.location} | <span className="text-cyan-400">{edu.degree}</span>
                </div>
                <span className="font-mono text-slate-400">{edu.year}</span>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2 resume-item-block">
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="text-xs text-slate-300 space-y-1">
              {certifications.map((c, i) => (
                <li key={i}>• <strong className="text-white">{c.name}</strong> by {c.issuer}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
