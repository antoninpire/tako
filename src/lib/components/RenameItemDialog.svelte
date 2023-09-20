<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { dialogRenameItem } from '$lib/stores/dialog';
	import { toast } from 'svelte-sonner';

	let open = false;
	let loading = false;
	let name: string;

	dialogRenameItem.subscribe((value) => {
		open = !!value;
		name = value?.name ?? '';
	});

	async function renameItem() {
		if (!$dialogRenameItem || name === $dialogRenameItem.name) return;
		fetch('/api/item', {
			method: 'PUT',
			body: JSON.stringify({
				itemId: $dialogRenameItem.id,
				name
			})
		})
			.then(() => {
				invalidateAll();
			})
			.catch((err) => {
				console.error('error', err);
				toast.error('Failed to update item name');
			})
			.finally(() => {
				loading = false;
				dialogRenameItem.set(null);
			});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Rename Item</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Name</Label>
				<Input
					bind:value={name}
					id="name"
					class="col-span-3"
					on:keydown={(event) => {
						if (event.key === 'Enter' && name?.length) renameItem();
					}}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={renameItem}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
