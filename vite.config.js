import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

// Two pages:
//   /          -> Medallion Reel (index.html, cinematic homepage; fetches /career.json)
//   /classic/  -> original React portfolio (classic/index.html -> src/main.jsx)
// src/data/career.json is the single source of career content for both.
const CAREER = resolve(__dirname, 'src/data/career.json')
function careerJson() {
  return {
    name: 'career-json',
    configureServer(server) {
      server.middlewares.use('/career.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(readFileSync(CAREER))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'career.json', source: readFileSync(CAREER, 'utf8') })
    },
  }
}

export default defineConfig({
  plugins: [react(), careerJson()],
  base: './', // relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        classic: resolve(__dirname, 'classic/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: true
  }
})
