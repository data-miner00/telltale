<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../lib/shared/shared.stores';
import { socket } from '../lib/shared/shared.socket';
import { type Chat } from '../lib/shared/shared.types';
import {
  MOCK_AVATAR_URL_FEMALE,
  RANDOM_IMG_URL,
} from '@/lib/shared/shared.constants';
import ChatMessage from '@/lib/modules/chat/ChatMessage.vue';
import ChatInput from '@/lib/modules/chat/ChatInput.vue';
import EmptyStripe from '@/lib/modules/chat/EmptyStripe.vue';

const route = useRoute();
const store = useUserStore();
const chatsStorage = useStorage<Chat[]>(`${route.params.id}-chat-history`, []);
const { username, avatarUrl } = storeToRefs(store);

const chatContainer = ref<HTMLDivElement>();
const chats = ref<Chat[]>([]);
const isDetailsOpen = ref(false);

onMounted(() => {
  socket.emit('join', route.params.id);

  chats.value = chatsStorage.value;
});

onUnmounted(() => {
  socket.emit('leave', route.params.id);
});

socket.on('message', (message) => {
  chats.value.push({
    username: message.username as string,
    sent: new Date(),
    content: message.content as string,
    isAuthor: false,
    userAvatar: message.userAvatar as string,
  });

  if (chatContainer.value) {
    chatContainer.value?.scrollTo({
      top: chatContainer.value?.scrollHeight,
      behavior: 'smooth',
    });
  }

  chatsStorage.value = chats.value;
});

function onSubmitChat(message: any) {
  const now = new Date();

  socket.emit(
    'message',
    {
      content: message,
      sent: now,
      username: username.value,
      userAvatar: MOCK_AVATAR_URL_FEMALE,
    },
    route.params.id
  );

  chats.value.push({
    content: message,
    sent: now,
    username: username.value,
    isAuthor: true,
    userAvatar: avatarUrl.value,
  });

  if (chatContainer.value) {
    chatContainer.value?.scrollTo({
      top: chatContainer.value?.scrollHeight,
      behavior: 'smooth',
    });
  }
  chatsStorage.value = chats.value;
}

const roomName = 'Le Meridien Amber Cove 🦄';
const groupImgUrl = RANDOM_IMG_URL;
</script>

<template>
  <div class="flex h-full w-full">
    <div
      @click="isDetailsOpen = !isDetailsOpen"
      class="overflow-hidden relative"
      :class="isDetailsOpen ? 'basis-3/4' : 'basis-full'"
    >
      <div class="overflow-y-auto h-full" ref="chatContainer">
        <div v-if="chats.length > 0">
          <ChatMessage
            v-for="(chat, index) in chats"
            :key="index"
            :message="chat.content"
            :avatar-url="chat.userAvatar"
          />
          <div class="h-52"></div>
        </div>
        <EmptyStripe v-else />
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
    <div
      v-if="isDetailsOpen"
      class="border-l border-solid border-gray-200 basis-1/4"
    >
      <section class="flex flex-col items-center py-8 px-4">
        <div class="avatar mb-4">
          <div class="w-32 rounded-full">
            <img
              :src="groupImgUrl"
              :alt="`${roomName}\'s group profile image'`"
            />
          </div>
        </div>

        <div class="text-xl mb-2">{{ roomName }}</div>
        <div class="text-gray-500 mb-2">Public Group · 28 members</div>
        <div class="avatar-group -space-x-6">
          <div class="avatar">
            <div class="w-8">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="avatar">
            <div class="w-8">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="avatar">
            <div class="w-8">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="avatar">
            <div class="w-8">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="px-4 mb-4">
        <h3 class="text-sm uppercase font-bold text-slate-600 mb-2">
          Description
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta alias
          quia molestias ratione quod voluptatibus, odit ab tempora porro
          reiciendis!
        </p>
      </section>

      <section class="px-4 mb-4">
        <h3 class="text-sm uppercase font-bold text-slate-600 mb-2">Media</h3>

        <div class="flex gap-2">
          <div class="w-28 h-28 overflow-hidden">
            <img :src="RANDOM_IMG_URL" alt="" />
          </div>
          <div class="w-28 h-28 overflow-hidden">
            <img :src="RANDOM_IMG_URL" alt="" />
          </div>
          <div class="w-28 h-28 overflow-hidden">
            <img :src="RANDOM_IMG_URL" alt="" />
          </div>
        </div>
      </section>

      <section class="px-4 mb-4">
        <h3 class="text-sm uppercase font-bold text-slate-600 mb-2">
          Settings
        </h3>
      </section>
    </div>
  </div>
</template>
