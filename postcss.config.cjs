/* eslint-disable -- Only CommonJS file */
const postCssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postCssPresetEnv({
      preserve: true,
    }),
  ],
};
