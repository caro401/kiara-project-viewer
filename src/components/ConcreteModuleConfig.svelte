<script lang="ts">
  export let config;

  const data = Object.entries(config)
    // sort alphabetically within things of same value of optional
    .sort(([ka, va], [kb, vb]) => ka.localeCompare(kb));
</script>

<dl class="overflow-x-auto">
  {#each data as [k, v]}
    <dd>{k}</dd>

    <dt><code >{JSON.stringify(v)}</code></dt>
  {/each}
</dl>
