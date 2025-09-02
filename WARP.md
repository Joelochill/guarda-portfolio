# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is GUARDA's official portfolio website - an Astro-based static site for Joel Rico Rada's experimental music project. The site is bilingual (Spanish/English) and integrates with Sanity CMS for content management.

## Core Development Commands

### Development Server
```bash
npm run dev          # Start development server at localhost:4321
npm run start        # Alias for dev
npm run expose       # Expose local server via cloudflared tunnel
```

### Build & Deploy
```bash
npm run build        # Build production site to ./dist/
npm run preview      # Preview build locally
```

### Code Quality & Formatting
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run prettier     # Check Prettier formatting
npm run prettier:fix # Fix Prettier formatting
npm run stylelint    # Run Stylelint on CSS/Astro files
npm run stylelint:fix # Fix Stylelint issues
npm run format       # Run all formatting tools (prettier + eslint + stylelint)
```

### Astro Commands
```bash
npm run astro        # Run Astro CLI
npm run astro add    # Add integrations
npm run astro check  # Type checking and diagnostics
```

## Architecture Overview

### Technology Stack
- **Framework**: Astro 5.x with static output
- **CMS**: Sanity headless CMS integration
- **Internationalization**: Built-in i18n (Spanish default, English alternate)
- **Styling**: Vanilla CSS with component-scoped styles
- **Icons**: astro-icon integration
- **Email**: EmailJS for contact form
- **SEO**: astro-seo with structured data schemas

### Project Structure
```
src/
├── cms/queries.js          # Sanity queries and data fetching
├── components/             # Reusable Astro components
│   ├── seo/               # SEO schema components
│   ├── ContactForm.astro  # EmailJS contact form
│   └── ...                # Navigation, layout components
├── layouts/Layout.astro   # Main layout with SEO setup
├── pages/                 # File-based routing
│   ├── en/               # English pages
│   └── *.astro           # Spanish pages (default)
├── styles/               # Global CSS
├── utils/                # Utilities and configurations
└── icons/                # SVG icons
```

### Key Architectural Patterns

**CMS Integration**: All content is fetched from Sanity CMS in `src/cms/queries.js`. This includes:
- Project/discography data with image optimization
- Event/live show data grouped by year
- About content in both languages
- Background images and SEO assets

**I18n Implementation**: 
- Spanish is the default locale (no prefix)
- English pages are under `/en/` prefix
- Duplicate page structure in `src/pages/` and `src/pages/en/`
- Content queries differentiate by language in Sanity

**SEO Architecture**:
- `defaultSeo.js` provides base configuration
- Page-specific SEO data merges with defaults in `Layout.astro`
- Structured data schemas in `components/seo/`
- OpenGraph and Twitter cards configured per page

**Component Organization**:
- Layout components handle global structure
- Page components are minimal, mainly for data fetching
- SEO components provide structured data
- Responsive design with mobile-first approach

## Environment Variables

Required for build:
```
SITE_URL                    # Production site URL
SANITY_PROJECT_ID          # Sanity project ID
SANITY_DATASET_NAME        # Sanity dataset name
PUBLIC_EMAILJS_KEY         # EmailJS public key
PUBLIC_GOOGLE_ANALYTICS_ID # Google Analytics ID
```

## Deployment

Automatic deployment via GitHub Actions to Hostinger:
- Triggers: pushes to `main`, repository dispatch from Sanity, manual trigger
- Build process includes npm audit for security
- Deployment via FTPS to `/public_html/`
- Environment variables managed via GitHub repository settings

## Development Notes

- Uses Node.js 20 for build consistency
- Browser compatibility checked via eslint-plugin-compat
- CSS follows mobile-first responsive design
- Images optimized through Sanity's image URL builder
- Contact form uses EmailJS (no backend required)
- All content is statically generated at build time
