<template>
  <div class="container">
    <div class="header">
      <div class="online">
        <div class="online-circle"></div>
        <span class="user-count">Online : {{ onlineCount }}</span>
      </div>
    </div>
    <div class="messages-container">
      <MessageBox v-for="message in messages" :key="message.id" :message="message" />
    </div>
    <form class="messages-controls" @submit.prevent="sendMessage">
      <InputText placeholder="Type your message here..." v-model="currentMessage" class="message-input" />
      <InputButton value="Send" type="success" />
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import InputButton from './inputs/InputButton.vue'
import InputText from './inputs/InputText.vue'
import MessageBox from './MessageBox.vue'
import { useSocket } from '@/socket'
import { useStore } from 'vuex'

import axios from 'axios'
import Swal from "sweetalert2";

const store = useStore()

const user_uuid = computed(() => store.getters.uuid_user);

useSocket().socket.on('usersOnline', (count) => {
  onlineCount.value = count;
})

useSocket().socket.on('newMessage', (message) => {
  if (messages.value.length > 100) {
    messages.value.shift();
  }
  messages.value.push(message);

});

const currentMessage = ref('')
let onlineCount = ref(0)

const messages = ref([])

const sendMessage = async () => {
  const message = {
    user_uuid: user_uuid.value,
    message: currentMessage.value
  }

  if(store.getters.loggedIn === true){
    try {
      // Appel à l'API pour envoyer le message
      await axios.post('http://localhost:3000/messages', message);
      currentMessage.value = '';

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        toast: true,
        position: 'bottom',
        title: 'Oops...',
        text: error || "An error occured",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#203141',
        color: '#ffffff',
      });
    }
  } else {
    await Swal.fire({
      icon: 'error',
      toast: true,
      position: 'bottom',
      title: 'Oops...',
      text: "You need to be logged in to send a message!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#203141',
      color: '#ffffff',
    });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: var(--width-online-chat);
  background-color: var(--grey-700);
  height: 100vh;
  position: sticky;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.header {
  padding: 1.85rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--grey-800);
  z-index: 2;
}

.user-count {
  font-size: 0.9rem;
  font-weight: 500;
}

.online {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.online-circle {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-green-primary);
  margin-right: 0.5rem;
}

.messages-container {
  background-color: var(--grey-700);
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  gap: 0.6rem;
  overflow-y: scroll;
  height: 100%;
}

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

.messages-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  background-color: var(--grey-500);
  padding: 1rem;
}

.message-input {
  width: 100%;
}

.user-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.message {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
