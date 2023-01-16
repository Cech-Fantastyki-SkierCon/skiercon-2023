import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  trailingSlash: 'never',
  vite: {
    ssr: {
      noExternal: ['sass-mq', 'normalize.css'],
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
})
