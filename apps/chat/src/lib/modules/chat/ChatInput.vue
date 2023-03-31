<script setup lang="ts">
import { ref } from 'vue';
import { Send } from '@/lib/shared/icons';

const message = ref<string>();
const textareaRef = ref<HTMLTextAreaElement>();

const emit = defineEmits({
  messageFired: null,
});

function tryPublishMessage() {
  if (!message.value) return;

  emit('messageFired', message.value);
  message.value = '';
}
</script>

<template>
  <form
    @submit.prevent="tryPublishMessage"
    class="form-control stretch mx-2 gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
  >
    <div class="input-group">
      <textarea
        v-model="message"
        ref="textareaRef"
        type="text"
        class="input input-bordered resize-none overflow-y-auto w-full py-2 md:py-3 md:pl-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
        @keydown.enter.exact.prevent="() => textareaRef?.form?.requestSubmit()"
      />
      <button type="submit" class="btn btn-square">
        <Send />
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.input-group textarea {
  // Firefox
  scrollbar-width: none;

  // IE, Edge
  -ms-overflow-style: none;
}

// Chrome
.input-group textarea::-webkit-scrollbar {
  display: none;
}
</style>
