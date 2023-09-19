<script lang="ts">
	import Sidebar from './Sidebar.svelte';

	export let data;
</script>

<Sidebar items={data.items} />
<div class="ml-72 w-[calc(100vw-18rem)] h-full px-4 pt-6">
	<slot />
</div>
