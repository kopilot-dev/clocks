<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let initialWidth = 1200;

	const fontsize = writable(calculateFontsize(initialWidth));
	let lastWidth = initialWidth;

	function calculateFontsize(width: number) {
		return width / 100;
	}

	function setFontsize() {
		const width = div.getBoundingClientRect().width;
		if (width !== lastWidth) {
			lastWidth = width;
			fontsize.set(calculateFontsize(width));
			lastWidth = width;
		}
	}

	let div: HTMLDivElement;

	onMount(() => {
		setFontsize();
		const id = setInterval(setFontsize, 20);

		return () => {
			clearInterval(id);
		};
	});
</script>

<div style:font-size={`${$fontsize}px`} bind:this={div}>
	<slot />
</div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>
