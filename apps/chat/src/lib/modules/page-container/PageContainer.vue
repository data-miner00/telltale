<script setup lang="ts">
import Sidebar from '../sidebar/Sidebar.vue';
</script>

<template>
  <div class="flex flex-1">
    <aside class="z-20 md:w-72">
      <Sidebar />
    </aside>

    <section class="w-full">
      <slot />
    </section>
  </div>
</template>
