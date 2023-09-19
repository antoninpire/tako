<script lang="ts">
	import type { Item } from '$lib/server/db/schema';
	import SidebarNewFolderButton from './SidebarNewFolderButton.svelte';
	import SidebarNewNoteButton from './SidebarNewNoteButton.svelte';
	import SidebarSearchButton from './SidebarSearchButton.svelte';
	import SidebarSortButton from './SidebarSortButton.svelte';
	import TreeView from './TreeView.svelte';

	export let items: Item[];

	// let loading = false;

	// async function seed() {
	// 	loading = true;
	// 	await fetch('/api/seed', {
	// 		method: 'POST'
	// 	});
	// 	loading = false;
	// }
</script>

<aside class="w-72 bg-popover border-r border-r-[#313131] h-full fixed inset-0">
	<!-- <button disabled={loading} on:click={seed}>Seed</button> -->
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
				<TreeView isRoot {item} />
			{/each}
		</div>
	</div>
</aside>
