<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import type { Item } from '$lib/server/db/schema';
	import SidebarNewFolderButton from './SidebarNewFolderButton.svelte';
	import SidebarNewNoteButton from './SidebarNewNoteButton.svelte';
	import SidebarSearchButton from './SidebarSearchButton.svelte';
	import SidebarSortButton from './SidebarSortButton.svelte';
	import TreeView from './TreeView.svelte';

	export let items: Item[];
	let sheetOpen = false;

	afterNavigate(() => {
		sheetOpen = false;
	});
</script>

<aside class="w-72 bg-popover border-r border-r-[#313131] h-full fixed inset-0 hidden md:block">
	<div class="w-full p-4 h-full flex flex-col overflow-y-scroll">
		<div class="flex items-center justify-between">
			<a href="/" class="font-semibold text-xl text-white">Vault</a>
			<div class="flex items-center text-popover-foreground">
				<SidebarSearchButton />
				<SidebarNewNoteButton />
				<SidebarNewFolderButton />
				<SidebarSortButton />
			</div>
		</div>
		<div class="flex flex-col mt-4">
			{#each items as item}
				{#key item.id}
					<TreeView isRoot {item} />
				{/key}
			{/each}
		</div>
	</div>
</aside>

<header class="md:hidden fixed top-0 left-0 w-screen h-10 px-4 flex items-center bg-popover">
	<Button
		on:click={() => {
			sheetOpen = true;
		}}
		variant="ghost"
		size="sm"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-menu"
			><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line
				x1="4"
				x2="20"
				y1="18"
				y2="18"
			/></svg
		></Button
	>
</header>

<Sheet.Root bind:open={sheetOpen}>
	<Sheet.Content class="h-[80vh] py-6 px-0 md:hidden" side="bottom">
		<div class="w-full h-full flex flex-col overflow-y-scroll px-2.5">
			<div class="flex items-center justify-between">
				<a href="/" class="font-semibold text-xl text-white">Vault</a>
				<div class="flex items-center text-popover-foreground gap-2">
					<SidebarNewNoteButton />
					<SidebarNewFolderButton />
				</div>
			</div>
			<div class="flex flex-col mt-4">
				{#each items as item}
					{#key item.id}
						<TreeView isRoot {item} />
					{/key}
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
