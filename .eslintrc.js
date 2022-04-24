module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 'off',
  },
};
