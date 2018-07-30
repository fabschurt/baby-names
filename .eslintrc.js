module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    semi: ['error', 'never'],
    'prefer-const': 'off',
    'import/no-unresolved': ['error', {
      commonjs: true,
      caseSensitive: true,
      ignore: [
        '^@',
      ],
    }],
  },
};
