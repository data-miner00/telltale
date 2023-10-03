<script setup lang="ts">
import { useRoute } from 'vue-router';
import Sidebar from '../sidebar/Sidebar.vue';
import Header from '../header/Header.vue';

const route = useRoute();
</script>

<template>
  <div class="flex flex-1">
    <aside class="z-20 md:w-72 shrink-0 md:fixed top-0 left-0">
      <Sidebar />
    </aside>

    <section class="w-full md:pl-72 min-h-[calc(100vh-80px)]">
      <Header />
      <router-view :key="(route.params.id as string)"></router-view>
    </section>
  </div>
</template>
