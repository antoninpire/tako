<script lang="ts">
	import { page } from '$app/stores';
	import { Blockquote } from '$lib/extensions/blockquote';
	import { Bold } from '$lib/extensions/bold';
	import { BulletList } from '$lib/extensions/bullet-list';
	import { CharacterCount } from '$lib/extensions/character-count';
	import { Code } from '$lib/extensions/code';
	import { Document } from '$lib/extensions/document';
	import { Dropcursor } from '$lib/extensions/drop-cursor';
	import { Gapcursor } from '$lib/extensions/gap-cursor';
	import { HardBreak } from '$lib/extensions/hard-break';
	import { Heading } from '$lib/extensions/heading';
	import { History } from '$lib/extensions/history';
	import { HorizontalRule } from '$lib/extensions/horizontal-rule';
	import { Italic } from '$lib/extensions/italic';
	import { ListItem } from '$lib/extensions/list-item';
	import { OrderedList } from '$lib/extensions/ordered-list';
	import { Paragraph } from '$lib/extensions/paragraph';
	import { Placeholder } from '$lib/extensions/placeholder';
	import { Strike } from '$lib/extensions/strike';
	import { TaskItem } from '$lib/extensions/task-item';
	import { TaskList } from '$lib/extensions/task-list';
	import { Text } from '$lib/extensions/text';
	import { TextStyle } from '$lib/extensions/text-style';
	import { Editor } from '@tiptap/core';
	import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
	import { Link } from '@tiptap/extension-link';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';
	import html from 'highlight.js/lib/languages/xml';
	import { createLowlight } from 'lowlight';
	import { CheckCircled, Reload } from 'radix-icons-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import '../../tiptap.css';

	export let content: string;

	const lowlight = createLowlight({
		html,
		css,
		js,
		ts
	});

	let element: Element;
	let editor: Editor;
	let currentContent: string = content;
	let previousContent: string = content;
	let intervalId: number;
	let synced = true;

	function createSyncInterval() {
		return setInterval(() => {
			if (currentContent !== previousContent) {
				console.log('Attempting to save...');
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
		}, 2000);
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Blockquote,
				BulletList,
				Code,
				Document,
				Dropcursor,
				Gapcursor,
				HardBreak,
				Heading,
				Link,
				History,
				HorizontalRule,
				Italic,
				ListItem,
				OrderedList,
				Paragraph,
				Strike,
				TextStyle,
				Text,
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				Bold,
				CharacterCount,
				Placeholder.configure({
					placeholder: 'Write something …'
				}),
				CodeBlockLowlight.configure({ lowlight })
			],
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
