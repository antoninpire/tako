<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { extensions } from '$lib/editor-extensions';
	import { Editor } from '@tiptap/core';
	import { CheckCircled, Reload } from 'radix-icons-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import '../../tiptap.css';

	export let content: string;

	let element: Element;
	let editor: Editor;
	let currentContent: string = content;
	let previousContent: string = content;
	let intervalId: number;
	let synced = true;

	function sync() {
		if (currentContent !== previousContent) {
			fetch('/api/file', {
				method: 'POST',
				body: JSON.stringify({
					content: currentContent,
					itemId: $page.params.itemId
				})
			})
				.then(() => {
					previousContent = currentContent;
					synced = true;
				})
				.catch((err) => {
					console.error(err);
					toast.error('Failed to save!');
				});
		}
	}

	function createSyncInterval() {
		return setInterval(() => {
			sync();
		}, 2000);
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions,
			content,
			onTransaction: () => {
				editor = editor;
			}
		});

		editor.on('update', ({ editor }) => {
			synced = false;
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = createSyncInterval();
			}
			currentContent = editor.getHTML();
		});

		intervalId = createSyncInterval();
	});

	beforeNavigate(() => {
		sync();
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={element} />
<div
	class="fixed bottom-0 right-0 px-3 py-2 rounded-md shadow-md bg-popover flex items-center justify-center gap-2 text-xs text-popover-foreground"
>
	<span>{editor?.storage?.characterCount.characters() ?? 0} characters</span>
	<span>{editor?.storage?.characterCount.words() ?? 0} words</span>
	{#if synced}
		<CheckCircled size={16} color="green" />
	{:else}
		<Reload size={16} color="pink" />
	{/if}
</div>
