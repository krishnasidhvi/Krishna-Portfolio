// Builds public/Krishna_Nekkanti_Resume.pdf from src/data/career.json, so the PDF always matches the site.
// Uses a locally installed Edge or Chrome in headless mode. Usage: npm run resume
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const C = JSON.parse(readFileSync(resolve(root, 'src/data/career.json'), 'utf8'));
const P = C.personal;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const SITE = 'https://krishnasidhvi.github.io/Krishna-Portfolio/';

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(P.name)} – Résumé</title>
<meta name="author" content="${esc(P.name)}"><meta name="description" content="${esc(P.headline)} résumé">
<style>
@page{size:Letter;margin:10mm 13mm}
*{box-sizing:border-box}
body{margin:0;font-family:"Segoe UI",Calibri,Arial,sans-serif;font-size:9.3pt;line-height:1.3;color:#1b2430}
h1{font-size:20pt;margin:0;text-align:center;color:#0f1a2a}
.sub{text-align:center;font-size:10.5pt;color:#0b6aa8;font-weight:600;margin-top:2px}
.contact{text-align:center;font-size:9pt;color:#4a5566;margin-top:4px}
.contact a{color:#0b6aa8;text-decoration:none}
h2{font-size:10.5pt;text-transform:uppercase;color:#0b6aa8;border-bottom:1.2px solid #0b6aa8;padding-bottom:2px;margin:9px 0 4px}
p{margin:0}
.row{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-top:5px;break-after:avoid}
.row b{font-size:10pt;color:#0f1a2a}.row span{color:#0b6aa8;font-weight:600}
.row i{font-style:normal;color:#5b6676;font-size:8.8pt;white-space:nowrap}
ul{margin:2px 0 0;padding-left:15px}li{margin:1px 0;break-inside:avoid}
.skills div{margin:1.5px 0}.skills b{color:#0f1a2a}
.comp{color:#2b3644}
.block{}
</style></head><body>
<h1>${esc(P.name.toUpperCase())}</h1>
<div class="sub">${esc(P.headline)}</div>
<div class="contact">${esc(P.city)}, India (open to relocation &amp; remote) • <a href="mailto:${esc(P.email)}">${esc(P.email)}</a> •
<a href="${esc(P.linkedIn)}">LinkedIn</a> • <a href="${esc(P.github)}">GitHub</a> • <a href="${SITE}">Interactive portfolio</a></div>

<h2>Summary</h2><p>${esc(P.summary)}</p>

<h2>Core competencies</h2><p class="comp">${C.competencies.map(esc).join(' | ')}</p>

<h2>Technical skills</h2><div class="skills">${C.technicalSkills.map((c) =>
  `<div><b>${esc(c.category)}:</b> ${c.skills.map((s) => esc(s.name)).join(', ')}</div>`).join('')}</div>

<h2>Work experience</h2>${C.workExperience.map((r) => `<div class="block">
<div class="row"><div><b>${esc(r.role.toUpperCase())}</b> <span>— ${esc(r.company)}, ${esc(r.location)}${r.badge === 'Contract' ? ' – Contract' : ''}</span></div><i>${esc(r.period)}</i></div>
<ul>${r.achievements.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>`).join('')}

<h2>Master's research: data science projects</h2>${C.projects.map((p) => `<div class="block">
<div class="row"><b>${esc(p.title)}</b><i>${esc(p.period)}</i></div>
<ul>${p.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>`).join('')}

<h2>Education</h2>${C.education.map((e) => `<div class="row"><div><b>${esc(e.institution)}</b> <span>— ${esc(e.degree)}</span></div><i>${esc(e.year)}</i></div>`).join('')}

<h2>Certifications</h2><ul>${C.certifications.map((c) => `<li><b>${esc(c.name)}</b> — ${esc(c.issuer)}</li>`).join('')}</ul>
</body></html>`;

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
];
const browser = process.env.CHROME_PATH || browsers.find((b) => existsSync(b));
if (!browser) { console.error('No Edge/Chrome found. Set CHROME_PATH.'); process.exit(1); }

const dir = mkdtempSync(join(tmpdir(), 'resume-'));
const htmlPath = join(dir, 'resume.html');
writeFileSync(htmlPath, html);
const out = resolve(root, 'public/Krishna_Nekkanti_Resume.pdf');
execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--no-first-run', `--user-data-dir=${join(dir, 'profile')}`,
  `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href], { stdio: 'ignore' });
rmSync(dir, { recursive: true, force: true });
console.log('wrote', out);
