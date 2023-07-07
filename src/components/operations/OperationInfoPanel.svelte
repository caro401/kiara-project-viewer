<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { OperationInfo } from "@lib/kiara_models";
  import apiClient from "@lib/kiara_api";

  export let operation_id = null;

  let current_operation: OperationInfo = null;

  $: operation_changed(operation_id);

  async function operation_changed(operation) {
    if (operation == null) {
      current_operation = null;
      return;
    }
    current_operation = await apiClient.get_operation(operation_id);
  }

  // async function handleClear(event) {
  //     dispatch('operation_changed', null);
  // }
</script>

<div class="operation-info">
  {#if current_operation != null}
    <div>
      <SvelteMarkdown source={current_operation.documentation.description} />
    </div>
    {#if current_operation.documentation.doc != null}
      <div>
        <SvelteMarkdown source={current_operation.documentation.doc} />
      </div>
    {/if}
  {:else}
    No operation selected
  {/if}
</div>

<style>
</style>
