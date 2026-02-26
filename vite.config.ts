import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Разрешить доступ с любого хоста
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok-free.app', // Разрешить все поддомены ngrok-free.app
      '.ngrok.io',       // Для старых версий ngrok
      '.ngrok.dev',       // Альтернативный домен
      'unlacquered-oma-histomorphologically.ngrok-free.dev',
    ],
    // Или полностью отключить проверку (менее безопасно)
    // allowedHosts: 'all'
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
