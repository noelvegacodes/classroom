<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance, errors } = superForm(data.form);
</script>

<main class="flex-1 grid place-items-center">
	<form
		method="POST"
		use:enhance
		class="bg-stone-100 border border-stone-300 p-4 rounded-md flex flex-col w-screen max-w-[500px]"
	>
		<p class="mb-4">Login</p>
		<div
			class="bg-stone-200 border border-stone-300 rounded-md flex items-center mb-2 focus-within:ring-2 ring-orange-400"
		>
			<div>
				<i class="bi bi-envelope p-2" />
			</div>
			<input
				type="text"
				class="bg-transparent border-none outline-none p-2 flex-1"
				placeholder="Email"
				name="email"
				bind:value={$form.email}
			/>
		</div>
		{#if $errors.email}
			<p class="text-red-500 text-sm mb-2">{$errors.email}</p>
		{/if}

		<div
			class="bg-stone-200 border border-stone-300 rounded-md flex items-center focus-within:ring-2 ring-orange-400"
		>
			<div>
				<i class="bi bi-key p-2" />
			</div>
			<input
				type="password"
				class="bg-transparent border-none outline-none p-2 flex-1"
				placeholder="Password"
				name="password"
				bind:value={$form.password}
			/>
		</div>
		{#if $errors.password}
			<p class="text-red-500 text-sm mb-2">{$errors.password}</p>
		{/if}

		<button class="mt-4 bg-orange-500 border border-orange-400 text-orange-50 p-2 rounded-md">
			Submit
		</button>
		<a href="/register" class="text-sm text-orange-500 mt-4 underline">Don't have an account yet?</a
		>
	</form>
</main>
