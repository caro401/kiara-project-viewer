<script>
  import { onMount } from "svelte";
  onMount(() => {
    new window.PagefindUI({ element: "#search" });
  });
</script>

<div id="search" />
