<script setup lang="ts">
import router from '@/lib/shared/shared.router';
import { ref } from 'vue';

const inputRef = ref<HTMLInputElement>();

function joinRoom(event: Event) {
  event.preventDefault();
  if (!inputRef.value?.value) return;

  router.push({ path: `/room/${inputRef.value.value}` });
  inputRef.value.value = '';
}
</script>

<template>
  <form class="flex items-center" @submit="joinRoom">
    <input
      ref="inputRef"
      type="text"
      placeholder="Join or create room"
      class="input input-bordered h-8 rounded-none w-96"
    />
    <button class="btn btn-primary h-8 min-h-0 rounded-none">Go</button>
  </form>
</template>
