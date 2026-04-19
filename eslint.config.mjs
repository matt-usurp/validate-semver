import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';

export default defineConfig([
  {
    files: [
      'src/**/*.ts',
    ],
    ignores: [
      '/build/**',
    ],
  },
  ts.configs.strict,
  ts.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    }
  },
]);
