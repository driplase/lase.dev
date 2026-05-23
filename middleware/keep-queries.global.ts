export default defineNuxtRouteMiddleware((to, from) => {
  if (from.query.cursedCursor !== undefined && !to.query.cursedCursor) {
    return navigateTo({
      path: to.path,
      query: {
        ...to.query,
        cursedCursor: from.query.cursedCursor ?? "true",
      }
    })
  }

  if (from.query.speedMultiplier && parseFloat(from.query.speedMultiplier.toString()) && !to.query.speedMultiplier) {
    return navigateTo({
      path: to.path,
      query: {
        ...to.query,
        speedMultiplier: from.query.speedMultiplier,
      }
    })
  }
})