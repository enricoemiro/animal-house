import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
};