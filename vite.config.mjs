import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));


const currentYear = new Date().getFullYear();
const copyrightBanner = `/*!
 * Typopo v${packageJson.version} (https://typopo.org)
 * Copyright 2015–${currentYear} Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */`;

const addTopBanner = () => ({
  name: 'add-top-banner',
  generateBundle(_options, bundle) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === 'chunk') {
        chunk.code = copyrightBanner + '\n' + chunk.code;
      }
    }
  }
});

export default defineConfig(() => {
  return {
    plugins: [addTopBanner()],
    build: {
      lib: {
        entry: resolve('src/typopo.js'),
        name: 'typopo',
        formats: ['umd'],
        fileName: () => 'typopo.min.cjs'
      },
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      emptyOutDir: false,
      target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88']
    }
  };
});