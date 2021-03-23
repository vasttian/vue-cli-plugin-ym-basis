// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 0,
    'no-debugger': 'off',
    'no-shadow': 0,
    "no-plusplus": "error",
    "no-else-return": "error",
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        code: 120,
      },
    ],
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: [
    //       'state',
    //       'acc',
    //       'e',
    //     ],
    //   },
    // ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    // 'no-param-reassign': 0,
    // 'no-confusing-arrow': [
    //   2,
    //   {
    //     allowParens: false,
    //   },
    // ],
    'no-unused-expressions': [
      2,
      {
       'allowShortCircuit': true,
      },
    ],
    'import/no-unresolved': 'off',
    'import/no-dynamic-require': 'off',

    // don't require .vue extension when importing
    // 'import/extensions': [
    //   'error',
    //   'always',
    //   {
    //     js: 'never',
    //     vue: 'never',
    //   },
    // ],
    'import/extensions': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
