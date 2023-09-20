<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Item } from '$lib/server/db/schema';
	import { onMount } from 'svelte';
	import { searchDialogOpen } from '../stores/search';

	export let items: Item[] = [];

	let query = '';

	onMount(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
				event.preventDefault();
				searchDialogOpen.update((open) => !open);
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	$: filteredItems = items.filter((item) => {
		if (item.type === 'folder') return false;
		if (query === '') return true;
		return item.name.toLowerCase().includes(query.toLowerCase());
	});
</script>

<Dialog.Root bind:open={$searchDialogOpen}>
	<Dialog.Content class="md:w-[56vw] w-[80vw] p-0 rounded-md">
		<input
			type="text"
			class="bg-transparent outline-none px-4 text-lg py-2.5 w-full border-b border-b-accent"
			placeholder="Search through your notes..."
			bind:value={query}
		/>
		<div class="md:h-[250px] h-[50vh] w-full px-4 overflow-y-scroll pb-1">
			{#if filteredItems.length === 0}
				<div class="flex items-center justify-center w-full h-full">
					<p class="text-center text-popover-foreground">No results found.</p>
				</div>
			{:else}
				{#each filteredItems as item}
					<a href="/{item.id}">
						<div class="px-2 py-1.5 hover:bg-accent hover:bg-opacity-10 rounded-md">
							<span class="block text-popover-foreground">{item.name}</span>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
