module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
      allowAfterThis: true,
      allowAfterSuper: true,
    }],
  },
};
