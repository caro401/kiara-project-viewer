<script lang="ts">
  import StepDetail from "./StepDetail.svelte";
  import Doc from "./Doc.svelte";
  import Inputs from "./Inputs.svelte";
  import ValueMetadataPanel from "@components/data/ValueMetadataPanel.svelte";
  import StepDetails from "@components/StepDetails.svelte";

  export let pipeline, all_data_types;
</script>

<Doc doc_object={pipeline.pipeline_config.doc} />

<h2>Inputs</h2>
<Inputs fields={pipeline.pipeline_input_fields} {all_data_types} />
<!--    todo list example input files from some custom metadata property -->

<h2>Steps</h2>
<StepDetails {pipeline} />

<h2>Outputs</h2>
<Inputs fields={pipeline.pipeline_output_fields} {all_data_types} />
<pre>{JSON.stringify(pipeline, null, 2)}</pre>
