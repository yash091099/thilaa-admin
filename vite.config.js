import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url';

// Convert URL to path, compatible with ESM
const dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@fortawesome/free-solid-svg-icons']
    }
  },
  resolve: {
    alias: {
      '@babel/runtime': fileURLToPath(new URL('./node_modules/@babel/runtime', import.meta.url))
    }
  }
})
