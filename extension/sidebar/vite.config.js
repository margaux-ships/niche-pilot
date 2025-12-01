import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../sidebar-dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    emptyOutDir: true,
  },
  base: '/sidebar-dist/',
});

