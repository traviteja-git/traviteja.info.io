// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://traviteja.com',
  trailingSlash: 'always',
  redirects: {
    '/projects/banking-sales-platform/': '/projects/',
    '/projects/gcp-data-platform/':      '/projects/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark:  'github-dark-dimmed',
      },
      wrap: false,
    },
  },
});
