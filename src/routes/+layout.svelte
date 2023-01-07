<script lang="ts">
	import 'modern-normalize/modern-normalize.css';

	import Favicon from '$lib/Favicon.svelte';
	import Title from '$lib/Title.svelte';
	import HideUi from '$lib/HideUI.svelte';

	export const prerender = true;
</script>

<Favicon />
<Title />

<HideUi>
	<slot />
</HideUi>
