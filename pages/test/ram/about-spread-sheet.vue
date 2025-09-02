<script setup>
async function getCsvFromSpreadSheet(url) {
  const prefix = /^\/\*O_o\*\/\ngoogle\.visualization\.Query\.setResponse\(/;
  const suffix = /\);$/;
  
  const res = await fetch(url);
  const rawData = await res.text();
  const jsonData = rawData.replace(prefix, '').replace(suffix, '')
  const rawJson = JSON.parse(jsonData);
  const data = rawJson.table.rows.map(i=>i.c.map(k=>k.v))

  return data
}

const profile = await getCsvFromSpreadSheet("https://docs.google.com/spreadsheets/d/1D99uRWiIvtncSVIWbYG-Ky8p81lywyCiUgZizXJznvU/gviz/tq?tqx=out:json&sheet=プロフ")


</script>
<template>
  <NuxtLayout name="default" title="/test/ram/aboutSpreadSheet" align="center">
    
    <table>
      <tr v-for="column in profile">
        <td v-for="row in column" v-html="row">
        </td>
      </tr>
    </table>

  </NuxtLayout>
</template>