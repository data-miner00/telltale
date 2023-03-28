<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../lib/shared/shared.stores';

const store = useUserStore();
const { username, userId, avatarUrl } = storeToRefs(store);

function shortenWithEllipsis(text: string) {
  return text.slice(0, 3) + '...' + text.slice(-3);
}
</script>

<template>
  <div
    class="absolute right-10 top-10 border border-solid shadow-sm border-gray-200 py-1 px-2 flex items-center rounded-full"
  >
    <div class="text-right mx-2">
      <p class="font-bold max-w-[100px] overflow-hidden overflow-ellipsis">
        {{ username }}
      </p>
      <p class="text-xs text-gray-400">{{ shortenWithEllipsis(userId) }}</p>
    </div>

    <div class="avatar">
      <div class="w-10 rounded-full">
        <img :src="avatarUrl" alt="User avatar" />
      </div>
    </div>
  </div>
</template>
