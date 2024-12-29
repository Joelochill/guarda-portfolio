import pluginJs from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import compat from 'eslint-plugin-compat';

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
    rules: {
      
    },
  },
];
