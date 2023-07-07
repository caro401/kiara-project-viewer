<script lang="ts">
  import type { RenderScene } from "@lib/kiara_models";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let related_scenes: Record<string, RenderScene> = null;

  function handleClick(scene_config) {
    dispatch("render_request", scene_config);
  }
</script>

<section>
  {#if related_scenes != null}
    <div class="control-row">
      {#each Object.entries(related_scenes) as [name, scene]}
        <button
          class="control-button"
          on:click={() => handleClick(scene)}
          disabled={scene == null || scene.disabled}
        >
          {name}
        </button>
      {/each}
    </div>

    <div class="control-row">
      {#each Object.entries(related_scenes) as [name, scene]}
        {#if scene != null}
          {#each Object.entries(scene.related_scenes) as [sub_name, sub_scene]}
            <button
              class="control-button"
              on:click={() => handleClick(sub_scene)}
              disabled={sub_scene == null || sub_scene.disabled}
            >
              {sub_name}
            </button>
          {/each}
        {/if}
      {/each}
    </div>
  {/if}
</section>

<style>
  .control-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 4px;
  }
</style>
