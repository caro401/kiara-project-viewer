<script>
  import Doc from "./Doc.svelte";

  export let step_id; // unique identifier in the pipeline for this step
  export let pipeline;
  const step_details = pipeline.step_details[step_id];
</script>

<h3>{step_id.replaceAll("_", " ")}</h3>
<Doc doc_object={step_details.doc} />
