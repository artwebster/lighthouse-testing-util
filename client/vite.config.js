/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/lighthouse': 'http://localhost:5000/',
      '/auth': 'http://localhost:5000/',
    },
  },
});
