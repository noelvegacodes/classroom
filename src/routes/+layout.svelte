<script lang="ts">
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/shared/Header.svelte';
	export let data: LayoutData;
</script>

<main class="flex flex-col h-screen">
	<Header user={data.user} />
	<slot />
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme('colors.stone.200');
		color: theme('colors.stone.950');
	}
</style>
