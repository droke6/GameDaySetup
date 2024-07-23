// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssModules from 'vite-plugin-css-modules';

export default defineConfig({
  plugins: [
    react(),
    cssModules() // Add the cssModules plugin
  ],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-datepicker'],
    },
  },
});
