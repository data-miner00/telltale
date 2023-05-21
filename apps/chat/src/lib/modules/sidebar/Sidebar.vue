<script lang="ts" setup>
import {
  VDustbin,
  VSlickPerson,
  VMoon,
  VExternal,
  VSlickExit,
} from '@/lib/shared/icons';

const items = [
  'Fixing Mandelbrot Rendering',
  'The Tulpa Effect',
  'Svelte Shenanigans',
  'This is a very long chat subject that is truncated at the end',
];
</script>

<template>
  <div class="w-full bg-slate-800 flex h-screen flex-1 flex-col space-y-1 p-2">
    <div
      class="py-5 text-white uppercase font-extrabold tracking-widest text-xl text-center"
    >
      Telltale
    </div>
    <button
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
    >
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      New chat
    </button>

    <div class="flex-col flex-1 overflow-y-auto border-b border-white/20">
      <div class="flex flex-col gap-2 text-gray-100 text-sm">
        <button
          v-for="item in items"
          :key="item"
          class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-slate-700 cursor-pointer break-all hover:pr-4 group"
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
          <div
            class="flex-1 text-left text-ellipsis max-h-5 overflow-hidden break-all relative"
          >
            {{ item }}
            <div
              class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-slate-800 group-hover:from-slate-700"
            />
          </div>
        </button>
      </div>
    </div>

    <button
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
    >
      <VDustbin />
      Clear conversations
    </button>
    <button
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
    >
      <span class="flex w-full flex-row justify-between"
        ><span class="gold-new-button flex items-center gap-3"
          ><VSlickPerson /> Upgrade to Plus</span
        ><span
          class="rounded-md bg-yellow-200 py-0.5 px-1.5 text-xs font-medium uppercase text-gray-800"
          >NEW</span
        ></span
      >
    </button>
    <button
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
    >
      <VMoon />
      Dark mode
    </button>
    <a
      href="https://help.openai.com/en/collections/3742473-chatgpt"
      target="_blank"
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
      ><VExternal /> Updates &amp; FAQ</a
    >
    <button
      class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
    >
      <VSlickExit />
      Log out
    </button>
  </div>
</template>
