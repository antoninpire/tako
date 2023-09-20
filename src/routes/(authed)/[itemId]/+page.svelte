<script lang="ts">
	import NoteTitle from '$lib/components/NoteTitle.svelte';
	import TipTap from '$lib/components/TipTap.svelte';

	export let data;
</script>

{#key data.note.id}
	<NoteTitle note={data.note} />
	<div class="pt-6 px-4">
		<TipTap content={data.note.file?.content ?? ''} />
	</div>
{/key}

<svelte:head>
	<title>Vault</title>
</svelte:head>
