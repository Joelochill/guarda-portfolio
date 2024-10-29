import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware( async (context, next) => {
  // const urlPath = context.request.url;
  console.log(context);
  return next();
});
