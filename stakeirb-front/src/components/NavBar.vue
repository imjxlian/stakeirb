<template>
  <header class="menu-container">
    <div class="grid wrapper nav-container">
      <div class="flex flex-row logo-container">
        <a href="/">
          <img
            src="../assets/images/logos/logo-stakeirb-light.png"
            alt="Stak'Eirb logo"
            class="logo"
          />
        </a>
      </div>

      <div class="flex flex-row bg-primary-dark balance-container">
        <div class="flex flex-row balance-inner">
          <span class="balance-amount">126,321</span>
          <img
            src="../assets/images/icons/coineirb.png"
            alt="Coineirb logo"
            class="currency-icon"
          />
        </div>
        <button class="button success bg-primary-green color-primary-light deposit">+</button>
      </div>

      <div v-if="isLoggedIn" class="flex flex-row right-menu">
        <a class="color-primary-light text-deco-none" href="/profile">
          <div class="flex flex-row username-container">
            <img
              src="../assets/images/users/default-user-img.svg"
              alt="User profile picture"
              class="user-img"
            />
            Swarton1
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

      <div v-else class="flex flex-row right-menu">
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

let isLoggedIn = ref(false)
</script>

<style scoped>
.menu-container {
  background-color: transparent;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
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
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  flex-grow: 0;
  gap: 1rem;
}

.balance-inner {
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
}

.balance-amount {
  letter-spacing: 0.05rem;
}

.logo-container {
  align-items: center;
  justify-content: flex-start;
}

.logo {
  height: 2rem;
}

.deposit {
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.right-menu {
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  border-radius: 1rem;
}

.username-container {
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
</style>
