module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: 'error',
    'prefer-const': 'error',
    'vue/no-v-html': 'off',
  },
};
