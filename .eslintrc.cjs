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
    '@stylistic/ts'
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
    '@stylistic/ts/member-delimiter-style': ['error'],
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': ['warn'],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    '@typescript-eslint/prefer-ts-expect-error': ['error'],
    '@typescript-eslint/promise-function-async': ['error'],
    '@typescript-eslint/strict-boolean-expressions': ['error'],
    '@stylistic/ts/type-annotation-spacing': ['error'],

    /**
     * Disabled due to controlled usage of `namespace` blocks only used for type information.
     * This is still true for cases where code exists but we are using ESM style imports/exports.
     */
    '@stylistic/ts/no-namespace': 'off',

    // --
    // -- Eslint Overrides
    // --

    'brace-style': 'off',
    '@stylistic/ts/brace-style': ['error', '1tbs'],

    'comma-dangle': 'off',
    '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],

    'comma-spacing': 'off',
    '@stylistic/ts/comma-spacing': ['error'],

    'func-call-spacing': 'off',
    '@stylistic/ts/func-call-spacing': ['warn', 'never'],

    'indent': 'off',
    '@stylistic/ts/indent': ['warn', 2],

    'keyword-spacing': 'off',
    '@stylistic/ts/keyword-spacing': ['error', { before: true, after: true }],

    'no-extra-semi': 'off',
    '@stylistic/ts/no-extra-semi': ['error'],

    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error'],

    'only-throw-error': 'off',
    '@typescript-eslint/only-throw-error': ['error'],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    'object-curly-spacing': 'off',
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],

    'quotes': 'off',
    '@stylistic/ts/quotes': ['error', 'single'],

    'semi': 'off',
    '@stylistic/ts/semi': ['error'],

    'space-before-blocks': 'off',
    '@stylistic/ts/space-before-blocks': ['error', 'always'],

    'space-before-function-paren': 'off',
    '@stylistic/ts/space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
  },
};
