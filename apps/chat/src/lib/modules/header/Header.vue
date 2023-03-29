<script setup lang="ts">
import UserPane from './UserPane.vue';
import JoinRoom from './JoinRoom.vue';
import CurrentRoom from './CurrentRoom.vue';
</script>

<template>
  <header
    class="border-b border-solid border-gray-200 h-16 w-full sticky top-0 left-0 flex items-center justify-between px-10"
  >
    <CurrentRoom />
    <JoinRoom />
    <UserPane />
  </header>
</template>
