// All career content lives in career.json: this file only adapts it for the classic React site.
// The Medallion Reel homepage reads the same file at /career.json (emitted by vite.config.js).
import career from './career.json';

export const personalInfo = career.personal;
export const keyImpactMetrics = career.keyImpactMetrics;
export const competencies = career.competencies;
export const workExperience = career.workExperience;
export const projects = career.projects;
export const education = career.education;
export const certifications = career.certifications;
export const sampleSqlQueries = career.sampleSqlQueries;

// Each skill lists the roles where it was actually used (matched against role tech and achievements),
// instead of a self-rated percentage.
const roleText = career.workExperience.map((r) => ({
  company: r.company.replace(' Inc.', ''),
  text: (r.tech.join(' ') + ' ' + r.achievements.join(' ') + ' ' + r.summary).toLowerCase(),
}));
export const technicalSkills = career.technicalSkills.map((cat) => ({
  ...cat,
  skills: cat.skills.map((s) => ({
    ...s,
    usedAt: roleText.filter((r) => s.keys.some((k) => r.text.includes(k))).map((r) => r.company),
  })),
}));

export default career;
