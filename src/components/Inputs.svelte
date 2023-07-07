<script lang="ts">
  export let fields;

  const data = Object.entries(fields)
    // flatten object, include name
    .map(([k, v]) => ({ ...v.field_schema, name: k }))
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
        <td>{row.type}</td>
        <td>{row.optional}</td>
        <td class="whitespace-nowrap">{row.default}</td>
      </tr>
    {/each}
  </tbody>
</table>
