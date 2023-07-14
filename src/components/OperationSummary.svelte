<script lang="ts">
  import Doc from "./Doc.svelte";
  import { FieldInfo } from "@lib/kiara_models";

  export let operation_id;
  export let operation;

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
    ["Inputs", summarise_inout_fields(operation.input_fields)],

    ["Outputs", summarise_inout_fields(operation.output_fields)],
  ];
</script>

<div class="px-4 pt-6 m:px-6 border-slate-100 dark:border-slate-700">
  <a
    class="text-base font-semibold leading-7 text-slate-900 dark:text-slate-100"
    href={`/plugins/${operation.context.labels.package}/operations/${operation_id}`}
    >{operation_id}</a
  >
  <Doc doc_object={operation.documentation} />
</div>
<dl class="divide-y divide-slate-100 dark:divide-slate-700">
  {#each details as [title, info]}
    <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
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
