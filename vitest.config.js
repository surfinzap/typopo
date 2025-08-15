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
    testTimeout: 5000,
    globals: false, 
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/browser_typopo.js'] // Browser-specific file
    }
  }
});