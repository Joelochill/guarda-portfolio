/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  overrides: [
    {
      files: ['*.astro', '**/*.astro'],
      extends: ['stylelint-config-html/astro'],
    },
  ],
  ignoreFiles: ['dist/**/*'],
  rules: {
    'plugin/no-unsupported-browser-features': [true, { severity: 'warning' }],
  },
};
