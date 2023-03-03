import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react(), viteSingleFile()],
};
