<script>
  import { Bars3, MagnifyingGlass } from "svelte-heros-v2";
  import {
    Dialog,
    TransitionChild,
    TransitionRoot,
  } from "@rgossiaux/svelte-headlessui";
  import { XMark } from "svelte-heros-v2";
  import Sidebar from "@components/Sidebar.svelte";
  let sidebarOpen = false;
  export let items, currentPath;
  const segments = currentPath.split("/").filter((s) => s.length > 0);
</script>

<TransitionRoot show={sidebarOpen}>
  <Dialog
    as="div"
    class="relative z-50 lg:hidden"
    on:close={() => (sidebarOpen = false)}
  >
    <!--    The dark background when the mobile nav is open-->
    <TransitionChild
      enter="transition-opacity ease-linear duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-slate-900/80" />
    </TransitionChild>
    <!--The mobile sidebar-->
    <div class="fixed inset-0 flex">
      <div class="relative mr-16 flex w-full max-w-xs flex-1">
        <button
          type="button"
          class="-m-2.5 p-2.5 absolute left-full top-0 flex w-16 justify-center pt-5"
          on:click={() => (sidebarOpen = false)}
        >
          <span class="sr-only">Close sidebar</span>
          <XMark class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
        <Sidebar {items} {currentPath} />
      </div>
    </div>
  </Dialog>
</TransitionRoot>
<!--The desktop sidebar-->
<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
  <Sidebar {items} {currentPath} />
</div>

<!-- The top nav-->
<div
  class="sticky top-0 z-40 flex items-center gap-x-6 bg-white dark:bg-slate-800 px-4 py-4 shadow-sm sm:px-6"
>
  <button
    type="button"
    class="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden"
    on:click={() => (sidebarOpen = true)}
  >
    <span class="sr-only">Open sidebar</span>
    <Bars3 class="h-6 w-6" aria-hidden="true" />
  </button>
  <nav class="flex lg:ml-72 flex-grow" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li>
        <div>
          <a href="/" class="text-slate-400 hover:text-sky-500">
            <svg
              class="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      {#each segments as segment, idx}
        <li>
          <div class="flex items-center">
            <svg
              class="h-5 w-5 flex-shrink-0 text-slate-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              href="/{segments.slice(0, idx + 1).join('/')}"
              class="ml-2 text-sm font-medium text-slate-700 hover:text-sky-500 dark:text-slate-300 no-underline"
              >{segment}</a
            >
          </div>
        </li>
      {/each}
    </ol>
  </nav>
  <a
    href="/search"
    class="ml-2 inline-flex items-center text-sm font-medium text-slate-700 hover:text-sky-500 dark:text-slate-300 no-underline"
  >
    <MagnifyingGlass class="h-5 inline" />
    <span>Search</span>
  </a>
</div>
