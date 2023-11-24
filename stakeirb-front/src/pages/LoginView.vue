<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent="userLogin">
          <InputText
            class="mb"
            :placeholder="placeholderEmail"
            v-model="form.email"
            label="Email"
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
          <InputButton class="submit-btn mt" :type="'success'" :value="'Login'" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputButton from '../components/inputs/InputButton.vue'
import InputText from '../components/inputs/InputText.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

import { sha256 } from 'js-sha256';
import Swal from "sweetalert2";

const placeholderEmail = 'email'
const placeholderPassword = 'password'

const router = useRouter()
const store = useStore()

const form = reactive({ email: '', password: '' })

const userLogin = async () => {
  const { email, password } = form
  const hashedPassword = sha256(password)

  try {
    // Faire une requête POST au serveur pour obtenir le jeton JWT
    const response = await axios.post('http://localhost:3000/users/login', { email, hashedPassword });

    // Stocker le token dans le store et dans les en-têtes de chaque requête Axios ultérieure
    await store.dispatch('login', response.data.accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    // Rediriger vers la page d'accueil ou une autre page
    await router.push('/');
  } catch (e) {
    console.log(e)
      await Swal.fire({
        icon: 'error',
        toast: true,
        position: 'bottom',
        title: 'Oops...',
        text: e.response.data.message || "An error occured",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#203141',
        color: '#ffffff',
      });
    }
};
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
