// https://nuxt.com/docs/api/configuration/nuxt-config

import { DEFAULT_LOCALE } from './const/defaultLocale'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  build: {
    transpile: ['vue-toastification'],
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          charset: 'utf-8',
        },
        {
          name: 'description',
          content: 'Experienced software engineer interested in business, management, psychology and science in general. Trying to build a better future for all of us.',
        },
        {
          name: 'keywords',
          content: 'Software engineering, business, management, psychology, business psychology, science, blog, personal website, brand',
        },
        {
          property: 'og:title',
          content: 'Slawomir Wozniak - Software Engineering',
        },
      ],
      link: [
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
          as: 'style',
          onload: 'this.onload=null;this.rel=\'stylesheet\'',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-DFBHM9ZDXV',
          async: true,
        },
        'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-DFBHM9ZDXV\');',
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          animation: {
            slide: 'slide 20s linear infinite',
            bgAnimationSlow: 'backgroundAnimation 33s ease-in-out infinite',
            bgAnimationMid: 'backgroundAnimation 28s ease-in-out infinite',
            bgAnimationFast: 'backgroundAnimation 13s ease-in-out infinite',
            bgAnimationSlowReverse: 'backgroundAnimation 33s ease-in-out infinite reverse',
            bgAnimationMidReverse: 'backgroundAnimation 28s ease-in-out infinite reverse',
          },
          keyframes: {
            slide: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-1122px)' },
            },
            backgroundAnimation: {
              '0%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-50px)' },
              '50%': { transform: 'translateX(100px)' },
              '75%': { transform: 'translateX(-200px)' },
              '100%': { transform: 'translateX(0)' },
            },
          },
        },
      },
      important: true,
    },
  },
  i18n: {
    locales: [ 'en', 'pl', 'fr', 'es' ],
    defaultLocale: DEFAULT_LOCALE,
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
  },
},
)