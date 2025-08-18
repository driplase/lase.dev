<script setup>
const { locale } = useI18n()
const dayjs = useDayjs()

const expiresAt = dayjs('2025-6-23  23:59');
const expireEta = ref(expiresAt.fromNow(true));

watch(locale, (newLocale) => {
  dayjs.locale(newLocale)
  if (expireEta) {
    expireEta.value = expiresAt.locale(newLocale).fromNow(true)
  }
}, { immediate: true })

onMounted(() => {
  setTimeout(() => {
    setInterval(() => {
      expireEta.value = expiresAt.locale(locale.value).fromNow(true)
    }, 1e3)
  }, 1e3 - dayjs().millisecond)
})
</script>
<template>
  <NuxtLayout name="default" title="2wj.site" align="center">

    <!--
    <div class="container">
      <h1 class="monospace woosh flash name">2wj.site</h1>
      <p>{{ $t('misc.domains.expire.1') }}</p>
      <div class="flex-row">
        <h1 class="flash wiggle">{{ expireEta }}</h1>
        <h4 class="fw-normal after-format">{{ $t('misc.domains.expire.2') }}</h4>
      </div>
      <p class="monospace">
        <small><i>({{ expiresAt.format(LL) }})</i></small>
      </p>
      <br>
      <small class="opacity-50">
        {{ $t('misc.domains.expire.3') }}
      </small>
    </div>
    -->

    <div class="container">
      <h2>GGs, the domain name is already expired XD</h2>
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
  padding: .8rem;
  font-size: 5rem;
}
.after-format {
  padding: 5px;
  padding-bottom: 1.2rem;
}
a {
  text-decoration: none;
}
</style>