module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs', 'eslint:recommended', 'prettier'],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off',
  },
};
