<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navigator from './components/Navigator.vue';
import { socket } from './lib/shared/shared.socket';
import { useUserStore } from './lib/shared/shared.stores';
import PageContainer from './lib/modules/page-container/PageContainer.vue';

const { setUserId } = useUserStore();

onMounted(() => {
  socket.connect();
});

socket.on('connect', () => setUserId(socket.id));
</script>

<template>
  <PageContainer>
    <router-view></router-view>
    <Navigator />
  </PageContainer>
</template>
