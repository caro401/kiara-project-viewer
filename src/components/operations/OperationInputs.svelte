<script lang="ts">
  import OperationSelect from "./OperationSelect.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  import ValueInputsPanel from "../inputs/ValueInputsPanel.svelte";
  import type { OperationInfo, FieldInfo } from "@lib/kiara_models";
  import apiClient from "@lib/kiara_api";

  export let display_operation_select = false;
  export let operation_id: string;
  let fields_info: Record<string, FieldInfo>;

  if (operation_id != null) {
    set_operation(operation_id);
  }

  $: set_operation(operation_id);

  let operation: OperationInfo;

  async function set_operation(operation_id) {
    if (operation_id == null) {
      operation = null;
      return;
    }

    operation = await apiClient.get_operation(operation_id);
    fields_info = operation.input_fields;
  }

  async function forward_event(event) {
    console.log("FORWARD", event.type);
    dispatch(event.type, event.detail);
  }

  async function handle_new_operation(event) {
    operation_id = event.detail;
    dispatch("operation_changed", operation_id);
  }
</script>

<section>
  {#if display_operation_select}
    <div class="item">
      <OperationSelect on:operation_changed={handle_new_operation} />
    </div>
  {/if}
  <div class="item">
    <ValueInputsPanel
      {fields_info}
      on:input_updated={forward_event}
      on:inputs_updated={forward_event}
    />
  </div>
</section>

<style>
  /*section {*/
  /*    display: grid;*/
  /*    padding: 8px;*/
  /*    grid-template-columns: 100%;*/
  /*    grid-template-rows: auto 1fr;*/
  /*    gap: 1rem;*/
  /*}*/

  /*.item {*/
  /*    height: 100%;*/
  /*}*/
</style>
