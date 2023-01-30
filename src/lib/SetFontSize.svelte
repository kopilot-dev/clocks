<script lang="ts">
	export let width: number;
</script>

<div style:font-size={`${width / 10}px`}>
	<slot />
</div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: all var(--anim-dur);
	}
</style>
