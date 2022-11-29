import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import inject from '@rollup/plugin-inject';
import path from 'path';

const r = (p) => path.resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    host: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: r('./src'),
      },
      {
        find: '@c',
        replacement: r('./src/components'),
      },
    ],
  },
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      plugins: [
        inject(
          { Buffer: ['buffer', 'Buffer'] },
        ),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  css: {
    postcss: {
      plugins: [postcssImport, autoprefixer, tailwindcss],
    },
    preprocessorOptions: {
      less: {
        additionalData: `@import "${r('./src/assets/styles/comm.less')}";`,
        javascriptEnabled: true,
      },
    },
  },
});
