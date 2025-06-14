// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxtjs/robots'
  ],
  plugins: [
    '~/plugins/effects.client.js'
  ],
  ssr: true,
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'english', file: 'en.js' },
      { code: 'ja', name: '日本語', file: 'ja.js' }
    ],
    lazy: true,
    strategy: "no_prefix",
  },
  site: {
    url: 'https://lase.dev',
    name: 'lase.dev',
  }
})