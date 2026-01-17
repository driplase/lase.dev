import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'content/**.md',
      schema: z.object({
        createdAt: z.date(),
        description: z.string(),
        title: z.string(),
      }),
    })
  },
})