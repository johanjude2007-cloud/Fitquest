import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Set base to '/Fitquest/' for GitHub Pages (repo name must match)
// Change 'fitquest' below if your GitHub repo has a different name
const base = process.env.GITHUB_ACTIONS ? '/Fitquest/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    allowedHosts: true,
  }
});
