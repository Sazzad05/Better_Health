// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/Better_Health/", // <-- IMPORTANT for GitHub Pages
  plugins: [react()],
});