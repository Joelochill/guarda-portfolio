import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import jopSoftwarecookieconsent from '@jop-software/astro-cookieconsent';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// See https://docs.astro.build/en/guides/environment-variables/
const { SITE_URL, SANITY_PROJECT_ID, SANITY_DATASET_NAME } = loadEnv(
  process.env,
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  site: `${SITE_URL}`,
  trailingSlash: 'never',
  integrations: [
    icon(),
    jopSoftwarecookieconsent(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sanity({
      projectId: `${SANITY_PROJECT_ID}`,
      dataset: `${SANITY_DATASET_NAME}`,
      useCdn: false,
    }),
    sitemap(),
  ],
  image: {
    domains: ['astro.build', 'cdn.sanity.io'],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    fallbackLocale: 'es',
  },
});
