<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import leftPad from '$lib/leftPad';
	import Clock from './Clock.svelte';

	const time = writable('00:00');

	function setTime() {
		const date = new Date();
		const hours = date.getHours().toString();
		const minutes = date.getMinutes().toString();
		time.set([leftPad(hours), leftPad(minutes)].join(':'));
	}
	setTime();

	onMount(() => {
		const interval = setInterval(setTime, 200);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Clock>
	<div slot="background" class="background" />
	<div slot="main" class="main">
		<div class="text">{$time}</div>
	</div>
</Clock>

<style lang="scss">
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: hsl(0, 0%, 15%);
	}

	.main {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			font-family: Monoton;
			font-size: 4.5ch;
			color: hsl(0, 0%, 95%);
		}
	}

	@media (prefers-color-scheme: light) {
		.background {
			background-color: hsl(0, 0%, 85%);
		}

		.main .text {
			color: hsl(0, 0%, 15%);
		}
	}
</style>
