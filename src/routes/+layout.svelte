<script lang="ts">
	import 'modern-normalize/modern-normalize.css';

	import Favicon from '$lib/Favicon.svelte';
	import Title from '$lib/Title.svelte';
	import { animDur } from '$lib/const';

	export const prerender = true;
</script>

<svelte:head>
	{@html `<style>:root { --anim-dur: ${animDur}ms; }</style>`}
</svelte:head>

<Favicon />
<Title />

<slot />
