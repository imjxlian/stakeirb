<template>
  <div class="message-box">
    <div class="user">
      <img class="user-img" :src="message.User.pfp_url" alt="" v-if="message.User.pfp_url" />
      <span class="user-name">{{ message.User.username }}</span>
    </div>
    <span class="message">{{ message.message }}</span>
  </div>
</template>

<script setup>
defineProps(['message'])
</script>

<style scoped>
.message-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: var(--grey-400);
}

.user-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.message {
  font-size: 0.9rem;
  font-weight: 500;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
}

.user-img {
  height: 1rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
