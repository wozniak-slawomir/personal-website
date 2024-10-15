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
  nitro: {
    compressPublicAssets: true,
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
          content: 'Experienced software engineer interested in business, management, psychology and science in general. Building a better future for all of us.',
        },
        {
          name: 'keywords',
          content: 'Software engineering, business, management, psychology, business psychology, science, blog, personal website, brand',
        },
        {
          property: 'og:title',
          content: 'Slawomir Wozniak - Software Engineering/Business Psychology',
        },
        {
          property: 'og:description',
          content: 'Experienced software engineer interested in business, management, psychology and science in general. Building a better future for all of us.',
        },
        {
          property: 'og:image',
          content: 'https://slawomir-wozniak.pl/og-image.jpg',
        },
        {
          property: 'og:url',
          content: 'https://slawomir-wozniak.pl',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: 'Slawomir Wozniak',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Slawomir Wozniak - Software Engineering/Business Psychology',
        },
        {
          name: 'twitter:description',
          content: 'Experienced software engineer interested in business, management, psychology and science in general. Building a better future for all of us.',
        },
        {
          name: 'twitter:image',
          content: 'https://slawomir-wozniak.pl/og-image.jpg',
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
        {
          rel: 'canonical',
          href: 'https://slawomir-wozniak.pl',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
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
          },
          keyframes: {
            slide: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-1122px)' },
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