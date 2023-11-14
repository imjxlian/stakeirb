<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <h1 class="login-title">Register</h1>
        <form>
          <InputText
            class="mb"
            :placeholder="placeholderUsername"
            :value="username"
            label="Username"
            :disabled="false"
            :actions="[]"
          />
          <InputText
            class="mb"
            :type="'email'"
            :placeholder="placeholderEmail"
            :value="email"
            label="E-mail"
            :disabled="false"
            :actions="[]"
          />
          <InputText
            class="mb"
            :type="'password'"
            :placeholder="placeholderPassword"
            :value="password"
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

const placeholderUsername = 'TheKing123'
const placeholderEmail = 'email@example.com'
const placeholderPassword = 'YourSecretPassword'
let username = ''
let email = ''
let password = ''
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
