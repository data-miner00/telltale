<!-- Bootstrap Icon: https://icons.getbootstrap.com/icons/chevron-down/ -->
<!-- Bootstrap Icon: https://icons.getbootstrap.com/icons/caret-down-fill/ -->
<script setup lang="ts">
defineProps({
  class: String,
  type: {
    type: String,
    default: 'caret',
  },
});
</script>

<template>
  <svg
    v-if="type == 'chevron'"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    :class="class"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    :class="class"
    viewBox="0 0 16 16"
  >
    <path
      d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
    />
  </svg>
</template>
