import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Optimize dev server performance
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'react-icons': ['react-icons']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev startup
    include: ['react', 'react-dom', 'framer-motion', 'react-icons']
  },
  css: {
    // Optimize CSS processing
    postcss: './postcss.config.js'
  }
})
