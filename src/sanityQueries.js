import imageUrlBuilder from '@sanity/image-url';
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

const events = await sanityClient.fetch(
  `*[_type == "event"] | order(date desc) { date, city, country, title, link }`,
);

const uniqueYears = new Set(
  events.map((event) => new Date(event.date).getFullYear()),
);

export const liveContent = [...uniqueYears].map((year) => ({
  year,
  events: events.filter((event) => new Date(event.date).getFullYear() === year),
}));

// home image's queries

const { image, imageAlt: alt } = await sanityClient.fetch(
  `*[_type == "homeImage"] | order(publishedAt desc) [0] { image, imageAlt }`,
);

export const homeImage = { 
  url: urlFor(image).width(1400).url(),
  alt, 
};