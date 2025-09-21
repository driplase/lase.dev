<script setup>
import './styles/global.css';
import LoadAnimation from '@/components/loadAmination/main.vue'

const { locale } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: locale,
  },
  title: 'lase.dev',
  link: [
    {
      rel: "icon",
      //href: "/favicon.ico",
      href: "/assets/logo/d_64x64.webp",
    },
    {
      rel: "sitemap",
      href: "/sitemap.xml"
    },
  ],
  meta: [
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    /* {
      name: "description",
      content: 'lase.dev — This is just a small website of driplase.',
    },
    {
      name: "og:description",
      content: 'lase.dev — This is just a small website of driplase.',
    }, */
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:title",
      content: "lase.dev"
    },
    {
      property: "og:url",
      content: "https://lase.dev"
    },
    {
      property: "og:image",
      content: "https://lase.dev/assets/logo/d_128x128.webp",
    },
    {
      name: "format-detection",
      content: "telephone=no,address=no"
    },
  ]
}));
</script>
<template>
  <NuxtPage />
  
  <LoadAnimation />
</template>