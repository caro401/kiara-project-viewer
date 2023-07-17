<script lang="ts">
  import { FieldInfo } from "@lib/kiara_models";

  export let config_values: { [k: string]: FieldInfo };
  export let all_data_types;

  function href_for_type(type) {
    const field_type = all_data_types[type];
    return `/plugins/${
      field_type?.context.labels.package || "kiara"
    }/data_types/${type}`;
  }
  const data = Object.entries(config_values)
    // flatten object, include name and link to data_type
    .map(([k, v]) => {
      return {
        ...v,
        name: k,
        data_type_href: href_for_type(v.type),
      };
    })
    // sort alphabetically within things of same value of optional
    .sort((a, b) => a.name.localeCompare(b.name))
    // put non-optional things first
    .sort((a, b) => (a.optional !== b.optional ? (a.optional ? 1 : -1) : 0));
</script>

<table class="table-auto z-0">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Type</th>
      <th scope="col">Required?</th>
      <th scope="col">Default</th>
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        <td>{row.name}</td>
        <td>{row.description}</td>
        <td><a href={row.data_type_href}>{row.type}</a></td>
        <td>{row.required}</td>
        <td class="whitespace-nowrap"
          ><code>{JSON.stringify(row.value_default)}</code></td
        >
      </tr>
    {/each}
  </tbody>
</table>
