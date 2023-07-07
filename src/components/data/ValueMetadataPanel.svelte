<script lang="ts">
  import type { ValueInfo } from "@lib/kiara_models";
  import apiClient from "@lib/kiara_api";

  export let value: ValueInfo | string = null;

  let rendered = null;

  $: handle_new_value(value);

  async function handle_new_value(value: ValueInfo | string) {
    let value_id: string;
    if (typeof value === "string") {
      value_id = value;
    } else {
      value_id = value.value_id;
    }
    try {
      // this endpoint to help with pagination etc. comes from kiara_plugin.html
      rendered = await apiClient.render_value_info(value_id);
    } catch {
      console.error("can't render that value, did you remember to import it?");
    }
  }
</script>

<div class="value_metadata_panel">
  {#if rendered != null}
    {@html rendered}
  {:else}
    <p>No value selected</p>
  {/if}
</div>

<style lang="postcss">
  .value_metadata_panel {
    @apply py-4 w-full;
  }
</style>
