<script lang="ts">
	import NoteTitle from '$lib/components/NoteTitle.svelte';
	import TipTap from '$lib/components/TipTap.svelte';

	export let data;
</script>

<div class="overflow-y-scroll h-full">
	{#key data.note.id}
		<NoteTitle note={data.note} />
		<div class="md:pt-6 md:px-5 xl:px-6 pt-3 px-4 text-sm md:text-base">
			<TipTap content={data.note.file?.content ?? ''} />
		</div>
	{/key}
</div>

<svelte:head>
	<title>Vault</title>
</svelte:head>
