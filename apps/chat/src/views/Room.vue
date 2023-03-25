<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores';
import { socket } from '../socket';
import ChatBubble from '../components/ChatBubble.vue';

const route = useRoute();

type Chat = {
  username: string;
  message: string;
  sent: Date;
  isAuthor: boolean;
  userAvatar: string;
};

const store = useUserStore();
const { username, userId } = storeToRefs(store);

const roomInput = ref('');
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
});

function onSubmitChat(event: Event) {
  event.preventDefault();

  const now = new Date();

  socket.emit(
    'message',
    {
      message: chatInput.value,
      sent: now,
      username: username.value,
      userAvatar:
        'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    },
    route.params.id
  );

  chats.value.push({
    message: chatInput.value,
    sent: now,
    username: username.value,
    isAuthor: true,
    userAvatar: 'https://randomuser.me/api/portraits/men/24.jpg',
  });

  chatInput.value = '';
}
</script>

<template>
  <div>
    <p>Logged in as {{ username }} with Id {{ userId }}</p>

    <!-- <div>Press <kbd className="kbd kbd-sm">F</kbd> to pay respects.</div> -->

    <div class="chatbox">
      <div class="w-80 flex flex-col">
        <header class="border-solid border-b border-black p-2">
          <h1>
            Chat room: <span class="bg-gray-200"> {{ $route.params.id }}</span>
          </h1>
        </header>

        <div class="h-full bg-gray-200 overflow-y-auto p-2">
          <ChatBubble
            v-for="(chat, index) in chats"
            :key="index"
            :message="chat.message"
            :username="chat.username"
            :sent-on="chat.sent"
            :is-author="chat.isAuthor"
            :avatar-url="chat.userAvatar"
          />
        </div>

        <form @submit="onSubmitChat" class="w-full">
          <input
            type="text"
            placeholder="Insert message"
            class="input input-bordered block w-full max-w-xs rounded-none"
            v-model="chatInput"
          />
        </form>
      </div>
      <div class="border-l border-solid border-black p-4">
        <!-- <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div>
        <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div>
        <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
button[type=submit]
  @apply rounded px-4 py-2 bg-green-500

.chatbox
  @apply w-96 h-[600px] border border-solid border-black relative flex mx-auto
</style>
