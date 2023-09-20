<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { toast } from 'svelte-sonner';

	let loading = false;
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<form
			method="POST"
			action="/?/create-item"
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					if (result.type === 'error') {
						console.error(result.error);
						toast.error('Error while creating a new note !');
					}
					invalidateAll();
					loading = false;
					applyAction(result);
				};
			}}
		>
			<input type="hidden" value="folder" name="type" />
			<Button
				size="xs"
				variant="outline"
				disabled={loading}
				type="submit"
				class="py-2 px-1.5 rounded-md md:hidden hover:bg-white/5"
			>
				New Folder
			</Button>
			<button
				disabled={loading}
				type="submit"
				class="py-2 px-1.5 rounded-md hidden md:block hover:bg-white/5"
			>
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
					/><line x1="12" x2="12" y1="10" y2="16" /><line x1="9" x2="15" y1="13" y2="13" /></svg
				>
			</button>
		</form></Tooltip.Trigger
	>
	<Tooltip.Content>
		<p>New Folder</p>
	</Tooltip.Content>
</Tooltip.Root>
