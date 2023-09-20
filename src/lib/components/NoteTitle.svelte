<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Item } from '$lib/server/db/schema';
	import { toast } from 'svelte-sonner';

	export let note: Item;

	let name = note.name;

	async function onBlur() {
		if (name === note.name) return;
		fetch('/api/item', {
			method: 'PUT',
			body: JSON.stringify({
				itemId: note.id,
				name
			})
		})
			.then(() => {
				invalidateAll();
			})
			.catch((err) => {
				console.error('error', err);
				toast.error('Failed to update note name');
			});
	}
</script>

<input
	type="text"
	class="w-full py-6 px-4 text-3xl font-semibold bg-transparent border-b border-neutral-700 focus:outline-none"
	placeholder="Title"
	maxlength="75"
	bind:value={name}
	on:blur={onBlur}
/>
