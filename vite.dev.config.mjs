import { defineConfig } from 'vite';
import { resolve } from 'path';

// Development server configuration
export default defineConfig({
  root: 'demo',
  build: {
    outDir: '../build',
    rollupOptions: {
      input: resolve('demo/typopo-demo.html'),
      output: {
        entryFileNames: 'typopo_browser.built.js'
      }
    },
    minify: false,
    sourcemap: true
  },
  server: {
    port: 3000,
    open: false
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
});