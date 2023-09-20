<script lang="ts">
	import { searchDialogOpen } from '$lib/stores/search';

	function createFile() {
		const button = document.getElementById('create-new-note-form-submit');
		if (button) (button as HTMLButtonElement).click();
	}

	function searchFiles() {
		searchDialogOpen.set(true);
	}
</script>

<div class="w-full h-screen flex items-center justify-center flex-col gap-5">
	<h2 class="font-bold">No File is Open</h2>
	<div class="flex flex-col gap-2 items-center text-purple-400">
		<button on:click={createFile}> Create new file (Ctrl + J) </button>
		<button on:click={searchFiles}> Search Files (Ctrl + O) </button>
	</div>
</div>

<svelte:head>
	<title>Vault</title>
</svelte:head>
