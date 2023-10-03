<script lang="ts">
	import '@fontsource/fira-code';
	import '@fontsource/inter';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
</script>

<Toaster richColors />
<slot />
