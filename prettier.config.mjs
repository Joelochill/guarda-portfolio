// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  overrides: [
    {
      files: "*.html",
      options: {
        tabWidth: 4,
        printWidth: 100,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
      },
    },
  ],
};

export default config;
