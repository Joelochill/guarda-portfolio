import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

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
      PUBLIC_EMAILJS_KEY: envField.string({
        context: 'client',
        access: 'public',
      }),
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
