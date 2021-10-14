module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  globals: {
    module: 'writable'
  },
  rules: {
    quotes: ['error', 'single', { 'avoidEscape': true }],
    semi: [2, 'always']
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true
  }
};
