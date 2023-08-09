import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import remarkToc from 'remark-toc';
import mdx from "@astrojs/mdx";
import admonitions from './admonitions'
import remarkDirective from 'remark-directive'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind({
    applyBaseStyles: false
  }), mdx()],
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkToc, remarkDirective,  admonitions]
  }
});