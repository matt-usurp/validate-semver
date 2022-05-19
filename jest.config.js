/* eslint-disable no-undef */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',

  maxWorkers: 5,
  maxConcurrency: 3,

  modulePaths: [
    '<rootDir>/src/**',
  ],

  modulePathIgnorePatterns: [
    '<rootDir>/build',
  ],

  collectCoverage: true,
  coverageDirectory: 'build/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],

  coveragePathIgnorePatterns: [
    'build',

    // Ignoring the main entry point as its self executing and we cannot easily test it.
    // This file should simply invoke an external function with required dependencies.
    'src/main.ts',
  ],

  coverageReporters: [
    'html',
    'text',
  ],

  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
