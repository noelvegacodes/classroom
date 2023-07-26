<script lang="ts">
	import type { User } from '@prisma/client';
	export let user: User | null;
</script>

<div class="bg-orange-600 border-b border-orange-500 text-orange-50 p-2 px-4 flex items-center">
	<a href="/" class="font-black text-3xl">Classroom</a>
	<div class="flex-1" />

	{#if user}
		<p>Signed in as: {user.email}</p>
	{:else}
		<a href="/register" class="bg-orange-500 border border-orange-400 px-4 mr-4 p-1 rounded-md"
			>Register</a
		>
		<a href="/login">Login</a>
	{/if}
</div>
