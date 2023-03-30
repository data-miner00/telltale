<script setup lang="ts">
import { marked } from 'marked';
import { MOCK_AVATAR_URL_MALE } from '@/lib/shared/shared.constants';

defineProps({
  message: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: MOCK_AVATAR_URL_MALE,
  },
});
</script>

<template>
  <div class="odd:bg-gray-100">
    <div
      class="w-full mx-auto flex py-6 max-w-md lg:max-w-2xl xl:max-w-3xl gap-4 md:gap-6"
    >
      <div class="shrink-0">
        <img class="h-8 w-8 rounded-sm" :src="avatarUrl" alt="User avatar" />
      </div>
      <article
        class="break-words overflow-hidden prose w-full max-w-max"
        v-html="marked.parse(message)"
      ></article>
    </div>
  </div>
</template>
