<script lang="ts">
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";
  import RenderedValuePanel from "./RenderedValuePanel.svelte";
  import ValueViewControls from "./ValueViewControls.svelte";
  import type { RenderValueResult, ValueInfo } from "@lib/kiara_models";
  import apiClient from "@lib/kiara_api";
  import { InternalServiceError } from "@lib/utils";
  import ValueMetadataPanel from "./ValueMetadataPanel.svelte";
  import ValueLineagePanel from "./ValueLineagePanel.svelte";

  export let value: ValueInfo | string = null;
  let current_value: ValueInfo | string = null;
  let render_result: RenderValueResult = null;
  let render_error: InternalServiceError = null;
  let no_related_scenes = false;

  async function handle_new_value(sel: ValueInfo | string) {
    console.log("HANDLE NEW VALUE", sel);

    if (sel == null) {
      current_value = null;
      render_result = null;
      render_error = null;
      return;
    }

    let value_id: string;

    if (typeof sel === "string") {
      value_id = sel;
    } else {
      value_id = sel.value_id;
    }

    if (sel == null) {
      if (current_value == null) {
        return;
      } else {
        current_value = sel;
        render_result = null;
      }
    } else {
      let current_value_id: string;
      if (current_value == null) {
        current_value_id = null;
      } else if (typeof current_value === "string") {
        current_value_id = current_value;
      } else {
        current_value_id = current_value.value_id;
      }
      if (current_value_id != null && current_value_id == value_id) {
        return;
      }
      current_value = sel;
      render_value(value_id, {});
    }
  }

  $: handle_new_value(value);

  async function render_value(
    value_id: string,
    render_config: Record<string, any>
  ) {
    if (current_value == null) {
      no_related_scenes = true;
      render_result = null;
    } else {
      try {
        const new_render_result = await apiClient.render_value(
          value_id,
          render_config
        );
        render_error = null;
        if (new_render_result.related_scenes) {
          for (const key in new_render_result.related_scenes) {
            let _value = new_render_result.related_scenes[key];
            if (_value != null) {
              if (!_value.disabled) {
                no_related_scenes = false;
                render_result = new_render_result;
                return;
              }
            }
          }
        }
        // no related scenes
        no_related_scenes = true;
        render_result = new_render_result;
      } catch (e) {
        console.log("ERROR", e.msg);
        render_result = null;
        no_related_scenes = true;
        render_error = e;
      }
    }
  }

  async function handle_render_request(render_request_event) {
    let value_id: string;
    if (typeof current_value === "string") {
      value_id = current_value;
    } else {
      value_id = current_value.value_id;
    }
    await render_value(value_id, render_request_event.detail.render_config);
  }
</script>

<div class="value-info-panel">
  <TabGroup>
    <TabList>
      <Tab
        class={({ selected }) =>
          selected ? "value-info-tab-selected" : "value-info-tab-unselected"}
        >Data</Tab
      >
      <Tab
        class={({ selected }) =>
          selected ? "value-info-tab-selected" : "value-info-tab-unselected"}
        >Metadata</Tab
      >
      <Tab
        class={({ selected }) =>
          selected ? "value-info-tab-selected" : "value-info-tab-unselected"}
        >Lineage</Tab
      >
    </TabList>
    <TabPanels>
      <TabPanel>
        {#if render_error != null}
          <div class="no-value-panel">
            <RenderedValuePanel rendered_value={render_error.msg} />
          </div>
        {:else}
          {#if no_related_scenes}
            <div class="preview-control" />
          {:else}
            <div class="preview-control">
              {#if render_result != null}
                <ValueViewControls
                  related_scenes={render_result.related_scenes}
                  on:render_request={handle_render_request}
                />
              {/if}
            </div>
          {/if}
          <div class="preview-wrap">
            {#if render_result == null}
              <RenderedValuePanel rendered_value={null} />
            {:else}
              <RenderedValuePanel rendered_value={render_result.rendered} />
            {/if}
          </div>
        {/if}
      </TabPanel>
      <TabPanel>
        <ValueMetadataPanel value={current_value} />
      </TabPanel>
      <TabPanel>
        <ValueLineagePanel value={current_value} />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</div>

<style>
  :global(.value-info-tab-selected) {
    background-color: var(--secondary-color);
    border-radius: 0.4rem;
    font-size: 1.1em;
    padding: 0.2rem 1rem;
    border: none;
    /*color: rgb(255 255 255);*/
  }

  :global(.value-info-tab-unselected) {
    background-color: var(--white);
    font-size: 1.1em;
    padding: 0.2rem 1rem;
    border: none;
    cursor: pointer;
  }

  .value-info-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .preview-control {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
