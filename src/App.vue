<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h3>Qu Challenge</h3>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-width: 100vw;
  text-align: center;
  padding-top: calc(var(--section-gap) / 6);
  padding-bottom: calc(var(--section-gap) / 2);
}

h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
}
</style>
