import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true, // Automatically open browser when server starts
    strictPort: true, // Throw error if port is already in use
    cors: true // Enable CORS for all origins
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    // Ensure assets are properly referenced with relative paths
    assetsDir: 'assets',
    // Optimize build for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'i18n-vendor': ['i18next', 'react-i18next']
        }
      }
    }
  },
  // Add base URL configuration for deployment
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_BASE_URL || '/Trial-Bridge/' : './'
})