<template>
  <header class="menu-container">
    <div class="grid wrapper nav-container">
      <div class="logo-container">
        <a href="/">
          <img
            src="../assets/images/logos/logo-stakeirb-light.png"
            alt="Stak'Eirb logo"
            class="logo"
          />
        </a>
      </div>

      <div class="balance-container">
        <div class="balance-inner">
          <span class="balance-amount">{{ balance }}</span>
          <CoinIcon />
        </div>
        <button class="button success deposit-btn">+</button>
      </div>

      <div v-if="isLoggedIn" class="right-menu">
        <a class="profile-link" href="/profile">
          <div class="username-container">
            <img
              src="../assets/images/users/default-user-img.svg"
              alt="User profile picture"
              class="user-img"
            />
            {{ username }}
          </div>
        </a>
        <a href="/logout">
          <InputButton
            :value="'Logout'"
            :type="'danger'"
            :disabled="false"
            :action="
              () => {
                console.log('Logout')
              }
            "
          />
        </a>
      </div>

      <div v-else class="right-menu">
        <a href="/login" class="login-text">
          <span>Login</span>
        </a>
        <a href="/register">
          <InputButton
            :value="'Register'"
            :type="'success'"
            :disabled="false"
            :action="
              () => {
                console.log('Logout')
              }
            "
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import InputButton from './inputs/InputButton.vue'
import CoinIcon from './CoinIcon.vue'
import {store} from "@/store";

let isLoggedIn = ref(store.getters.loggedIn)
const username = ref(store.getters.username)
const balance = ref(store.getters.balance)
</script>

<style scoped>
.menu-container {
  background-color: transparent;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.grid {
  display: grid;
  gap: 2rem;
}

.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
}

.nav-container {
  grid-template-columns: 1fr auto 1fr;
  padding: 0.7rem 0;
  gap: 3rem;
}

.nav-container > * {
  flex-grow: 1;
}

.balance-container {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-dark);
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-weight: bold;
  border-radius: 1rem;
}

.balance-inner {
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.balance-amount {
  letter-spacing: 0.05rem;
}

.logo-container {
  align-items: center;
  justify-content: flex-start;
  display: flex;
}

.logo {
  height: 2rem;
}

.deposit-btn {
  background-color: var(--color-green-primary);
  color: var(--color-text-light);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.right-menu {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  border-radius: 1rem;
}

.username-container {
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
  justify-content: space-between;
}

.user-img {
  height: 1rem;
  margin-right: 0.4rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.login-text {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text-light);
  text-decoration: none;
}

.profile-link {
  text-decoration: none;
  color: var(--color-text-light);
}
</style>
