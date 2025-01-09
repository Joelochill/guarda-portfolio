export const defaultSeo = {
  title: 'GUARDA',
  description:
    'Página oficial de GUARDA, el proyecto musical de Joel Rico Rada. Descubre su música, conciertos y trayectoria.',
  canonical: import.meta.env.SITE_URL,
  charset: 'UTF-8',
  openGraph: {
    type: 'website',
    url: import.meta.env.SITE_URL,
    title: 'GUARDA',
    description:
      'Página oficial de GUARDA, el proyecto musical de Joel Rico Rada. Descubre su música, conciertos y trayectoria.',
    images: [
      {
        url: 'https://joelricorada.com/og-image.jpg',
        alt: 'GUARDA',
        width: 1200,
        height: 630,
      },
    ],
  },
};
