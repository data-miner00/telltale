<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../lib/shared/shared.stores';
import { socket } from '../lib/shared/shared.socket';
import { type Chat } from '../lib/shared/shared.types';
import { MOCK_AVATAR_URL_FEMALE } from '@/lib/shared/shared.constants';
import ChatMessage from '@/lib/modules/chat/ChatMessage.vue';
import ChatInput from '@/lib/modules/chat/ChatInput.vue';

const route = useRoute();
const store = useUserStore();
const { username, avatarUrl } = storeToRefs(store);

const chatContainer = ref<HTMLDivElement>();
const chatInput = ref('');
const chats = ref<Chat[]>([]);

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (oldId) socket.emit('leave', oldId);
    socket.emit('join', newId);
    chats.value.length = 0;
  }
);

onMounted(() => {
  socket.emit('join', route.params.id);
});

onUnmounted(() => {
  socket.emit('leave', route.params.id);
});

socket.on('message', (message) => {
  chats.value.push({
    username: message.username as string,
    sent: new Date(),
    message: message.message as string,
    isAuthor: false,
    userAvatar: message.userAvatar as string,
  });

  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value?.scrollHeight || 0;
  }
});

function onSubmitChat(message: any) {
  const now = new Date();

  socket.emit(
    'message',
    {
      message,
      sent: now,
      username: username.value,
      userAvatar: MOCK_AVATAR_URL_FEMALE,
    },
    route.params.id
  );

  chats.value.push({
    message,
    sent: now,
    username: username.value,
    isAuthor: true,
    userAvatar: avatarUrl.value,
  });

  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value?.scrollHeight || 0;
  }

  chatInput.value = '';
}
</script>

<template>
  <div class="h-full w-full overflow-hidden relative">
    <div class="overflow-y-auto h-full" ref="chatContainer">
      <ChatMessage
        v-for="(chat, index) in chats"
        :key="index"
        :message="chat.message"
        :avatar-url="chat.userAvatar"
      />
      <div class="h-52"></div>
    </div>
    <div
      class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 bg-gradient-to-b from-transparent via-white to-white"
    >
      <div class="h-9"></div>
      <ChatInput @message-fired="onSubmitChat" />
      <div
        class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6"
      >
        <span class="underline">Telltale ChatGPT Mar 14 Version</span>. Free
        Research Preview. Our goal is to mingle AI systems with the vibrant
        community through thought sharing and communication.
      </div>
    </div>
  </div>
</template>
