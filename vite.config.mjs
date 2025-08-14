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

// Library build configuration
export default defineConfig(({ mode }) => {
  const isNpmBuild = mode === 'npm';
  
  return {
    build: {
      lib: {
        entry: resolve(isNpmBuild ? 'src/typopo.js' : 'src/browser_typopo.js'),
        name: 'typopo',
        formats: ['umd'],
        fileName: (format) => isNpmBuild ? 'typopo_dist.min.cjs' : 'typopo.min.js'
      },
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          format: 'umd',
          name: 'typopo',
          banner: copyrightBanner
        }
      },
      target: ['es2015', 'edge18', 'firefox60', 'chrome61', 'safari11']
    }
  };
});