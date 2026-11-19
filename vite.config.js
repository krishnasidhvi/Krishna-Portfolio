import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Two pages:
//   /          -> Medallion Reel (index.html, self-contained cinematic homepage)
//   /classic/  -> original React portfolio (classic/index.html -> src/main.jsx)
export default defineConfig({
  plugins: [react()],
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
