<script lang="ts">
	import { enhance } from '$app/forms';
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import DeleteItemAlertDialog from '$lib/components/DeleteItemAlertDialog.svelte';
	import RenameItemDialog from '$lib/components/RenameItemDialog.svelte';
	import SearchCommand from '$lib/components/SearchCommand.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import type { Item } from '$lib/server/db/schema';
	import { sortOrder } from '$lib/stores/sort';
	import { onMount } from 'svelte';
	import { searchDialogOpen } from '../../lib/stores/search';
	import SidebarNewFolderButton from './SidebarNewFolderButton.svelte';
	import SidebarNewNoteButton from './SidebarNewNoteButton.svelte';
	import SidebarSearchButton from './SidebarSearchButton.svelte';
	import SidebarSortButton from './SidebarSortButton.svelte';
	import TreeView from './TreeView.svelte';

	export let items: Item[];
	let sheetOpen = false;

	afterNavigate(() => {
		sheetOpen = false;
		searchDialogOpen.set(false);
	});

	onMount(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if ((event.ctrlKey || event.metaKey) && event.key === 'j') {
				event.preventDefault();
				const button = document.getElementById('create-new-note-form-submit');
				if (button) (button as HTMLButtonElement).click();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	$: sortedItems = items.sort((a, b) => {
		if (a.type === 'folder' && b.type === 'file') return -1;
		if (a.type === 'file' && b.type === 'folder') return 1;
		if ($sortOrder === 'name_desc') return b.name.localeCompare(a.name);
		else if ($sortOrder === 'created_at_asc') return a.createdAt.getTime() - b.createdAt.getTime();
		else if ($sortOrder === 'created_at_desc') return b.createdAt.getTime() - a.createdAt.getTime();
		else if ($sortOrder === 'updated_at_asc') return a.updatedAt.getTime() - b.updatedAt.getTime();
		else if ($sortOrder === 'updated_at_desc') return b.updatedAt.getTime() - a.updatedAt.getTime();
		return a.name.localeCompare(b.name);
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
			{#each sortedItems as item}
				{#key item.id}
					<TreeView isRoot {item} />
				{/key}
			{/each}
		</div>
	</div>
</aside>

<header
	class="md:hidden fixed top-0 left-0 w-screen h-12 px-4 flex items-center bg-popover justify-between"
>
	<Button
		on:click={() => {
			sheetOpen = true;
		}}
		variant="ghost"
		size="sm"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
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
		>
	</Button>
	<div class="flex items-center gap-1">
		<Button
			variant="ghost"
			size="sm"
			on:click={() => {
				invalidateAll();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-rotate-cw"
				><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg
			>
		</Button>

		<Button
			variant="ghost"
			size="sm"
			on:click={() => {
				searchDialogOpen.set(true);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-search"
				><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
			>
		</Button>
	</div>
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
				{#each sortedItems as item}
					{#key item.id}
						<TreeView isRoot {item} />
					{/key}
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>

<SearchCommand {items} />
<DeleteItemAlertDialog />
<RenameItemDialog />

<form method="POST" action="/?/delete-item" class="hidden" use:enhance>
	<input type="hidden" name="itemId" id="delete-item-id-input" />
	<button type="submit" id="delete-item-submit-button" />
</form>
