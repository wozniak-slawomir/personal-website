// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  important: true,
  theme: {
    extend: {
      animation: {
        slide: 'slide 60s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-1870px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
