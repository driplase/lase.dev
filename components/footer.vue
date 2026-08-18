<template>
  <hr />

  <footer class="text-center">

    <div class="footer-container">
      <div class="nav-brand">
        <EffectWrapper as="span" wiggle woosh flash class="inline-block no-ul no-link-blue lase-color-secondary bg-clip-text text-transparent">
          <NuxtLink :href="$localePath('/')" class="inline-block no-ul no-link-blue lase-color-secondary bg-clip-text text-transparent">lase.dev</NuxtLink>
        </EffectWrapper>
      </div>
      <span class="small-text">&copy; {{ new Date().getFullYear() }} driplase</span>
    </div>

    <!-- <div class="text-sm mt-2">
      <Wiggle as="span" text class="inline-block no-link-blue text-gray-400 hover:text-gray-300">
        <NuxtLink
          to="https://github.com/driplase/lase.dev"
          target="_blank"
        >
        {{ $t('footer.source_code') }}
        <Icon
          name="tabler:external-link" 
          class="icon"
        />
        </NuxtLink>
      </Wiggle>
    </div> -->

  </footer>
</template>
<style scoped>
  footer {
    justify-items: center;
    margin: 1.6rem 0;
  }
  hr {
    width: 100dvw;
    margin-bottom: 1.3rem;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  }
  .footer-container {
    display: flex;
    flex-direction: row;
    gap: 32px;
    align-items: center;
    justify-content: center;
  }
  .nav-brand {
    font-size: 28px;
    /* margin: 0 32px; */
    user-select: none;
    padding: 3px;
    font-family: var(--font-monospace);
    font-style: italic;
    font-weight: 500;
    text-shadow: 0 0 8px #e9eeff;
    justify-content: start;
    display: inline-block;

    & > a {
      padding: 0 .32rem;
    }
  }
  .small-text {
    font-size: smaller;
  }
</style>