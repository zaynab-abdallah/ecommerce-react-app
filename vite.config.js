import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  base: isProduction ? '/ecommerce-react-app/' : '/',
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  preview: {
    port: 4173,
    strictPort: false,
  }
})
