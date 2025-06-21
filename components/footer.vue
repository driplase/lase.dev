<template>
  <footer>
    <hr>
    <div class="footer-container">
      <div class="nav-brand">
        <NuxtLink class="inline-block wiggle woosh flash lase-color bg-text-clip no-ul" href="/">lase.dev</NuxtLink>
      </div>
      <span class="small-text">&copy; 2025 driplase</span>
    </div>
  </footer>
</template>
<style scoped>
  footer {
    justify-items: center;
    margin-top: 1.6rem;
  }
  hr {
    width: 100dvw;
    margin-bottom: 1.3rem;
  }
  .footer-container {
    display: flex;
    align-items: center;
  }
  .nav-brand {
    font-size: 28px;
    margin: 0 32px;
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