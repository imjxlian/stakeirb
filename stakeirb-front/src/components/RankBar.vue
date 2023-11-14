<template>
  <div class="bar-container">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
defineProps(['progress'])
</script>

<style scoped>
.bar-container {
  height: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background-color: var(--color-background-light);
}

.progress-bar {
  height: 1rem;
  text-align: right;
  z-index: 1;
  background-color: var(--color-green-primary);
}
</style>
