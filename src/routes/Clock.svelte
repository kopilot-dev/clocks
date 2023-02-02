<script lang="ts">
	import { animDur } from '$lib/const';
	import SetFontSize from '$lib/SetFontSize.svelte';
	import { wait } from '$lib/wait';
	import { derived, get, writable } from 'svelte/store';
	import { debounce } from 'lodash';
	import { onMount } from 'svelte';
	import { IconX } from '@tabler/icons-svelte';

	const active = writable(false);
	let width = 300;

	let wrapper: HTMLDivElement;
	let shapeshifter: HTMLDivElement;

	const hideUI = writable(false);
	let isTouch = false;

	const isHidden = derived([hideUI, active], ([$hideUI, $active]) => {
		return $hideUI || !$active;
	});

	const cursor = derived([hideUI, active], ([$hideUI, $active]) => {
		if (!$active) return 'pointer';
		return $hideUI ? 'none' : 'auto';
	});

	async function open() {
		if (!get(active)) {
			active.set(true);
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
		if (get(active)) {
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

			active.set(false);
		}
	}

	function onResize() {
		if (get(active)) {
			width = window.innerWidth;
		}
	}

	function hover() {
		if (!get(active)) {
			width = 420;
		}
	}

	function noHover() {
		if (!get(active)) {
			width = 300;
		}
	}

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

<svelte:window
	on:keydown={(ev) => {
		if ('Escape' === ev.code) close();
	}}
	on:resize={onResize}
	on:mousemove={mousemove}
	on:touchstart={() => (isTouch = true)}
	on:click={toggle}
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
	class:active={$active}
	style:cursor={$cursor}
>
	<div class="shapeshifter" bind:this={shapeshifter} class:active={$active}>
		<div class="background">
			<slot name="background" />
		</div>

		<div class="main" class:active={$active}>
			<SetFontSize {width}>
				<slot name="main" />
			</SetFontSize>
		</div>

		<button class="close" class:hide={$isHidden} on:click={close}>
			<IconX size={32} />
		</button>
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
			transition: all var(--anim-dur);

			.background {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				overflow: hidden;
				border-radius: 12px;
				transition: all var(--anim-dur);
			}

			&.active .background {
				border-radius: 0;
			}

			.main {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				transition: all var(--anim-dur);
			}

			.close {
				position: absolute;
				left: 1rem;
				top: 1rem;
				width: 48px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: hsl(0, 0%, 85%);
				background-color: hsl(0, 0%, 10%);
				border-radius: 100%;
				border: none;
				outline: none;
				cursor: pointer;
				transform: scale(1);
				opacity: 1;
				transition: all var(--anim-dur);

				:global(svg) {
					transform: scale(1);
					transition: all var(--anim-dur);
				}

				&:hover {
					transform: scale(1.05);

					:global(svg) {
						transform: scale(1.2);
					}
				}

				&.hide {
					opacity: 0;
				}
			}
		}
	}

	@media (prefers-color-scheme: light) {
		.wrapper .shapeshifter .close {
			color: hsl(0, 0%, 15%);
			background-color: hsl(0, 0%, 90%);
		}
	}
</style>
