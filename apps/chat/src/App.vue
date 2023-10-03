<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { socket } from './lib/shared/shared.socket';
import { useUserStore } from './lib/shared/shared.stores';

const { setSocketId } = useUserStore();

onMounted(() => {
  socket.connect();
});

socket.on('connect', () => setSocketId(socket.id));
</script>

<template>
  <router-view></router-view>
</template>
