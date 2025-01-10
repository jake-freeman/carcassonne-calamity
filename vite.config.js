import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Workaround to get the build picked up by github pages
    outDir: './docs',
    emptyOutDir: true,
  },
  base: 'https://jake-freeman.github.io/carcassonne-calamity/',
})
