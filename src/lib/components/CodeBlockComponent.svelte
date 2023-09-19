<script lang="ts">
	import NodeViewContent from '$lib/components/NodeViewContent.svelte';
	import NodeViewWrapper from '$lib/components/NodeViewWrapper.svelte';
	import type { Editor } from '@tiptap/core';
	import type { Decoration } from '@tiptap/pm/view';

	export let editor: Editor;
	export let node: any;
	export let getPos: (() => number) | boolean;
	export let HTMLAttributes: Record<string, any>;
	export let decorations: Decoration[];
	export let extension: any;
</script>

<NodeViewWrapper class="code-block">
	<select contenteditable={false}>
		<option value="null"> auto </option>
		<option disabled> — </option>
		{#each extension.options.lowlight.listLanguages() as lang}
			<option value={lang}>
				{lang}
			</option>
		{/each}
	</select>
	<pre>
      <NodeViewContent as="code" />
    </pre>
</NodeViewWrapper>
