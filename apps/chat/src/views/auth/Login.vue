<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/lib/shared/shared.stores';
import { storeToRefs } from 'pinia';
import {
  LoginResponse,
  mapLoginResponseToUser,
} from '@/lib/shared/shared.mapper';
import { SOCKET_URL } from '@/lib/shared/shared.constants';
import router from '@/lib/shared/shared.router';

const formRef = ref<HTMLFormElement>();
const userStore = useUserStore();
const { setUser } = userStore;

async function handleLogin() {
  const formData = new FormData(formRef.value);
  const username = formData.get('login-username');
  const password = formData.get('login-password');

  try {
    const res = await fetch(`${SOCKET_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await (res.json() as Promise<LoginResponse>);
    const user = mapLoginResponseToUser(data);

    setUser(user);

    router.push({ path: `/room/lobby` });
  } catch (exception) {
    console.error(exception);
    formRef.value?.reset();
  }
}
</script>

<template>
  <main>
    <h1>Hiya</h1>
    <form @submit.prevent="handleLogin" ref="formRef">
      <fieldset>
        <legend>User Credential</legend>

        <label for="login-username">Username</label>
        <input
          type="text"
          placeholder="name"
          required
          id="login-username"
          name="login-username"
          autocomplete="off"
        />
        <label for="login-password">Password</label>
        <input
          type="password"
          placeholder="pwd"
          required
          id="login-password"
          name="login-password"
        />
      </fieldset>

      <button type="submit">Login</button>
    </form>
  </main>
</template>
