<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores';
import router from '../routes';

const room = ref();
const username = ref('');

const userStore = useUserStore();
const { setUsername } = userStore;

function handleLogin(event: Event) {
  event.preventDefault();
  setUsername(username.value);
  router.push({ path: `/room/lobby` });
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div
      class="text-6xl text-center font-bold uppercase tracking-wide text-cyan-600"
    >
      Telltale
    </div>
    <h1>Sign In</h1>
    <p>Join casually with any username or connect with Metamask.</p>
    <form @submit="handleLogin">
      <input
        class="input-bordered input"
        v-model="username"
        name="username"
        type="text"
        placeholder="Username"
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="bg-black h-px w-full my-10"></div>
    <button class="btn btn-primary bg-orange-500">Connect with Metamask</button>
  </div>
</template>
