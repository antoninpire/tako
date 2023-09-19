<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<button class="py-2 px-1.5 rounded-md hover:bg-white/5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-arrow-up-narrow-wide"
				><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path
					d="M11 16h7"
				/><path d="M11 20h10" /></svg
			>
		</button></Tooltip.Trigger
	>
	<Tooltip.Content>
		<p>Sort By</p>
	</Tooltip.Content>
</Tooltip.Root>
