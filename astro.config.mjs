import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://informal-science.org',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
