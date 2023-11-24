<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <h1 class="login-title">Register</h1>
        <form @submit.prevent="registerUser">
          <InputText
            class="mb"
            :placeholder="placeholderUsername"
            v-model="form.username"
            label="Username"
            :disabled="false"
            :actions="[]"
          />
          <InputText
            class="mb"
            :type="'email'"
            :placeholder="placeholderEmail"
            v-model="form.email"
            label="E-mail"
            :disabled="false"
            :actions="[]"
          />
          <InputText
            class="mb"
            :type="'password'"
            :placeholder="placeholderPassword"
            v-model="form.password"
            label="Password"
            :disabled="false"
            :actions="[]"
          />
          <InputButton class="submit-btn mt" :type="'success'" :value="'Register'" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputButton from '../components/inputs/InputButton.vue'
import InputText from '../components/inputs/InputText.vue'

import { reactive } from 'vue'
import { sha256 } from 'js-sha256'
import axios from 'axios'
import router from '@/router'
import { store } from '@/store'
import Swal from 'sweetalert2'

const placeholderUsername = 'TheKing123'
const placeholderEmail = 'email@example.com'
const placeholderPassword = 'YourSecretPassword'
const form = reactive({ username: '', email: '', password: '' })

const registerUser = async () => {
  const { username, email, password } = form
  const hashedPassword = sha256(password)

  try {
    const response = await axios.post('http://localhost:3000/users/register', {
      username,
      email,
      hashedPassword
    })
    await store.dispatch('login', response.data)
    await router.push('/')
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      toast: true,
      position: 'bottom',
      title: 'Oops...',
      text: e.response.data || "An error occured",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#203141',
      color: '#ffffff'
    })
  }
}
</script>
<style scoped>
.container {
  padding: var(--padding-container);
}

.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
  width: 75%;
  background-color: var(--grey-700);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
}

.content {
  width: 50%;
  margin: auto;
}

.login-title {
  margin-top: 0;
}

.mb {
  margin-bottom: 1rem;
}

.mt {
  margin-top: 1rem;
}

.submit-btn {
  width: 100%;
  height: 3rem;
}
</style>
