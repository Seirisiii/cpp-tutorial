<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, children }: { id: string; children: Snippet } = $props();
</script>

<section class="content-section" {id}>
	{@render children()}
</section>

<style>
	.content-section {
		max-width: var(--content-max);
		margin: 0 auto 28px;
		padding: 0 24px 24px;
		scroll-margin-top: calc(var(--topbar-h) + 16px);
	}

	@media (max-width: 768px) {
		.content-section {
			padding: 24px 16px;
		}
	}
</style>
