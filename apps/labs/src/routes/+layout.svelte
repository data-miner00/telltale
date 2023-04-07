<script lang="ts">
  import Navigator from '../lib/modules/navigator/navigator.svelte';
  import '../app.scss';
</script>

<svelte:head>
  <title>A laboratory to figure out chat layouts</title>
  <meta name="description" content="Chat Layout Sandbox App" />
</svelte:head>

<Navigator />

<slot />
