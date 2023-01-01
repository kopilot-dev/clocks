<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../app.scss';
	import Favicon from './Favicon.svelte';
	import Title from './Title.svelte';
</script>

<Favicon />
<Title />

<main>
	<slot />
</main>
