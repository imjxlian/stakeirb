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
    <div class="messages-controls">
      <InputText placeholder="Type your message here..." :action="() => {}" class="message-input" />
      <InputButton value="Send" type="success" :action="sendMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputButton from './inputs/InputButton.vue'
import InputText from './inputs/InputText.vue'
import MessageBox from './MessageBox.vue'
import { useSocket } from '../socket'

useSocket().socket.on('usersOnline', (count) => {
  onlineCount.value = count;
})

useSocket().socket.on('newMessage', (message) => {
  if (messages.length > 100) {
    messages.shift()
  }
  messages.push(message)
})

let onlineCount = ref(0)

const messages = [
  {
    id: 1,
    user: {
      uuid_user: 1,
      username: 'Swarton1',
      pfp_url: '../src/assets/images/users/default-user-img.svg'
    },
    value: 'Je suis là'
  },
  {
    id: 2,
    user: {
      uuid_user: 2,
      username: 'TodoniK',
      pfp_url: '../src/assets/images/users/doge-une.jpeg'
    },
    value: 'Ça va?'
  },
  {
    id: 3,
    user: {
      uuid_user: 1,
      username: 'Swarton1',
      pfp_url: '../src/assets/images/users/default-user-img.svg'
    },
    value: 'Je suis là'
  },
  {
    id: 4,
    user: {
      uuid_user: 1,
      username: 'Swarton1',
      pfp_url: '../src/assets/images/users/default-user-img.svg'
    },
    value: 'Je suis là'
  },
  {
    id: 5,
    user: {
      uuid_user: 1,
      username: 'Swarton1',
      pfp_url: '../src/assets/images/users/default-user-img.svg'
    },
    value: 'Je suis là'
  },
  {
    id: 6,
    user: {
      uuid_user: 1,
      username: 'Swarton',
      pfp_url: '../src/assets/images/users/default-user-img.svg'
    },
    value: 'Imagine ça marche ?'
  }
]

const sendMessage = () => {

  const message = {
    uuid_user: 1,
    value: messageValue
  }

  console.log(message);

  useSocket().socket.emit('sendMessage', message);
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
