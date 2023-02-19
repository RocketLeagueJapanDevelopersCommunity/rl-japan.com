module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: 'error',
    'prefer-const': 'error',
    'space-before-function-paren': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'index',
          '404',
          'default',
          'Banner',
          'Breadcrumb',
          'Category',
          'Conversion',
          'Footer',
          'Header',
          'Latest',
          'Logo',
          'Meta',
          'Partner',
          'Post',
          'Search',
          'Share',
          'Slider',
          'Toc',
          'Writer',
          'calendar'
        ]
      }
    ]
  }
}
