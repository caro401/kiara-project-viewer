<script lang="ts">
  import StepDetail from "./StepDetail.svelte";
  import Doc from "./Doc.svelte";
  import Inputs from "./Inputs.svelte";
  import ValueMetadataPanel from "./ValueMetadataPanel.svelte";

  export let pipeline;
</script>

<main>
  <section class="prose prose-slate dark:prose-invert max-w-screen-md">
    <h1 class="mt-2 pb-4">{pipeline.pipeline_config.pipeline_name}</h1>
    <Doc doc_object={pipeline.pipeline_config.doc} />
  </section>
  <section>
    <h2>Inputs</h2>
    <Inputs fields={pipeline.pipeline_input_fields} />

<!--    todo list example input files from some custom metadata property -->
    <ValueMetadataPanel value="import.table" />

  </section>
  <section class="prose prose-slate dark:prose-invert max-w-screen-md">
    <h2>Steps</h2>
    {#each pipeline.processing_stages as stage}
      {#each stage as step_id}
        <StepDetail {step_id} {pipeline} />
      {/each}
    {/each}
  </section>
  <section>
    <h2>Outputs</h2>
    <Inputs fields={pipeline.pipeline_output_fields} />
  </section>
</main>

<style lang="postcss">
  main {
    @apply max-w-screen-md mx-auto px-4 py-2;
  }
  section {
    @apply py-8;
  }
</style>
