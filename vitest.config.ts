import { defineConfig as configure } from 'vitest/config';

export default configure({
  test: {
    globals: true,
    environment: 'node',
    passWithNoTests: true,

    include: [
      'src/**/*.test.{js,jsx,ts,tsx}',
    ],

    coverage: {
      all: true,
      clean: true,
      skipFull: true,

      include: [
        'src/**/*',
      ],

      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',

        // The entrypoint file simply supplies the functions with dependencies.
        // This shouldn't need testing assuming the types are correct.
        'src/main.ts',
      ],

      reportsDirectory: 'build/coverage',
      reporter: ['text', 'html'],

      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
