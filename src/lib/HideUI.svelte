<script lang="ts">
	import { writable } from 'svelte/store';
	import { debounce } from 'lodash';
	import { onMount, setContext } from 'svelte';

	const hideUI = writable(false);

	setContext('hideUI', hideUI);

	const show = debounce(
		() => {
			hideUI.set(false);
		},
		0,
		{ leading: true, trailing: false }
	);

	const hide = debounce(() => {
		hideUI.set(true);
		console.log('*');
	}, 500);

	function mousemove() {
		show();
		hide();
	}

	onMount(hide);
</script>

<svelte:window on:mousemove={mousemove} />

<slot />
