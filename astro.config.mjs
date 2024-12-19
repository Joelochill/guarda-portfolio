import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import partytown from '@astrojs/partytown';

const { SITE_URL, SANITY_PROJECT_ID, SANITY_DATASET_NAME } = loadEnv(
  process.env,
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  site: `${SITE_URL}`,
  trailingSlash: 'never',
  env: {
    schema: {
      /* Can't be loaded via astro:env in script files, is loaded via import.meta.env (see /scripts/contactFormAction.js)
      PUBLIC_EMAILJS_KEY: envField.string({
        context: 'client',
        access: 'public',
      }), */
      PUBLIC_GOOGLE_ANALYTICS_ID: envField.string({
        context: 'client',
        access: 'public',
      }),
    },
  },
  integrations: [
    sanity({
      projectId: `${SANITY_PROJECT_ID}`,
      dataset: `${SANITY_DATASET_NAME}`,
      useCdn: false,
    }),
    icon(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
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
