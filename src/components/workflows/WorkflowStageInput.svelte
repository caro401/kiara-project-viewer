<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  import ValueInputsPanel from "../inputs/ValueInputsPanel.svelte";
  import type { OperationInfo, FieldInfo } from "@lib/kiara_models";
  import OperationSelect from "@components/operations/OperationSelect.svelte";
  import apiClient from "@lib/kiara_api";

  export let display_operation_select = false;
  // export let workflow_id: string;
  // export let workflow_stage: number;

  let workflow = null;
  let fields_info, operation, operation_id;

  async function set_workflow_stage(_workflow_id, _workflow_stage) {
    if (_workflow_id == null) {
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
