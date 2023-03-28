<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../shared/shared.stores';
import { truncateWithEllipsis } from '@/lib/shared/shared.utils';

const store = useUserStore();
const { username, userId, avatarUrl } = storeToRefs(store);

const shortenedId = computed(() => truncateWithEllipsis(userId.value, 4));
</script>

<template>
  <div class="flex items-center">
    <div class="text-right mx-2">
      <p class="font-bold max-w-[100px] overflow-hidden overflow-ellipsis">
        {{ username }}
      </p>
      <p class="text-xs text-gray-400">{{ shortenedId }}</p>
    </div>

    <div class="avatar">
      <div class="w-10 rounded-full">
        <img :src="avatarUrl" alt="User avatar" />
      </div>
    </div>
  </div>
</template>
