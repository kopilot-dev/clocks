<script lang="ts">
	import { writable } from 'svelte/store';
	import { debounce } from 'lodash';
	import { onMount, setContext } from 'svelte';

	const hideUI = writable(false);
	let isTouch = false;

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
	}, 500);

	function mousemove() {
		if (!isTouch) {
			show();
			hide();
		}
	}

	function toggle() {
		if (isTouch) {
			hideUI.update(($hideUI) => !$hideUI);
		}
	}

	onMount(hide);
</script>

<svelte:window on:mousemove={mousemove} on:touchstart={() => (isTouch = true)} on:click={toggle} />

<slot />
