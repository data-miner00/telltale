<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores';

const room = ref();
const username = ref('');
const password = ref('');

const userStore = useUserStore();
const { username: un, userId } = storeToRefs(userStore);
const { setUserId, setUsername } = userStore;

function handleLogin(event: Event) {
  event.preventDefault();
  console.log('submited');
  setUserId(Math.random().toString());
  setUsername(username.value);
}
</script>

<template>
  <div>
    <p>Hi {{ un }}, id: {{ userId }}</p>
    <h1>Sign In</h1>
    <p>Sign in casually with username and password or connect to Metamask.</p>
    <form @submit="handleLogin">
      <input
        class="input-bordered input"
        v-model="username"
        name="username"
        type="text"
        placeholder="Username"
      />
      <input
        class="input-bordered input"
        v-model="password"
        name="password"
        type="password"
        placeholder="Password"
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
