import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import partytown from '@astrojs/partytown'

// https://astro.build/config
import compress from 'astro-compress'

// https://astro.build/config
import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
  site: 'https://skiercon.pl',
  output: 'server',
  trailingSlash: 'never',
  vite: {
    ssr: {
      noExternal: ['wysiwyg.css', 'astro-seo-schema'],
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    svelte(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    compress({
      svg: false,
      img: false,
      js: false,
    }),
    robotsTxt({
      sitemapBaseFileName: 'sitemap.xml',
    }),
  ],
})
