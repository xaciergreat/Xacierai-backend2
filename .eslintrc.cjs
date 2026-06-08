module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-unused-vars': 'off', // TypeScript handles this
    'prefer-const': 'warn',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.base.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-types': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
      },
    },
  ],
};
