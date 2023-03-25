<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores';

type Chat = {
  username: string;
  message: string;
  sent: string;
};

const { username, userId } = storeToRefs(useUserStore());

const roomInput = ref('sdff');
const chatInput = ref('');
const chats = ref<Chat[]>([]);

function onSubmitChat(event: Event) {
  event.preventDefault();

  const now = new Date();
  const timeString = `${now.getHours()}:${now.getMinutes()}`;

  chats.value.push({
    message: chatInput.value,
    sent: timeString,
    username: username.value,
  });

  chatInput.value = '';
}
</script>

<template>
  <div>
    <p>Logged in as {{ username }} with Id {{ userId }}</p>
    <h1 class="alert shadow-lg">Chat Lobby</h1>
    <div>Press <kbd className="kbd kbd-sm">F</kbd> to pay respects.</div>

    <div class="">
      <div class="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">
          Put me on the Council and not make me a Master!??
        </div>
      </div>
    </div>
    <div class="chatbox">
      <div class="grow">
        <header class="border-solid border-b border-black p-2">
          <h1>
            Chat room: <span class="bg-gray-200"> {{ $route.params.id }}</span>
          </h1>
        </header>
        <div v-for="chat in chats" className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            {{ chat.username }}
            <time className="text-xs opacity-50">{{ chat.sent }}</time>
          </div>
          <div className="chat-bubble">{{ chat.message }}</div>
          <!-- <div className="chat-footer opacity-50">Seen at 12:46</div> -->
        </div>

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
        <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div>
        <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div>
        <div
          class="w-12 h-12 border border-black border-solid rounded-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
button[type=submit]
  @apply rounded px-4 py-2 bg-green-500

.chatbox
  @apply w-96 h-[600px] border border-solid border-black relative flex
</style>
