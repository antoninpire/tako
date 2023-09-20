<script lang="ts">
	import NoteTitle from '$lib/components/NoteTitle.svelte';
	import TipTap from '$lib/components/TipTap.svelte';

	export let data;
</script>

{#key data.note.id}
	<NoteTitle note={data.note} />
	<div class="md:pt-6 md:px-4 pt-3 px-2.5 text-sm md:text-base">
		<TipTap content={data.note.file?.content ?? ''} />
	</div>
{/key}

<svelte:head>
	<title>Vault</title>
</svelte:head>
