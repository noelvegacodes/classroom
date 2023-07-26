<script>
	import '../app.postcss';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme('colors.stone.200');
		color: theme('colors.stone.950');
	}
</style>
