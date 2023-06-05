module.exports = {
  ignoreFiles: ['node_modules/**/*', '.nuxt/**/*', 'legacy/**/*'],
  overrides: [
    {
      files: ['**/*.(scss|css|html|vue)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'deep'] },
    ],
  },
}
