<script lang="ts">
  // import type {ValueInfo} from "../models.ts";
  import { KiaraAPI } from "../lib/utils.ts";

  const apiClient = new KiaraAPI(
    import.meta.env.KIARA_SERVICE_ENDPOINT
  ).context("default");

  export let value = null;

  let rendered = null;

  $: handle_new_value(value);

  async function handle_new_value(value) {
    let value_id;
    if (typeof value === "string") {
      value_id = value;
    } else {
      value_id = value.value_id;
    }
    // this endpoint to help with pagination etc. comes from kiara_plugin.html
    //         rendered = await apiClient.render_value_info(value_id)
  }
</script>

<div class="value_metadata_panel">
  {#if rendered != null}
    {@html rendered.rendered}
  {:else}
    No value selected
  {/if}
</div>

<style>
  .value_metadata_panel {
    padding: 1em;
  }
  /* todo move the nice table styles to global*/
</style>
