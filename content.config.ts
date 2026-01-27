import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
    }),
  },
});