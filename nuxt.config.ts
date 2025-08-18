import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxtjs/robots',
    'dayjs-nuxt',
    '@nuxt/content',
    '@nuxt/fonts',
  ],
  content: {
    experimental: {
      sqliteConnector: 'native' 
    },
  },
  fonts: {
    defaults: {
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: [
        'cyrillic-ext', 
        'cyrillic', 
        'greek-ext', 
        'greek', 
        'vietnamese', 
        'latin-ext', 
        'latin',
        'japanese',
      ],
    }
  },
  plugins: [
    '~/plugins/effects.client.js',
  ],
  ssr: true,
  dayjs: {
    locales: ['en', 'ja'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'Asia/Tokyo',
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'english', file: 'en.js' },
      { code: 'ja', name: '日本語', file: 'ja.js' }
    ],
    lazy: true,
    strategy: "no_prefix",
  },
  routeRules: {
    // Don't add any /secret/** URLs to the sitemap.xml
    '/test/**': { robots: false },
  },
  robots: {
    disallow: [
      '/test/**'
    ]
  },
  site: {
    url: 'https://lase.dev',
    name: 'lase.dev',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})