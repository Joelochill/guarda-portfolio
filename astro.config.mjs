import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sanity({
      projectId: 'pgwm690m',
      dataset: 'production',
      useCdn: false,
    }),
  ],
  image: {
    domains: ['astro.build', 'cdn.sanity.io'],
  }
});
