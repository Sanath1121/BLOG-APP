import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  preview: {
    host: '0.0.0.0',
    // allow incoming requests to these Render domains during preview
    allowedHosts: ['blog-app-1-jrys.onrender.com', 'blog-app-q882.onrender.com'],
    port: Number(process.env.PORT) || 5173,
  },
})
