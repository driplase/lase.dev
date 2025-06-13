<script setup lang="ts">
import Default from '@/layouts/default.vue';

import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

let route = useRoute();

</script>
<template>
  <Default :title="error?.statusCode.toString()">
    <div class="error-content">
      <div class="wiggle woosh flash ">
        <div class="error-code rainbow-fast">{{ error?.statusCode }}</div>
        <div class="error-message" v-if="error?.statusCode === 404">
          Page not found: 
          <code id="url">
            {{ error.statusMessage?.match(/(\/[^\/\s]+)+$/)?.at(0) }}
          </code>
        </div>
        <div class="error-message" v-else>
          {{ error?.statusMessage }}
        </div>
      </div>
      <div class="error-data">
        <details v-if="error?.data && error?.statusCode !== 404">
          <summary>show error data</summary>
          <pre><code>{{ error?.data }}</code></pre>
        </details>
      </div>
    </div>
  </Default>
</template>
<style scoped>
  .error-content {
    text-align: center;
    padding: 9rem 12px;
    padding-bottom: 1rem;
  }
  .error-code {
    font-size: min(15dvw, 8rem);
    padding: 8px;
    padding-bottom: 0;
    font-weight: bolder;
  }
  .error-message {
    margin: 2px;
  }
  .error-data {
    margin: 3rem 1rem;
    padding: 3px;
  }
</style>