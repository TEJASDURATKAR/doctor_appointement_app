import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://doctor-appointement-app-kntn.onrender.com',  // Forward all /api requests to backend
    },
  },
})
