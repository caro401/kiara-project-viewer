<script lang="ts">
  export let doc_object;
  import sanitizeHtml from "sanitize-html";
  import { marked } from "marked";
  marked.use({
    mangle: false,
    headerIds: false,
    gfm: false,
  });
</script>

<p>{doc_object.description}</p>
{#if doc_object.doc}
  <p>{@html sanitizeHtml(marked.parse(doc_object.doc))}</p>
{/if}
