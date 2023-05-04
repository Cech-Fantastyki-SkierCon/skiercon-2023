/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  corePlugins: {
    container: false,
  },
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          margin: '0 auto',
          maxWidth: '100%',
          padding: '0 15px',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
            padding: '0 35px',
          },
          '@screen lg': {
            maxWidth: '1120px',
          },
        },
      })
    },
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/colors/themes')['[data-theme=halloween]'],
          primary: '#303030',
          'primary-content': 'rgb(211, 211, 211)',
          neutral: '#161717',
        },
      },
    ],
  },
}
