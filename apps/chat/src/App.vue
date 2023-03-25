<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navigator from './components/Navigator.vue';
import { socket } from './socket';
import { useUserStore } from './stores';

const { setUserId } = useUserStore();

onMounted(() => {
  socket.connect();
});

socket.on('connect', () => setUserId(socket.id));
</script>

<template>
  <router-view></router-view>
  <Navigator />
</template>
