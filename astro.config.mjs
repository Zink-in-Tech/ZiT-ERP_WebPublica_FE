import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://zinkerp.com',
  integrations: [
    // global.css ya declara las directivas @tailwind; la base inyectada duplicaría todo Tailwind.
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    react()
  ],
  build: {
    inlineStylesheets: 'always'
  },
  compressHTML: true
});
