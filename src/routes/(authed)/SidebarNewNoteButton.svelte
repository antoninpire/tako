<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
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
					await invalidateAll();
					loading = false;
					if (result.type === 'success' && result.data?.itemId) goto('/' + result.data.itemId);
				};
			}}
		>
			<input type="hidden" value="file" name="type" />
			<button disabled={loading} type="submit" class="py-2 px-1.5 rounded-md hover:bg-white/5">
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
					/><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" /></svg
				>
			</button>
		</form>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>New Note</p>
	</Tooltip.Content>
</Tooltip.Root>
