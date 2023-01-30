<script lang="ts">
	import Thing from './Thing.svelte';

	const clocks = [
		{ path: '#monoton', component: Thing },
		{ path: '#monoton', component: Thing },
		{ path: '#monoton', component: Thing }
	];
</script>

<div class="background">
	<div class="grid">
		{#each clocks as clock}
			<svelte:component this={clock.component} />
		{/each}
	</div>
</div>

<style lang="scss">
	.background {
		display: flex;
		justify-content: center;
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(135deg, hsl(255, 60%, 35%) 5%, hsl(339, 60%, 35%) 95%);
	}

	.grid {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		justify-content: center;
		gap: 40px;
		width: 80vw;
		min-width: 320px;
		height: 100vh;
	}

	@media (prefers-color-scheme: light) {
		.background {
			background: linear-gradient(135deg, hsl(255, 90%, 80%) 5%, hsl(339, 80%, 75%) 95%);
		}
	}
</style>
