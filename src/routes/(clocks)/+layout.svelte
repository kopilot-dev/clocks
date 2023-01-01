<script>
	import Cursor from '$lib/Cursor.svelte';
	import AutoFontSize from '$lib/AutoFontSize.svelte';
</script>

<Cursor>
	<AutoFontSize>
		<slot />
	</AutoFontSize>
</Cursor>
