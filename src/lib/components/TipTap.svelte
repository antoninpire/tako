<script lang="ts">
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
	import { onDestroy, onMount } from 'svelte';

	const lowlight = createLowlight({
		html,
		css,
		js,
		ts
	});

	let element: Element;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			// parseOptions: {

			// },
			extensions: [
				Blockquote,
				BulletList,
				// CodeBlock,
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
					// Use a placeholder:
					placeholder: 'Write something …'
					// Use different placeholders depending on the node type:
					// placeholder: ({ node }) => {
					//   if (node.type.name === 'heading') {
					//     return 'What’s the title?'
					//   }

					//   return 'Can you add some further context?'
					// },
				}),
				CodeBlockLowlight
					// .extend({
					// 	addNodeView() {
					// 		return SvelteNodeViewRenderer(CodeBlockComponent);
					// 	}
					// })
					.configure({ lowlight })
			],
			content: `
			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<p></p>
		<p></p>
		<p></p>
			<ul data-type="bulletList">
		  <li data-type="listItem">A list item</li>
		  <li data-type="listItem">And another one</li>
		</ul>
			
			<ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
		<p></p>
		<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tailwindui.com/components/application-ui/forms/checkboxes">https://tailwindui.com/components/application-ui/forms/checkboxes</a></p>
		<p></p>
		<p></p>
		<p></p>
		<pre><code class="language-ts"><span class="hljs-keyword">const</span> hello = <span class="hljs-string">"This is a piece of code"</span>.
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(hello, <span class="hljs-string">"world"</span>);</code></pre>
		`,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<!-- {#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if} -->

<div bind:this={element} />

<!-- <style>
	button.active {
		background: black;
		color: white;
	}
</style> -->
