<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../shared/shared.stores';
import { truncateWithEllipsis } from '@/lib/shared/shared.utils';
import { ChevronDown, Person, Exit } from '@/lib/shared/icons';

const store = useUserStore();
const { username, userId, avatarUrl } = storeToRefs(store);

const shortenedId = computed(() => truncateWithEllipsis(userId.value, 4));
</script>

<template>
  <div
    tabindex="0"
    class="dropdown flex items-center bg-gray-100 px-2 py-1 rounded cursor-pointer"
  >
    <div class="text-right mx-2">
      <p class="font-bold max-w-[100px] overflow-hidden overflow-ellipsis">
        {{ username }}
      </p>
      <p class="text-xs text-gray-400">{{ shortenedId }}</p>
    </div>

    <div class="flex items-center">
      <div class="avatar mr-2">
        <div class="w-10 rounded-full">
          <img :src="avatarUrl" alt="User avatar" />
        </div>
      </div>
      <ChevronDown />
    </div>

    <ul
      class="dropdown-content menu border w-48 border-solid bg-white border-gray-200 absolute -bottom-40 -left-10 rounded flex flex-col space-y-1"
      tabindex="0"
    >
      <li>
        <a href="" class="flex py-3 px-3 items-center gap-3"
          ><Person />Profile</a
        >
      </li>
      <li>
        <a href="" class="flex py-3 px-3 items-center gap-3"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            class="bi bi-person-plus"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            /></svg
          >Invite</a
        >
      </li>
      <li>
        <a href="" class="flex py-3 px-3 items-center gap-3"><Exit />Logout</a>
      </li>
    </ul>
  </div>
</template>
