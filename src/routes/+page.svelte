<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import leftPad from '$lib/leftPad';

	const time = writable('00:00:00');

	function setTime() {
		const date = new Date();
		const hours = date.getHours().toString();
		const minutes = date.getMinutes().toString();
		const seconds = date.getSeconds().toString();
		time.set([leftPad(hours), leftPad(minutes), leftPad(seconds)].join(':'));
	}
	setTime();

	onMount(() => {
		const interval = setInterval(setTime, 200);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
	<p>{$time}</p>
</section>

<style>
	section {
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: none;
	}

	section p {
		font-family: 'Monoton', sans-serif;
		font-size: 16vw;
		color: hsl(0, 0%, 95%);
		filter: drop-shadow(0 0 0.02em hsl(0, 0%, 15%));
	}

	@media (prefers-color-scheme: light) {
		section p {
			color: hsl(0, 0%, 15%);
			filter: drop-shadow(0 0 0.02em hsl(0, 0%, 95%));
		}
	}
</style>
