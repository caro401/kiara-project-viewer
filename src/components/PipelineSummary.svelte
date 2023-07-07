<script lang="ts">
  import Doc from "./Doc.svelte";
  import { FieldInfo } from "@lib/kiara_models";

  export let pipeline_id;
  export let pipeline;

  function flatten(array) {
    const newArray = [];
    for (const item of array) {
      if (Array.isArray(item)) {
        newArray.push(...item);
      } else {
        newArray.push(item);
      }
    }
    return newArray;
  }

  function summarise_inout_fields(fields: FieldInfo) {
    return Object.entries(fields)
      .map(([_, data]) => `${data.field_name} (${data.field_schema.type})`)
      .join(", ");
  }
  const details = [
    ["Inputs", summarise_inout_fields(pipeline.pipeline_input_fields)],
    [
      "Steps",
      flatten(pipeline.processing_stages).join(", ").replaceAll("_", " "),
    ],
    ["Outputs", summarise_inout_fields(pipeline.pipeline_output_fields)],
  ];
</script>

<div class="px-4 py-6 sm:px-6 border-b border-slate-100 dark:border-slate-700">
  <a
    class="text-base font-semibold leading-7 text-slate-900 dark:text-slate-100"
    href={`/${pipeline_id}`}>{pipeline_id}</a
  >
  <Doc doc_object={pipeline.pipeline_config.doc} />
</div>
<dl class="divide-y divide-slate-100 dark:divide-slate-700">
  {#each details as [title, info]}
    <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-slate-900 dark:text-slate-100">
        {title}
      </dt>
      <dd
        class="mt-1 text-sm leading-6 text-slate-800 dark:text-slate-200 sm:col-span-3 sm:mt-0"
      >
        {info}
      </dd>
    </div>{/each}
</dl>
