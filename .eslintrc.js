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
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': ['warn'],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    '@typescript-eslint/prefer-ts-expect-error': ['error'],
    '@typescript-eslint/promise-function-async': ['error'],
    '@typescript-eslint/strict-boolean-expressions': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],

    /**
     * Disabled due to controlled usage of `namespace` blocks only used for type information.
     * This is still true for cases where code exists but we are using ESM style imports/exports.
     */
    '@typescript-eslint/no-namespace': 'off',

    // --
    // -- Eslint Overrides
    // --

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error'],

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['warn', 'never'],

    'indent': 'off',
    '@typescript-eslint/indent': ['warn', 2],

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],

    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error'],

    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': ['error'],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],

    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],

    'semi': 'off',
    '@typescript-eslint/semi': ['error'],

    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': ['error', 'always'],

    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
  },
};
