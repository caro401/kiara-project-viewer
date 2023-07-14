<script lang="ts">
  import { FieldInfo } from "@lib/kiara_models";

  export let fields: { [k: string]: FieldInfo };
  export let all_data_types;

  function href_for_line(name) {
    const field_type =
      all_data_types[fields[name].data_type_info.data_type_name];
    return `/plugins/${field_type.context.labels.package}/data_types/${field_type.type_name}`;
  }

  const data = Object.entries(fields)
    // flatten object, include name and link to data_type
    .map(([k, v]) => ({
      ...v.field_schema,
      name: k,
      data_type_href: href_for_line(k),
    }))
    // sort alphabetically within things of same value of optional
    .sort((a, b) => a.name.localeCompare(b.name))
    // put non-optional things first
    .sort((a, b) => (a.optional !== b.optional ? (a.optional ? 1 : -1) : 0));
</script>

<table class="table-auto">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Type</th>
      <th scope="col">Optional?</th>
      <th scope="col">Default</th>
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        <td>{row.name}</td>
        <td>{row.doc.description}</td>
        <td><a href={row.data_type_href}>{row.type}</a></td>
        <td>{row.optional}</td>
        <td class="whitespace-nowrap">{row.default}</td>
      </tr>
    {/each}
  </tbody>
</table>
