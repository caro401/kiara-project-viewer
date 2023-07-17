<script lang="ts">
  import StepDetail from "./StepDetail.svelte";
  import Doc from "./Doc.svelte";
  import Inputs from "./Inputs.svelte";
  import ValueMetadataPanel from "@components/data/ValueMetadataPanel.svelte";

  export let pipeline, all_data_types;
</script>

<Doc doc_object={pipeline.pipeline_config.doc} />

<h2>Inputs</h2>
<Inputs fields={pipeline.pipeline_input_fields} {all_data_types} />
<!--    todo list example input files from some custom metadata property -->

<h2>Steps</h2>
{#each pipeline.processing_stages as stage}
  {#each stage as step_id}
    <StepDetail {step_id} {pipeline} />
  {/each}
{/each}

<h2>Outputs</h2>
<Inputs fields={pipeline.pipeline_output_fields} {all_data_types} />
