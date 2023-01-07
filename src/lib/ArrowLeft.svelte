<script lang="ts">
	export let size: number | string = '1em';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="icon icon-tabler icon-tabler-arrow-narrow-left"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	stroke-width="2"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<line x1="5" y1="12" x2="19" y2="12" />
	<line x1="5" y1="12" x2="9" y2="16" />
	<line x1="5" y1="12" x2="9" y2="8" />
</svg>

<style>
	svg {
		stroke: hsl(0, 0%, 80%);
	}

	@media (prefers-color-scheme: light) {
		svg {
			stroke: hsl(0, 0%, 20%);
		}
	}
</style>
