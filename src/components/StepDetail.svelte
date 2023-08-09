<script lang="ts">
  import Doc from "./Doc.svelte";
  import ConcreteModuleConfig from "@components/ConcreteModuleConfig.svelte";
  export let step_id; // unique identifier in the pipeline for this step
  export let pipeline;
  const step_details = pipeline.step_details[step_id];
  const step = pipeline.pipeline_config.steps.filter(
    (x) => x.step_id == step_id
  )[0];
</script>

<h3>{step_id.replaceAll("_", " ")}</h3>
<!--TODO how do you know where a module comes from-->
<!--TODO does this thing use a module or an operation? -->
<!--TODO handle pipelines?!-->
<p>
  Uses the <a href={`/plugins/TODO/modules/${step.module_type}`}
    >{step.module_type}</a
  > module
</p>
<!-- TODO is this the right thing see kiara logic.xor -->
<Doc doc_object={step_details.doc} />
