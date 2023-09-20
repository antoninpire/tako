<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import type { Tree } from '$lib/create-item-tree-from-list';
	import { alertDialogDeleteItemId } from '$lib/stores/alert-dialog';
	import { dialogRenameItem } from '$lib/stores/dialog';
	import { sortOrder } from '$lib/stores/sort';
	import { ChevronDown, ChevronRight, Pencil2, Trash } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let item: Tree[number];
	export let isRoot = false;

	let expanded = false;
	let creating = false;

	$: active = item.id === $page.params.itemId;

	$: sortedChildren =
		item.children?.sort((a, b) => {
			if (a.type === 'folder' && b.type === 'file') return -1;
			if (a.type === 'file' && b.type === 'folder') return 1;
			if ($sortOrder === 'name_desc') return b.name.localeCompare(a.name);
			else if ($sortOrder === 'created_at_asc')
				return a.createdAt.getTime() - b.createdAt.getTime();
			else if ($sortOrder === 'created_at_desc')
				return b.createdAt.getTime() - a.createdAt.getTime();
			else if ($sortOrder === 'updated_at_asc')
				return a.updatedAt.getTime() - b.updatedAt.getTime();
			else if ($sortOrder === 'updated_at_desc')
				return b.updatedAt.getTime() - a.updatedAt.getTime();
			return a.name.localeCompare(b.name);
		}) ?? [];
</script>

<ul
	class="m-0 list-none p-0 {isRoot ? '' : 'pl-[1.2rem]'} select-none text-sm text-neutral-300"
	style="margin-block-start: 0;"
>
	<li class="mb-0.5">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				{#if item.type === 'folder'}
					<div
						class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:cursor-pointer hover:bg-white/5"
						on:click={() => {
							expanded = !expanded;
						}}
					>
						{#if !expanded}
							<ChevronRight size={16} />
						{:else}
							<ChevronDown size={16} />
						{/if}
						{item.name}
					</div>
				{:else}
					<a
						class="flex items-center gap-2 px-2 py-1 rounded-md hover:cursor-pointer {active
							? 'bg-white/5'
							: 'hover:bg-white/5'}"
						href="/{item.id}"
					>
						<div class="w-4 h-4" />
						{item.name}
					</a>
				{/if}
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				{#if item.type === 'folder'}
					<form
						method="POST"
						action="/?/create-item"
						use:enhance={() => {
							creating = true;
							return async ({ result }) => {
								if (result.type === 'error') {
									console.error(result.error);
									toast.error('Error while creating a new note !');
								}
								await invalidateAll();
								creating = false;
								expanded = true;
								if (result.type === 'success' && result.data?.itemId)
									goto('/' + result.data.itemId);
							};
						}}
					>
						<input type="hidden" name="type" value="file" />
						<input type="hidden" name="parentId" value={item.id} />
						<button type="submit" class="w-full" disabled={creating}>
							<ContextMenu.Item class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-file-edit"
									><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" /><polyline
										points="14 2 14 8 20 8"
									/><path
										d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"
									/></svg
								>
								New note
							</ContextMenu.Item>
						</button>
					</form>
					<form
						method="POST"
						action="/?/create-item"
						use:enhance={() => {
							creating = true;
							return async ({ result }) => {
								if (result.type === 'error') {
									console.error(result.error);
									toast.error('Error while creating a new note !');
								}
								await invalidateAll();
								creating = false;
								expanded = true;
							};
						}}
					>
						<input type="hidden" name="type" value="folder" />
						<input type="hidden" name="parentId" value={item.id} />
						<button type="submit" class="w-full" disabled={creating}>
							<ContextMenu.Item class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-folder-plus"
									><path
										d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
									/><line x1="12" x2="12" y1="10" y2="16" /><line
										x1="9"
										x2="15"
										y1="13"
										y2="13"
									/></svg
								>
								New folder
							</ContextMenu.Item>
						</button>
					</form>

					<ContextMenu.Separator />
				{/if}
				<button
					on:click={() => {
						dialogRenameItem.set({
							name: item.name,
							id: item.id
						});
					}}
					class="w-full"
				>
					<ContextMenu.Item class="flex items-center gap-2">
						<Pencil2 size={16} />
						Rename
					</ContextMenu.Item>
				</button>
				<button
					on:click={() => {
						if (item.type === 'folder') alertDialogDeleteItemId.set(item.id);
						else {
							const input = document.getElementById('delete-item-id-input');
							if (input) {
								// @ts-ignore
								input.value = item.id;
								const button = document.getElementById(`delete-item-submit-button`);
								if (button) button?.click();
							}
						}
					}}
					class="w-full"
				>
					<ContextMenu.Item class="flex items-center gap-2 hover:!text-red-500">
						<Trash size={18} />
						Delete
					</ContextMenu.Item>
				</button>
			</ContextMenu.Content>
		</ContextMenu.Root>

		{#if expanded && item.children?.length}
			{#each sortedChildren as child}
				{#key child.id}
					<svelte:self item={child} />
				{/key}
			{/each}
		{/if}
	</li>
</ul>
