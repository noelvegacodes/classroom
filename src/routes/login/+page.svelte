<main class="h-screen w-screen grid place-items-center">
	<div
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
				name="email"
				class="bg-transparent border-none outline-none p-2 flex-1"
				placeholder="Email"
			/>
		</div>

		<div
			class="bg-stone-200 border border-stone-300 rounded-md flex items-center focus-within:ring-2 ring-orange-400"
		>
			<div>
				<i class="bi bi-key p-2" />
			</div>
			<input
				type="text"
				name="password"
				class="bg-transparent border-none outline-none p-2 flex-1"
				placeholder="Password"
			/>
		</div>

		<button class="mt-4 bg-orange-500 border border-orange-400 text-orange-50 p-2 rounded-md">
			Submit
		</button>
	</div>
</main>
