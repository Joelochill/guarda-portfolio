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

const eventsES = await sanityClient.fetch(
  `*[_type == "event"] | order(date desc) { 
    date,
    "city": city[_key == "es"][0].value, 
    "country": country[_key == "es"][0].value,
    "title": title[_key == "es"][0].value,
    link 
  }`,
);

const eventsEN = await sanityClient.fetch(
  `*[_type == "event"] | order(date desc) { 
    date, 
    "city": city[_key == "en"][0].value,
    "country": country[_key == "en"][0].value,
    "title": title[_key == "en"][0].value,
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

// home background query

const homeBackground = await sanityClient.fetch(
  '*[_type == "img" && title == "home-background"][0] { image }',
);

export const backgroundUrl = urlFor(homeBackground.image).width(2000).url();
