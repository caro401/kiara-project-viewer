<script>
  export let item, plugin;
</script>

<dl>
  <dt>Author(s)</dt>
  <dd>
    {#each item.authors.authors as author}
      <span data-pagefind-filter="author">
        {author.name} ({author.email})
      </span>
    {/each}
  </dd>
  <dt>From package</dt>
  <dd>
    <a href={`/plugins/${plugin}`} data-pagefind-filter="plugin">{plugin}</a>
  </dd>
  {#if item.context?.tags?.length}
    <dt>Tags</dt>
    <dd>
      {#each item.context.tags as tag}
        <span data-pagefind-filter="tags">
          {tag}
        </span>
      {/each}
    </dd>
  {/if}
  {#if item.operation_types?.length}
    <dt>Operation type</dt>
    <dd data-pagefind-filter="operation type">
      {item.operation_types.join(", ")}
    </dd>{/if}
  {#if item.python_class}
    <dt>Python class</dt>
    <dd>
      <code>{item.python_class.full_name}</code>
    </dd>
  {/if}
</dl>

<style lang="postcss">
  span {
    @apply pr-1;
  }
</style>
