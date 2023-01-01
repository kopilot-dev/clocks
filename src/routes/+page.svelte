<script lang="ts">
	import AutoFontSize from '$lib/AutoFontSize.svelte';
	import Monoton from '$lib/clocks/Monoton.svelte';
	import Monoton2 from '$lib/clocks/Monoton2.svelte';

	const clocks = [
		{ path: '/monoton', component: Monoton },
		{ path: '/monoton-simple', component: Monoton2 }
	];
</script>

<div class="background">
	<div class="grid">
		{#each clocks as clock}
			<a href={clock.path}>
				<AutoFontSize initialWidth={300}>
					<svelte:component this={clock.component} />
				</AutoFontSize>
			</a>
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
		justify-content: center;
		gap: 40px;
		width: 60vw;
		min-width: 320px;
		height: 100vh;
		overflow: hidden;

		a {
			position: relative;
			width: 300px;
			height: 200px;
			cursor: pointer;
			border-radius: 16px;
			overflow: hidden;
			transition: all 200ms;

			&:hover {
				box-shadow: 0 0 4rem hsla(0, 0%, 100%, 20%);
			}
		}
	}

	@media (prefers-color-scheme: light) {
		.background {
			background: linear-gradient(135deg, hsl(255, 90%, 80%) 5%, hsl(339, 80%, 75%) 95%);
		}
	}
</style>
