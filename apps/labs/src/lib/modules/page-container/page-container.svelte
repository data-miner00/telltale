<script lang="ts">
  import Sidebar from '$lib/modules/sidebar/sidebar.svelte';
</script>

<main class="flex flex-1">
  <aside class="z-20 md:w-72">
    <Sidebar />
  </aside>

  <section class="w-full">
    <slot name="page-content" />
  </section>
</main>
