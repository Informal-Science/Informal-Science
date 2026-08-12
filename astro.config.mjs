import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://basic-science-club-alliance-of-fzyz.github.io',
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
