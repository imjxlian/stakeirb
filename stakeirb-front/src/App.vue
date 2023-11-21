<template>
  <div class="container" v-if="isChatVisible">
    <div class="main-container">
      <NavBar />
      <RouterView />
    </div>
    <OnlineChat class="online-chat" />
  </div>
  <div class="main-container" v-else>
    <NavBar />
    <RouterView class="router" />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import OnlineChat from './components/OnlineChat.vue'
import { ref } from 'vue'

let isChatVisible = ref(true)
</script>

<style scoped>
.container {
  display: flex;
  flex: row;
  justify-content: space-between;
  align-items: stretch;
}

.main-container {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
}
</style>
