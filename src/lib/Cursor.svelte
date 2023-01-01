<script lang="ts">
	import { writable } from 'svelte/store';
	import { debounce } from 'lodash';

	const AUTO = 'auto';
	const NONE = 'none';

	const cursor = writable(AUTO);

	const show = debounce(
		() => {
			cursor.set(AUTO);
		},
		0,
		{ leading: true, trailing: false }
	);

	const hide = debounce(() => {
		cursor.set(NONE);
	}, 2000);

	function mousemove() {
		show();
		hide();
	}
</script>

<svelte:window on:mousemove={mousemove} />

<main style:cursor={$cursor}>
	<slot />
</main>
