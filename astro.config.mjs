import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
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
  output: 'static',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  trailingSlash: 'always',
  vite: {
    ssr: {
      noExternal: ['normalize.css'],
    },
    server: {
      allowedHosts: [],
    },
  },
  integrations: [
    icon(),
    sanity({
      projectId: `${SANITY_PROJECT_ID}`,
      dataset: `${SANITY_DATASET_NAME}`,
      useCdn: false,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
    robotsTxt({
      host: true,
    }),
  ],
  image: {
    domains: ['astro.build', 'cdn.sanity.io'],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
