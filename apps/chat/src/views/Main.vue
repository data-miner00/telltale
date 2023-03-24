<script setup lang="ts">
import { ref } from 'vue';

type Chat = {
  message: string;
  sent: Date;
};

const roomInput = ref('sdff');
const chatInput = ref('');
const chats = ref<Chat[]>([]);

function onFormSubmit(event: Event) {
  event.preventDefault();
  roomInput.value = 'SUBMITTED!!!!!!!!!!!';
}

function onSubmitChat(event: Event) {
  event.preventDefault();

  chats.value.push({
    message: chatInput.value,
    sent: new Date(),
  });

  chatInput.value = '';
}
</script>

<template>
  <div>
    <h1 class="alert shadow-lg">Chat Lobby</h1>

    <div class="">
      <div class="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">
          Put me on the Council and not make me a Master!??
        </div>
      </div>

      <form @submit="onFormSubmit">
        <label for="roomInput">Enter room id</label>
        <input
          id="roomInput"
          type="text"
          placeholder="Please enter the room id"
          v-model="roomInput"
        />

        <div class="input-info">Input: {{ roomInput }}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div class="chatbox">
      <div v-for="chat in chats" className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">{{ chat.message }}</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
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
  </div>
</template>

<style lang="sass" scoped>
button[type=submit]
  @apply rounded px-4 py-2 bg-green-500

.chatbox
  @apply w-96 h-[600px] border border-solid border-black relative
</style>
