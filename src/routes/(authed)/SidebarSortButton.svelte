<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { sortOrder } from '$lib/stores/sort';
	import { Check } from 'radix-icons-svelte';

	let open = false;
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger asChild let:builder>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button builders={[builder]} size="icon" class="px-1.5 py-2 w-auto h-auto" variant="ghost">
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
						class="lucide lucide-arrow-up-narrow-wide"
						><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path
							d="M11 16h7"
						/><path d="M11 20h10" /></svg
					>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Sort By</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-52">
		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('name_asc');
				}}
				class="flex items-center justify-between"
			>
				<span>File name (A to Z)</span>
				{#if $sortOrder === 'name_asc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('name_desc');
				}}
			>
				<span>File name (Z to A)</span>
				{#if $sortOrder === 'name_desc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('updated_at_asc');
				}}
			>
				<span>Modified time (new to old)</span>
				{#if $sortOrder === 'updated_at_asc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('updated_at_desc');
				}}
			>
				<span>Modified time (old to new)</span>
				{#if $sortOrder === 'updated_at_desc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('created_at_asc');
				}}
			>
				<span>Created time (new to old)</span>
				{#if $sortOrder === 'created_at_asc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => {
					sortOrder.set('created_at_desc');
				}}
			>
				<span>Created time (old to new)</span>
				{#if $sortOrder === 'created_at_desc'}
					<Check size={18} />
				{/if}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
