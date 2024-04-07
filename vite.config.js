import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@babel/runtime/helpers/esm/extends': require.resolve('@babel/runtime/helpers/esm/extends')
    }
  }
});
