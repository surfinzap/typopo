import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    exclude: ['tests/performance.test.js'],
    environment: 'node',
    reporter: 'dot',
    watch: {
      include: ['src/**', 'tests/**']
    },
    testTimeout: 15000,
    teardownTimeout: 15000,
    hookTimeout: 15000,
    globals: true,
    pool: 'threads',
    maxWorkers: 1,
    isolate: true,
    maxConcurrency: 5,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/browser_typopo.js'] // Browser-specific file
    }
  }
});