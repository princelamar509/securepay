import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ← You need this!

export default defineConfig({
  plugins: [react()],
  base: '/securepay/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
