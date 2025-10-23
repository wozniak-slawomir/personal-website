// https://nuxt.com/docs/api/configuration/nuxt-config

import { DEFAULT_LOCALE } from './const/defaultLocale'
import { config } from 'dotenv'
config()

export default defineNuxtConfig({
  site: {
    url: 'https://slawomir-wozniak.pl',
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.VITE_API_URL,
    },
    VITE_SMTP_HOST: process.env.VITE_SMTP_HOST,
    VITE_SMTP_PORT: process.env.VITE_SMTP_PORT,
    VITE_SMTP_USER: process.env.VITE_SMTP_USER,
    VITE_SMTP_PASS: process.env.VITE_SMTP_PASS,
    VITE_MAIL_RECEIVER: process.env.VITE_MAIL_RECEIVER,
    VITE_SENDER_MAIL: process.env.VITE_SENDER_MAIL,
  },

  build: {
    transpile: ['vue-toastification'],
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            animations: ['motion-v'],
          },
        },
      },
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  // Route Rules for caching strategy
  routeRules: {
    '/': {
      headers: { 
        'Cache-Control': 'public, max-age=3600, s-maxage=86400' // 1 hour browser, 24 hours CDN
      }
    },
    // Blog pages - ISR with stale-while-revalidate
    '/blog/**': { 
      isr: 86400,
      headers: { 
        'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400'
      }
    },
    '/code/**': { 
      isr: 3600,
      headers: { 
        'Cache-Control': 'public, max-age=3600, s-maxage=7200'
      }
    },
    // API routes - no caching for dynamic data
    '/api/**': { 
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
    },
    // Static assets - long-term caching
    '/_nuxt/**': { 
      headers: { 
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  },

  image: {
    inject: true,
    quality: 80,
    format: ['webp', 'avif'],
  },

  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          charset: 'utf-8',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
          as: 'style',
          onload: 'this.onload=null;this.rel=\'stylesheet\'',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
          media: 'print',
          onload: 'this.media=\'all\'',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
      script: [
        {
          innerHTML: `
            // Fallback font loading for critical FCP
            if (!document.fonts || !document.fonts.check('1em Outfit')) {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap';
              document.head.appendChild(link);
            }
          `,
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-DFBHM9ZDXV',
          async: true,
          defer: true,
          type: 'text/partytown',
        },
        {
          innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-DFBHM9ZDXV\');',
          defer: true,
          type: 'text/partytown',
        },
      ],
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/image', 'motion-v/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org', 'nuxt-seo-utils', '@nuxtjs/partytown'],

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
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'pl',
        name: 'Polski',
        file: 'pl.json',
      },
    ],
    defaultLocale: DEFAULT_LOCALE,
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
  },

  compatibilityDate: '2025-04-14',
},
)