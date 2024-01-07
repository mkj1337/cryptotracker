import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  server: {
    proxy: {
      '/api': {
        target: 'https://openapiv1.coinstats.app',
        secure: false,
        changeOrigin: true,
      },
    },
  },
})
