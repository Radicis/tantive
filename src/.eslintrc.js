module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    allowImportEverywhere: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-imports': 'off'
  }
};
