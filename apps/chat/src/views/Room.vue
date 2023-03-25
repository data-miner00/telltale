<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores';
import { socket } from '../socket';
import ChatBubble from '../components/ChatBubble.vue';

type Chat = {
  username: string;
  message: string;
  sent: Date;
  isAuthor: boolean;
  userAvatar: string;
};

const store = useUserStore();
const { username, userId } = storeToRefs(store);

socket.on('message', (message) => {
  chats.value.push({
    username: message.username as string,
    sent: new Date(),
    message: message.message as string,
    isAuthor: false,
    userAvatar: message.userAvatar as string,
  });
});

const roomInput = ref('');
const chatInput = ref('');
const chats = ref<Chat[]>([]);

function onSubmitChat(event: Event) {
  event.preventDefault();

  const now = new Date();

  socket.emit('message', {
    message: chatInput.value,
    sent: now,
    username: username.value,
    userAvatar:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  });

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
      <div class="grow">
        <header class="border-solid border-b border-black p-2">
          <h1>
            Chat room: <span class="bg-gray-200"> {{ $route.params.id }}</span>
          </h1>
        </header>
        <ChatBubble
          v-for="(chat, index) in chats"
          :key="index"
          :message="chat.message"
          :username="chat.username"
          :sent-on="chat.sent"
          :is-author="chat.isAuthor"
          :avatar-url="chat.userAvatar"
        />

        <form @submit="onSubmitChat" class="absolute bottom-0 left-0">
          <input
            type="text"
            placeholder="Insert text"
            class="input input-bordered w-full max-w-xs"
            v-model="chatInput"
          />
        </form>
      </div>
      <div class="w-20 border-l border-solid border-black p-4">
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
