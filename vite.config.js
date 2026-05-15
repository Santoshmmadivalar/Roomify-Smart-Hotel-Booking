import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '.',
        'C:/Users/Santosh Madiwalar/.gemini/antigravity/brain/bff76fb5-e8e5-45e7-bdc0-39e845225bf2',
        'C:/Users/Santosh Madiwalar/.gemini/antigravity/brain/603257e7-8ccc-4e14-95b5-23939030cf81'
      ]
    }
  }
})
