import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  trailingSlash: 'never',
  vite: {
    ssr: {
      noExternal: ['sass-mq', 'normalize.css'],
    },
  },
})
