<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import GithubPill from '$lib/components/GithubPill.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';

	let loading = false;
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<form
		method="post"
		use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				console.log(result);
				loading = false;
				if (result.type === 'error' || result.type === 'failure')
					// @ts-ignore
					toast.error(result.data?.message ?? 'Unknown error while signing up');
				applyAction(result);
			};
		}}
		class="flex flex-col gap-5"
	>
		<h1 class="text-2xl text-center font-bold mb-5">Create an account</h1>
		<fieldset class="flex flex-col gap-2 md:min-w-[400px] min-w-[85vw]">
			<Label class="font-semibold" for="email">Email</Label>
			<Input id="email" name="email" type="email" class="border-neutral-700" />
		</fieldset>
		<fieldset class="flex flex-col gap-2">
			<Label class="font-semibold" for="password">Password</Label>
			<Input id="password" name="password" type="password" class="border-neutral-700" />
		</fieldset>
		<Button disabled={loading} type="submit">
			{#if loading}
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
					class="lucide lucide-loader-2 animate-spin mr-2"
					><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
				>
			{/if}
			Sign up
		</Button>
		<p class="text-center text-sm mt-5">
			Already have an account? <a href="/signin" class="text-purple-500">Sign in</a>
		</p>
		<GithubPill />
	</form>
</div>

<svelte:head>
	<title>Tako | Sign up</title>
</svelte:head>
