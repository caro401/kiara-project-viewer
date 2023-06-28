<script>
  export let doc_object;
  import { marked } from "marked";
  marked.use({
  mangle: false,
  headerIds: false,
  gfm: false,
})
</script>

<p>{doc_object.description}</p>
{#if doc_object.doc}
  <!--TODO sanitize this markdown! -->
  <p>{@html marked.parse(doc_object.doc)}</p>
{/if}
