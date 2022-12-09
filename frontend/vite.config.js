import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import inject from '@rollup/plugin-inject';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const r = (p) => path.resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    host: true,
  },
  resolve: {
    alias: {
      '@': r('./src'),
      '@c': r('./src/components'),
      // process: 'process/browser',
      // stream: 'stream-browserify',
      // zlib: 'browserify-zlib',
      // util: 'util',
    },
  },
  plugins: [
    svgr(),
    react(),
  ],
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
