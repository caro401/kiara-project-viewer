<script lang="ts">
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";
  import ValueInfoPanel from "./ValueInfoPanel.svelte";

  export let values: Record<string, string> = {};

  $: console.log("RESULTS", values);
</script>

<section>
  <div class="values-tab">
    <h2>Result(s):</h2>
    {#if values}
      <TabGroup>
        <TabList>
          {#each Object.entries(values) as [value_name, value_id]}
            <Tab
              class={({ selected }) =>
                selected ? "value-tab-selected" : "value-tab-unselected"}
              >{value_name}</Tab
            >
          {/each}
        </TabList>
        <TabPanels>
          {#each Object.entries(values) as [value_name, value_id]}
            <TabPanel>
              <div class="value-info">
                <ValueInfoPanel value={value_id} />
              </div>
            </TabPanel>
          {/each}
        </TabPanels>
      </TabGroup>
    {/if}
  </div>
</section>
