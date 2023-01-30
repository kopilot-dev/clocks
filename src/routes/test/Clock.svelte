<script lang="ts">
	import { animDur } from '$lib/const';
	import SetFontSize from '$lib/SetFontSize.svelte';
	import { wait } from '$lib/wait';

	let active = false;
	let width = 300;

	let wrapper: HTMLDivElement;
	let shapeshifter: HTMLDivElement;

	async function open() {
		if (!active) {
			active = true;
			const rect = wrapper.getBoundingClientRect();
			shapeshifter.style.position = 'fixed';
			shapeshifter.style.top = rect.top + 'px';
			shapeshifter.style.left = rect.left + 'px';

			await wait(20);

			shapeshifter.style.transition = 'all var(--anim-dur)';

			await wait(20);

			width = window.innerWidth;
			shapeshifter.style.top = '0px';
			shapeshifter.style.left = '0px';
			shapeshifter.style.height = '100vh';
			shapeshifter.style.width = '100vw';

			await wait(animDur + 10);

			shapeshifter.style.transition = '';
		}
	}

	async function close() {
		if (active) {
			const rect = wrapper.getBoundingClientRect();
			shapeshifter.style.transition = 'all var(--anim-dur)';

			await wait(20);

			width = 300;
			shapeshifter.style.top = rect.top + 'px';
			shapeshifter.style.left = rect.left + 'px';
			shapeshifter.style.height = '';
			shapeshifter.style.width = '';

			await wait(animDur + 10);

			shapeshifter.style.top = '';
			shapeshifter.style.left = '';
			shapeshifter.style.position = '';
			shapeshifter.style.transition = '';

			active = false;
		}
	}

	function onResize() {
		if (active) {
			width = window.innerWidth;
		}
	}

	function hover() {
		if (!active) {
			width = 450;
		}
	}

	function noHover() {
		if (!active) {
			width = 300;
		}
	}
</script>

<svelte:window
	on:keydown={(ev) => {
		if ('Escape' === ev.code) close();
	}}
	on:resize={onResize}
/>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="wrapper"
	bind:this={wrapper}
	tabindex="0"
	on:click={open}
	on:keypress={open}
	on:mousemove={hover}
	on:focus={hover}
	on:mouseleave={noHover}
	on:blur={noHover}
	class:active
>
	<div class="shapeshifter" bind:this={shapeshifter} class:active>
		<div class="background">
			<slot name="background" />
		</div>

		<div class="main" class:active>
			<SetFontSize {width}>
				<slot name="main" />
			</SetFontSize>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		width: 300px;
		height: 200px;
		outline: none;
		border: none;

		&:hover,
		&.active {
			z-index: 100;
		}

		&:not(.active) {
			cursor: pointer;
		}

		.shapeshifter {
			position: relative;
			width: 300px;
			height: 200px;
			background-color: hsla(0, 0%, 30%, 0.5);
			background-color: #222;
			transition: all var(--anim-dur);

			&:not(.active) {
				border-radius: 12px;
			}

			.background {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity: 0;
				transition: all var(--anim-dur);
			}

			.main {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				transition: all var(--anim-dur);
			}
		}
	}
</style>
