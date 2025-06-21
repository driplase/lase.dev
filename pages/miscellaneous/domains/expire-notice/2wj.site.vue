<script setup>
const { locale } = useI18n()
const dayjs = useDayjs()

watch(locale, (newLocale) => {
  dayjs.locale(newLocale)
}, { immediate: true })

const expiresAt = dayjs('2025-7-10');
</script>
<template>
  <NuxtLayout name="default" title="2wj.site" align="center">
    <div class="container">
      <h1 class="monospace woosh flash name">2wj.site</h1>
      <p>{{ $t('misc.domains.expire.1') }}</p>
      <div class="flex-row">
        <h2 class="flash wiggle">{{ expiresAt.fromNow(true) }}</h2>
        <h4 class="fw-normal after-format">{{ $t('misc.domains.expire.2') }}</h4>
      </div>
      <small class="opacity-50">
        {{ $t('misc.domains.expire.3') }}
      </small>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 72vh;
  padding: auto;
}
.name {
  padding: 2rem
}
.after-format {
  padding: 5px;
  padding-bottom: .54rem;
}
a {
  text-decoration: none;
}
</style>