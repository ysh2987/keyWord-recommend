module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': 'off',
    semi: 'off',
    'space-before-function-paren': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        endOfLine: 'auto',
      },
    ],
    'multiline-ternary': 'off',
    indent: 'off',
    'linebreak-style': 0,
    'consistent-return': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'react/no-array-index-key': 'off',
    'no-param-reassign': 'off',
  },
};
