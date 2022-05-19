/* eslint-disable no-undef */

module.exports = {
  root: true,

  env: {
    commonjs: true,
    node: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: false,
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: [
    '@typescript-eslint',
  ],

  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-floating-promises': ['error'],

    /**
     * Disabled due to controlled usage of `namespace` blocks only used for type information.
     * This is still true for cases where code exists but we are using ESM style imports/exports.
     */
    '@typescript-eslint/no-namespace': 'off',

    // --
    // -- Style
    // --

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error'],

    'indent': 'off',
    '@typescript-eslint/indent': ['warn', 2],

    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],

    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
  },
};
