<script lang="ts">
	import 'modern-normalize/modern-normalize.css';

	import Favicon from '$lib/Favicon.svelte';
	import Title from '$lib/Title.svelte';

	export const prerender = true;
</script>

<Favicon />
<Title />

<slot />
