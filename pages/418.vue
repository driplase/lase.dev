<script setup lang="ts">
const reqEvent = useRequestEvent();
if (reqEvent) {
  setResponseStatus(reqEvent, 418)
}

const coffeeCount = Math.round(Math.random() * 32) + 8;

interface Coffee {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const coffeeIcons = [
  "bx:bxs-coffee", 
  "ix:coffee",
  "tabler:coffee",
  "lucide:coffee",
  "lineicons:coffee-cup",
  "charm:coffee",
  "material-symbols:coffee",
  "streamline:coffee-takeaway-cup"
]

const coffees: Coffee[] = [];
for (let i = 0; i < coffeeCount; i++) {
  coffees.push({
    x: Math.random() * 64 - 32,
    y: Math.random() * 128 - 64,
    rotation: Math.random() * 360 - 180,
    scale: Math.random() * .75 + .75,
  })
}
</script>
<template>
  <HeadTemplate title="418" />

  <div class="error-content">
    <div class="wiggle woosh flash ">
      <div class="error-code rainbow-fast">418</div>
      <div class="error-message">
        i'm a teapot
      </div>
    </div>
    <div class="coffees">
      <Icon v-for="c in coffees" :name="coffeeIcons[Math.floor(Math.random() * coffeeIcons.length)]" :size="24 * c.scale" class="woosh" :style="{
        transform: `translate(${c.x}px, ${c.y}px) rotateZ(${c.rotation}deg)`
      }"/>
    </div>
    <div class="error-data">
      <details>
        <summary>show error data</summary>
        <code>
          sorry, i can't serve you a cup of coffee.<br />
          because i ran out of cups.<br />
          <br />
          actually i ain't a teapot
        </code>
      </details>
    </div>
  </div>
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
.coffees {
  margin: 12px 0;
}
.coffees > span {
  margin: 2px;
}
</style>