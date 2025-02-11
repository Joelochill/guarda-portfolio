/* eslint-disable -- Only CommonJS file */
const postcssPresetEnv = require('postcss-preset-env');
const postcssHasPseudo = require('css-has-pseudo');

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: {
        'media-query-ranges': true,
      },
      preserve: true,
    }),
    postcssHasPseudo({
      preserve: true,
    }),
  ],
};
