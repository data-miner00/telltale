<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="flex rounded py-1 px-2">
    <div></div>
    <div>
      <div class="font-bold text-xl tracking-wider">{{ route.params.id }}</div>
      <div class="text-xs text-gray-500">Room Id: abvsuzubsayf</div>
    </div>
  </div>
</template>
