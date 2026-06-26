import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
const sitename = 'lase.dev';

export const useHeadTemplate = (route: RouteLocationNormalizedLoadedGeneric, { title, description }: {
  title?: string,
  description?: string,
}) => {
  return useHead({
    title: title ? `${title} - ${sitename}` : sitename,
    meta: [
      {
        property: "og:title",
        content: title ? `${title} - ${sitename}` : sitename
      },
      {
        property: "og:url",
        content: new URL(route.fullPath, 'https://lase.dev').href
      },
      {
        property: "og:description",
        content: description || ""
      },
      {
        name: "description",
        content: description || ""
      },
    ]
  })
}
