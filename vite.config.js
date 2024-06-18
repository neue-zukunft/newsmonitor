import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../html',
    emptyOutDir: true,
    watch: {
      //include: '../public/klimadata.json'
      //https://rollupjs.org/configuration-options/#watch
    }
  }
})
