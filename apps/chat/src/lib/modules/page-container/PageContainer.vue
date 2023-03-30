<script setup lang="ts">
import Sidebar from '../sidebar/Sidebar.vue';
import Header from '../header/Header.vue';
</script>

<template>
  <div class="flex flex-1">
    <aside class="z-20 md:w-72 shrink-0 md:fixed top-0 left-0">
      <Sidebar />
    </aside>

    <section class="w-full md:pl-72 h-[calc(100vh-64px)]">
      <Header />
      <slot />
    </section>
  </div>
</template>
