<template>
  <div class="bar-container bg-primary-light">
    <div class="progress-bar bg-primary-green" :style="{ width: progress + '%' }"></div>
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
}

.progress-bar {
  height: 1rem;
  text-align: right;
  z-index: 1;
}
</style>
