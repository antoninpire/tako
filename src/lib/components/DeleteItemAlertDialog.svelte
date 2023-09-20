<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { alertDialogDeleteItemId } from '$lib/stores/alert-dialog';
	import { toast } from 'svelte-sonner';

	let open = false;
	let loading = false;

	alertDialogDeleteItemId.subscribe((value) => {
		open = !!value;
	});
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the item and all the nested
				items.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				method="POST"
				action="/?/delete-item"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						if (result.type === 'success') {
							if ($alertDialogDeleteItemId === $page.params.itemId) goto('/');
						} else if (result.type === 'error') {
							console.error(result.error);
							toast.error('Error while deleting the item !');
						}
						invalidateAll();
						loading = false;
						alertDialogDeleteItemId.set(null);
						applyAction(result);
					};
				}}
			>
				<input type="hidden" value={$alertDialogDeleteItemId} name="itemId" />
				<AlertDialog.Action type="submit" disabled={loading}>Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
