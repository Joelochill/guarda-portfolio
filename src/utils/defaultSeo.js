import ebGaramondWoff2 from '@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2?url';
import { ogImageUrl } from '../cms/queries';

const titleDefault = 'GUARDA';
const descriptionDefault = 'Página oficial de GUARDA, el proyecto musical de Joel Rico Rada. Descubre su música, conciertos y trayectoria.';
const siteUrl = import.meta.env.SITE_URL;

export const defaultSeo = {
  title: titleDefault,
  titleTemplate: `%s | ${titleDefault}`,
  titleDefault,
  description: descriptionDefault,
  canonical: siteUrl,
  charset: 'UTF-8',
  languageAlternates: [
    { href: siteUrl, hrefLang: 'es' },
    { href: `${siteUrl}/en/`, hrefLang: 'en' },
    { href: siteUrl, hrefLang: 'x-default' },
  ],
  openGraph: {
    basic: {
      title: titleDefault,
      type: 'website',
      url: siteUrl,
      image: ogImageUrl,
    },
    optional: {
      description: descriptionDefault,
      locale: 'es_ES',
      localeAlternate: ['en_US'],
      siteName: titleDefault,
    },
    image: {
      secureUrl: ogImageUrl,
      alt: 'Joel Rico Rada Photo',
    },
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
