<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '../stores';
import router from '@/lib/shared/shared.router';

const room = ref();
const username = ref('');
const usernameInput = ref<HTMLInputElement>();

const userStore = useUserStore();
const { setUsername } = userStore;

onBeforeMount(() => {
  // Use Navigation Guard
  if (localStorage.username) {
    router.push({ path: `/room/lobby` });
  }
});

function handleLogin(event: Event) {
  event.preventDefault();
  if (!username.value && usernameInput.value) {
    usernameInput.value.classList.add('border-red-500');
    return;
  }

  setUsername(username.value);
  router.push({ path: `/room/lobby` });
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="">
      <div
        class="text-2xl text-center font-extrabold uppercase tracking-wide mb-20"
      >
        Telltale.
      </div>
      <p class="text-3xl font-bold text-center mb-2">
        Sign in with your choice
      </p>
      <p class="text-center max-w-sm mb-5">
        Chat anonymously. Get started by arbitrary insert a username so that
        others can address you. Enjoy real-time chats, GPT-enabled bot and
        sending cryptos.
      </p>
      <!-- <h1>Sign In</h1>
      <p>Join casually with any username or connect with Metamask.</p> -->
      <form @submit="handleLogin" class="flex flex-col">
        <input
          ref="usernameInput"
          class="input-bordered input mb-5"
          v-model="username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <button type="submit" class="btn btn-primary block">Let's go</button>
      </form>
      <div class="divider">OR</div>
      <button
        class="btn btn-ghost border border-gray-200 border-solid block w-full"
      >
        Connect with Metamask
      </button>
    </div>
  </div>
</template>
