<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  username: String,
  sentOn: Date,
  message: String,
  avatarUrl: String,
  isAuthor: Boolean,
});

const formattedSentTime = computed(() => {
  const hours = props.sentOn?.getHours();
  const minutes = props.sentOn?.getMinutes();
  return `${hours! < 10 ? '0' + hours : hours}:${
    minutes! < 10 ? '0' + minutes : minutes
  }`;
});
</script>

<template>
  <div :className="`chat ${isAuthor ? 'chat-end' : 'chat-start'}`">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img :src="avatarUrl" alt="User avatar" />
      </div>
    </div>
    <div className="chat-header">
      {{ username }}
      <time className="text-xs opacity-50">{{ formattedSentTime }}</time>
    </div>
    <div :className="`chat-bubble break-all ${isAuthor ? 'bg-pink-600' : ''}`">
      {{ message }}
    </div>
    <!-- <div className="chat-footer opacity-50">Seen at 12:46</div> -->
  </div>
</template>
