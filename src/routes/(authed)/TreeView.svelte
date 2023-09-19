<script lang="ts">
	import { page } from '$app/stores';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import type { Tree } from '$lib/create-item-tree-from-list';
	import { ChevronDown, ChevronRight, Pencil2, Trash } from 'radix-icons-svelte';

	export let item: Tree[number];
	export let isRoot = false;

	let expanded = false;

	$: active = item.id === $page.params.itemId;
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
				<ContextMenu.Item class="flex items-center gap-2">
					<Pencil2 size={16} />
					Rename
				</ContextMenu.Item>
				<ContextMenu.Item class="flex items-center gap-2 hover:!text-red-500">
					<Trash size={18} />
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>

		{#if expanded && item.children?.length}
			{#each item.children as child}
				<svelte:self item={child} />
			{/each}
		{/if}
	</li>
</ul>
