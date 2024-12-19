import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.joelricorada.com',
  integrations: [sanity({
    projectId: 'pgwm690m',
    dataset: 'production',
    useCdn: false,
  }), icon(), sitemap()],
  image: {
    domains: ['astro.build', 'cdn.sanity.io'],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    fallbackLocale: 'es',
  },
});