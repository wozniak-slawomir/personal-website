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
    prerender: {
      crawlLinks: true, // Crawler will follow links to find and optimize images
      failOnError: false, // Don't fail build if some images are missed
    }
  },

  // Route Rules for caching strategy
  routeRules: {
    '/': {
      prerender: true, // Prerender homepage with images
      headers: { 
        'Cache-Control': 'public, max-age=3600, s-maxage=86400' // 1 hour browser, 24 hours CDN
      }
    },
    // Blog pages - ISR with stale-while-revalidate
    '/blog/**': {
      prerender: true, // Prerender all blog pages with images
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
    provider: 'ipx', // Use ipx provider for local image optimization with Sharp
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
          src: 'https://t.contentsquare.net/uxa/23ef54d6e14ea.js',
          async: true,
        },
        {
          innerHTML: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '686040061255221'); fbq('track', 'PageView');
          `,
        },
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

  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/i18n', 
    '@nuxt/image', 
    'motion-v/nuxt', 
    '@nuxtjs/sitemap', 
    '@nuxtjs/robots', 
    'nuxt-schema-org', 
    'nuxt-seo-utils', 
    '@nuxtjs/partytown',
    'nuxt-llms',
  ],

  llms: {
    domain: 'https://slawomir-wozniak.pl',
    title: 'Sławomir Woźniak - Twój partner w technologii i biznesie',
    description: 'Partner technologiczny dla małych biznesów. Pomagam nie-technicznym przedsiębiorcom zrozumieć i wdrożyć narzędzia technologiczne. Programista obeznany z technologiami internetowymi, skupiony na wartości dodanej dla użytkownika.',
    sections: [
      {
        title: 'O mnie',
        description: 'Kim jestem i jakie wartości wyznaję. Partnerska relacja, skupienie na wiedzy i jakości.',
        links: [
          {
            title: 'Bio',
            description: 'Krótka biografia - IT, Psychologia, Biznes. Doświadczenie i specjalizacja.',
            href: '/bio',
          },
          {
            title: 'Wizja',
            description: 'Misja, wizja i wartości. Partnerstwo, jakość, zaufanie i dobro społeczeństwa.',
            href: '/wizja',
          },
        ],
      },
      {
        title: 'Usługi',
        description: 'Rozwiązania technologiczne dla przedsiębiorców na początkowym stadium z wysoką elastycznością.',
        links: [
          {
            title: 'Portfolio',
            description: 'Zrealizowane projekty i wdrożenia technologiczne dla małych biznesów.',
            href: '/portfolio',
          },
          {
            title: 'Kalkulator subskrypcji',
            description: 'Narzędzie do obliczania kosztów subskrypcji narzędzi i usług.',
            href: '/kalkulator-subskrypcji',
          },
        ],
      },
      {
        title: 'Blog',
        description: 'Artykuły dla osób refleksyjnych, potrafiących skupić uwagę na treści. Technologia wspierająca biznes.',
        links: [
          {
            title: 'Artykuły blogowe',
            description: 'Artykuły o technologii, biznesie i rozwoju. Fakty z domieszką własnych komentarzy.',
            href: '/blog/[slug]',
          },
        ],
      },
      {
        title: 'Kontakt',
        description: 'Nawiąż współpracę. Partnerstwo w zarabianiu pieniędzy i budowaniu relacji.',
        links: [
          {
            title: 'Formularz kontaktowy',
            description: 'Strona z formularzem kontaktowym do nawiązania współpracy.',
            href: '/contact',
          },
          {
            title: 'Newsletter',
            description: 'Zapisz się, aby otrzymywać najnowsze artykuły o technologii i biznesie.',
            href: '/newsletter',
          },
        ],
      },
    ],
    notes: [
      'Strona w języku polskim.',
      'Dla przedsiębiorców szukających kreatywnych rozwiązań technologicznych.',
      'Skupienie na wartości biznesowej, nie tylko technologicznej.',
      'Zaktualizowano 25 grudnia 2025.',
    ],
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },

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
        files: [
          'en/common.json',
          'en/homepage.json',
          'en/blog.json',
          'en/calculator.json',
          'en/bio.json',
          'en/services.json',
          'en/vision.json',
          'en/contact.json'
        ],
      },
      {
        code: 'pl',
        name: 'Polski',
        files: [
          'pl/common.json',
          'pl/homepage.json',
          'pl/blog.json',
          'pl/calculator.json',
          'pl/bio.json',
          'pl/services.json',
          'pl/vision.json',
          'pl/contact.json'
        ],
      },
    ],
    defaultLocale: DEFAULT_LOCALE,
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
  },

  compatibilityDate: '2025-04-14',
},
)