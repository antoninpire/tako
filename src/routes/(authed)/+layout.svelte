<script lang="ts">
	import Sidebar from './Sidebar.svelte';

	export let data;
</script>

<Sidebar items={data.items} />
<div class="md:ml-72 md:w-[calc(100vw-18rem)] md:mt-0 mt-12 w-screen h-full">
	<slot />
</div>
