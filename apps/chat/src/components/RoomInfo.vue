<script lang="ts" setup>
import { ref } from 'vue';
import router from '../routes';

defineProps(['room']);

const toRoom = ref('');

function joinRoom(event: Event) {
  if (!toRoom.value) return;
  event.preventDefault();
  router.push({ path: `/room/${toRoom.value}` });
  toRoom.value = '';
}
</script>

<template>
  <div
    class="absolute top-10 left-[50%] border border-solid border-gray-200 rounded-full p-2 flex items-center transform -translate-x-[50%]"
  >
    <div class="w-32">{{ room }}</div>
    <form @submit="joinRoom">
      <input
        v-model="toRoom"
        class="input input-bordered rounded-full"
        type="text"
        placeholder="Go to..."
      />
    </form>
  </div>
</template>
