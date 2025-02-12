/* eslint-disable -- Only CommonJS file */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: {
        'media-query-ranges': true,
      },
      preserve: true,
    }),
  ],
};
