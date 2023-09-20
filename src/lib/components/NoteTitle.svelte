<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Item } from '$lib/server/db/schema';
	import { toast } from 'svelte-sonner';

	export let note: Item;

	let name: string = note.name;

	$: {
		name = note.name;
	}

	async function onBlur(current?: string) {
		if (name === note.name && (!current || current === note.name)) return;
		fetch('/api/item', {
			method: 'PUT',
			body: JSON.stringify({
				itemId: note.id,
				name: current ? current : name
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
	on:change={(event) => {
		// @ts-ignore
		name = event.target?.value ?? '';
	}}
	value={name}
	on:blur={() => onBlur()}
	on:keydown={(event) => {
		// @ts-ignore
		if (event.key === 'Enter') onBlur(event.target?.value);
	}}
/>
