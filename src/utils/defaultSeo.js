import ebGaramondWoff2 from '@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2?url';
import { ogImageUrl } from '../cms/queries';

const siteUrl = import.meta.env.SITE_URL;

export const defaultSeo = {
  titleTemplate: '%s | GUARDA',
  charset: 'UTF-8',
  languageAlternates: [
    { href: siteUrl, hrefLang: 'es' },
    { href: `${siteUrl}/en/`, hrefLang: 'en' },
    { href: siteUrl, hrefLang: 'x-default' },
  ],
  openGraph: {
    basic: {
      type: 'website',
      image: ogImageUrl,
    },
    optional: {
      siteName: 'GUARDA',
    },
    image: {
      secureUrl: ogImageUrl,
      alt: 'Joel Rico Rada Photo',
    }
  },
  extend: {
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      { rel: 'sitemap', href: '/sitemap-index.xml' },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: ebGaramondWoff2,
        crossorigin: 'anonymous',
      },
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
};
