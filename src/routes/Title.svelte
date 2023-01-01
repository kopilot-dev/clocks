<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const title = writable('...');

	function setTitle() {
		const date = new Date();
		title.set(date.toLocaleTimeString());
	}
	setTitle();

	onMount(() => {
		const interval = setInterval(setTitle, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
