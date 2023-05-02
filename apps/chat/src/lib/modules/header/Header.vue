<script setup lang="ts">
import UserPane from './UserPane.vue';
import CurrentRoom from './CurrentRoom.vue';

import { RANDOM_IMG_URL } from '@/lib/shared/shared.constants';
</script>

<template>
  <header
    class="border-b border-solid border-gray-200 h-20 w-full sticky top-0 left-0 flex items-center justify-between px-10 z-20 bg-white"
  >
    <CurrentRoom
      room-name="Le Meridien Amber Cove 🦄"
      id="1f6a0841-136d-46e8-980d-13deb84557a5"
      description="Lorem ipsum dolor sit amiet"
      type="public"
      :members-count="28"
      :online-count="5"
      :group-img-url="RANDOM_IMG_URL"
    />
    <UserPane />
  </header>
</template>
