import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
};
