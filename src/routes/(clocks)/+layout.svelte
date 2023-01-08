<script>
	import AutoFontSize from '$lib/AutoFontSize.svelte';
	import ArrowLeft from '$lib/ArrowLeft.svelte';
	import { derived } from 'svelte/store';
	import { getContext } from 'svelte';

	const hideUI = getContext('hideUI');

	const cursor = derived([hideUI], ([$hideUI]) => {
		return $hideUI ? 'none' : 'auto';
	});
</script>

<main style:cursor={$cursor}>
	<AutoFontSize>
		<slot />

		<a href="/" class:hide={$hideUI}>
			<ArrowLeft />
		</a>
	</AutoFontSize>
</main>

<style lang="scss">
	a {
		position: fixed;
		left: 0;
		top: 0;
		padding: 0.4em 0.5em;
		font-size: clamp(2.5rem, 4em, 4rem);
		transform: scale(1);
		opacity: 1;
		transition: all 200ms;

		&:hover {
			transform: scale(1.1);
		}

		&.hide {
			opacity: 0;
		}
	}
</style>
