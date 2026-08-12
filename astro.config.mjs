import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://informal-science.github.io',
  base: '/Informal-Science',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
