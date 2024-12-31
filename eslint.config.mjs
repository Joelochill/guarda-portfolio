import pluginJs from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import compat from 'eslint-plugin-compat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts, astro}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  compat.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['**/.astro/*', '**/dist/*', '**/env.d.ts'],
  },
  {
    rules: {},
  },
];
