import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  trailingSlash: 'never',
  vite: {
    ssr: {
      noExternal: ['sass-mq', 'normalize.css', 'wysiwyg.css'],
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [svelte(), tailwind()],
})
