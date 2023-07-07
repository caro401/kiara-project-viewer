<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import type { FieldInfo, PipelineStructureInfo } from "@lib/kiara_models";
  import ValueInputsPanel from "@components/inputs/ValueInputsPanel.svelte";

  export let pipeline_structure: PipelineStructureInfo;
  export let pipeline_stage_idx: number;

  let stage_info;
  let stage_inputs: Record<string, FieldInfo> = {};
  let stage_outputs: Record<string, FieldInfo> = {};
  $: set_stage(pipeline_structure, pipeline_stage_idx);

  function set_stage(structure, stage_idx: number) {
    stage_info = pipeline_structure.processing_stages[pipeline_stage_idx];
    stage_inputs = Object.fromEntries(
      stage_info.pipeline_inputs.map((field_name) => [
        field_name,
        pipeline_structure.pipeline_input_fields[field_name],
      ])
    );
    stage_outputs = Object.fromEntries(
      stage_info.pipeline_outputs.map((field_name) => [
        field_name,
        pipeline_structure.pipeline_output_fields[field_name],
      ])
    );
  }
</script>

{#if Object.keys(stage_inputs).length > 0}
  <section>
    <div class="pipeline_stage">
      <h3>Stage: {pipeline_stage_idx}</h3>
      <ValueInputsPanel fields_info={stage_inputs} />
    </div>
  </section>
{/if}

<style>
  section {
    background-color: var(--tertiary-color);
    border-radius: 1em;
    padding: 1em;
    margin: 1em;
  }
</style>
