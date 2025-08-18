<script setup>
import './styles/global.css';

useHead(() => ({
  htmlAttrs: {},
  title: 'lase.dev',
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "sitemap",
      href: "/sitemap.xml"
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    {
      rel: "preconnect",
      href: "https://cdn.jsdelivr.net",
      crossorigin: true,
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
      content: "https://lase.dev/assets/d_128x128.png",
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
</template>