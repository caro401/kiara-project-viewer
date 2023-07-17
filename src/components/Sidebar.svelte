<script>
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from "@rgossiaux/svelte-headlessui";
  import { ChevronRight } from "svelte-heros-v2";

  export let items, currentPath;
</script>

<div
  class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 h-screen"
>
  <a class="h-16 w-full text-center pt-4 font-bold text-lg" href="/">Lumy</a>
  <nav class="flex flex-1 flex-col">
    <ul class="-mx-2 space-y-1">
      {#each items as item}
        <li>
          {#if !item.children}
            <a
              href={item.href}
              class={`${
                item.href === currentPath
                  ? "bg-slate-50 dark:bg-slate-900"
                  : "hover:bg-slate-50 dark:hover:bg-slate-900"
              } block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-slate-700 dark:text-slate-300`}
              >{item.name}</a
            >
          {:else}
            <Disclosure let:open>
              <DisclosureButton
                class={`${
                  item.href === currentPath
                    ? "bg-slate-50 dark:bg-slate-900"
                    : "hover:bg-slate-50 dark:hover:bg-slate-900"
                } flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-slate-700 dark:text-slate-300`}
              >
                <ChevronRight
                  class={`${
                    open ? "rotate-90 text-slate-500" : "text-slate-400"
                  } h-5 w-5 shrink-0`}
                  aria-hidden="true"
                />
                {item.name}
              </DisclosureButton>
              <DisclosurePanel as="ul" class="mt-1 px-2">
                {#each item.children as subItem}
                  <li>
                    <DisclosureButton
                      as="a"
                      href={subItem.href}
                      class={`${
                        subItem.href === currentPath
                          ? "bg-slate-50 dark:bg-slate-900"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900"
                      } block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-slate-700 dark:text-slate-300 no-underline`}
                      >{subItem.name}</DisclosureButton
                    >
                  </li>
                {/each}
              </DisclosurePanel>
            </Disclosure>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style lang="postcss">
  a {
    @apply no-underline;
  }
</style>
