<script setup lang="ts">
const STATUS_CODES: { [key: string]: string } = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': "I'm a Teapot",
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Too Early',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',

  '999': '503: SERVICE_UNAVAILABLE',
}

const route = useRoute()
const statusCode = parseInt(route.params.status.toString())
const statusMessage = STATUS_CODES[statusCode.toString()] || 
  (/^2\d{2}$/.test(statusCode.toString()) ? "notError" : "undefined");

if (statusCode === 418) navigateTo('/418');

const reqEvent = useRequestEvent();
if (reqEvent) {
  if (!/^(1\d{2}|999)$/.test(statusCode.toString())) {
    setResponseStatus(reqEvent, statusCode)
  }
  if (statusCode === 999) {
    // vercel returned 503 when 999, why?
    setResponseStatus(reqEvent, 503); 
  }
}
</script>
<template>
  <NuxtLayout name="default" :title="statusCode.toString()" :description="statusMessage">
    <div class="error-content">
      <div class="wiggle woosh flash ">
        <div class="error-code rainbow-fast">{{ statusCode }}</div>
        <div class="error-message">
          {{ statusMessage }}
        </div>
      </div>
      <div class="error-data">
        <details v-if="/^1\d{2}$/.test(statusCode.toString())">
          <summary>show error data</summary>
          <pre><code>i'm actually returning 200, xd</code></pre>
        </details>
        <details v-if="statusCode === 999">
          <summary>show error data</summary>
          <pre><code>Code: `INTERNAL_FUNCTION_SERVICE_UNAVAILABLE`

this error message is not real, but Vercel actually returned this error
when my website was returning real 999 status code.</code></pre>
        </details>
      </div>
    </div>
  </NuxtLayout>
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