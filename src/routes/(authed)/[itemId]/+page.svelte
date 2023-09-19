<script lang="ts">
	import TipTap from '$lib/components/TipTap.svelte';

	export let data;
</script>

{#key data.note.id}
	<TipTap content={data.note.file?.content ?? ''} />
{/key}

<svelte:head>
	<title>Vault</title>
</svelte:head>
