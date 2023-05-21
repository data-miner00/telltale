<script setup lang="ts">
import { truncateWithEllipsis } from '@/lib/shared/shared.utils';
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
import { GreenCheck, Clipboard } from '@/lib/shared/icons';

const props = defineProps([
  'roomName',
  'description',
  'id',
  'type',
  'groupImgUrl',
  'membersCount',
  'onlineCount',
]);

const truncatedId = computed(() => truncateWithEllipsis(props.id));

const { copy, copied, text } = useClipboard();
</script>

<template>
  <div class="flex rounded py-1 px-2">
    <div class="avatar">
      <div class="w-12 rounded-full">
        <img :src="groupImgUrl" :alt="`${roomName}\'s group profile image'`" />
      </div>
    </div>
    <div class="ml-3">
      <div class="flex gap-1 items-center">
        <div class="text-lg">{{ roomName }}</div>
        <button
          class="border border-solid border-gray-400 text-gray-400 rounded px-1 py-1 text-xs flex items-center"
          @click="copy(id)"
        >
          <span class="block mr-1">{{ truncatedId }}</span>
          <Clipboard v-if="copied" />
          <GreenCheck v-else />
        </button>
        <div
          class="border border-solid border-gray-400 text-gray-400 rounded px-1 py-1 text-xs"
        >
          {{ type }}
        </div>
      </div>
      <div class="text-sm text-gray-500">
        {{ membersCount }} members • {{ onlineCount }} online
      </div>
    </div>
  </div>
</template>
