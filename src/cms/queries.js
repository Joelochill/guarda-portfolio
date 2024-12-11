import imageUrlBuilder from '@sanity/image-url';
import { getImage } from 'astro:assets';
import { sanityClient } from 'sanity:client';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

// Projects' queries

const rawProjects = await sanityClient.fetch(
  `*[_type == "project"] | order(releaseDate desc) { 
    title, cover, imageAlt, bandcampLink 
  }`,
);

export const projects = rawProjects.map(({ cover, ...rest }) => ({
  coverUrl: urlFor(cover).width(1400).url(),
  ...rest,
}));

// Live's queries & formatting

const eventsES = await sanityClient.fetch(
  `*[_type == "event"] | order(date desc) { 
    date,
    "city": city[_key == "es"][0].value, 
    "country": country[_key == "es"][0].value,
    title, 
    link 
  }`,
);

const eventsEN = await sanityClient.fetch(
  `*[_type == "event"] | order(date desc) { 
    date, 
    "city": city[_key == "en"][0].value,
    "country": country[_key == "en"][0].value,
    title, 
    link 
  }`,
);

const uniqueYears = new Set(
  eventsES.map((event) => new Date(event.date).getFullYear()),
);

export const liveContentES = [...uniqueYears].map((year) => ({
  year,
  events: eventsES.filter(
    (event) => new Date(event.date).getFullYear() === year,
  ),
}));

export const liveContentEN = [...uniqueYears].map((year) => ({
  year,
  events: eventsEN.filter(
    (event) => new Date(event.date).getFullYear() === year,
  ),
}));

// home image's queries

const homeImages = await sanityClient.fetch(
  '*[_type == "homeImage"] | order(publishedAt desc) { image }',
);

export const background = await getImage({
  src: urlFor(homeImages[0].image).url(),
  format: 'webp',
  inferSize: true,
});
