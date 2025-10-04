<script setup>
const sitename = 'lase.dev';

const props = defineProps({
  title: String,
  description: String,
})

const route = useRoute();

useHead({
  title: props.title ? `${props.title} - ${sitename}` : sitename,
  meta: [
    {
      property: "og:title",
      content: props.title ? `${props.title} - ${sitename}` : sitename
    },
    {
      property: "og:url",
      content: new URL(route.fullPath, 'https://lase.dev').href
    },
    {
      property: "og:description",
      content: props.description || ""
    },
    {
      name: "description",
      content: props.description || ""
    },
  ]
})
</script>