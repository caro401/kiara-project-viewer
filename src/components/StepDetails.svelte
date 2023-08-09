<script>
  import StepDetail from "@components/StepDetail.svelte";

  export let pipeline;
</script>

{#each pipeline.processing_stages as stage}
  {#each stage as step_id}
    <StepDetail {step_id} {pipeline} />
  {/each}
{/each}
