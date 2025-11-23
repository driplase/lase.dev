<template>
  <div class="w-full m-4">
    <p>
      use this in <NuxtLink to="https://cxkes.me/xbox/xuid">cakes &mdash; XUID Lookup</NuxtLink>
    </p>

    <p>
      drag this to the favorite bar ==> 
      <NuxtLink to="javascript:(()=>{if(location.hostname + location.pathname !== \x22cxkes.me/xbox/xuid\x22){window.open('https://cxkes.me/xbox/xuid', \x22_blank\x22);return;}const xuidHex = document.getElementById('xuidHex').textContent; document.querySelector('div.col-md-12 > hr:nth-of-type(2)').insertAdjacentHTML('beforebegin',`<br><strong>Floodgate UUID</strong>: <code id=\x22uuidFloodgate\x22>00000000-0000-0000-${xuidHex.slice(0,4)}-${xuidHex.slice(4)}</code> <i class=\x22bi bi-clipboard\x22 data-toggle=\x22tooltip\x22 data-placement=\x22top\x22 title=\x22Copy\x22 onclick=\x22copyToClipboard('uuidFloodgate')\x22></i><br>`)})()">
        Floodgate UUID Lookup
      </NuxtLink>
    </p>

    <hr class="glow-line shadow-gray-300 my-4" />

    
    <p>
      <NuxtLink to="https://cxkes.me/xbox/xuid">cakes &mdash; XUID Lookup</NuxtLink> でつかってね
    </p>

    <p>
      お気に入りバーにこいつをぶちこんで →→→ 
      <NuxtLink to="javascript:(()=>{if(location.hostname + location.pathname !== \x22cxkes.me/xbox/xuid\x22){window.open('https://cxkes.me/xbox/xuid', \x22_blank\x22);return;}const xuidHex = document.getElementById('xuidHex').textContent; document.querySelector('div.col-md-12 > hr:nth-of-type(2)').insertAdjacentHTML('beforebegin',`<br><strong>Floodgate UUID</strong>: <code id=\x22uuidFloodgate\x22>00000000-0000-0000-${xuidHex.slice(0,4)}-${xuidHex.slice(4)}</code> <i class=\x22bi bi-clipboard\x22 data-toggle=\x22tooltip\x22 data-placement=\x22top\x22 title=\x22Copy\x22 onclick=\x22copyToClipboard('uuidFloodgate')\x22></i><br>`)})()">
        Floodgate UUID Lookup
      </NuxtLink>
    </p>
  </div>
</template>