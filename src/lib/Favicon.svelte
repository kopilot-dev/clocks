<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const hour = writable(0);

	function setHour() {
		const hour24 = new Date().getHours();
		const hour12 = hour24 % 12;
		hour.set(hour12 === 0 ? 12 : hour12);
	}
	setHour();

	onMount(() => {
		const interval = setInterval(setHour, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={`/clocks/clock-hour-${$hour}.svg`} />
</svelte:head>
