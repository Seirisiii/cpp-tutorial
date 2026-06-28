<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		caption = '',
		children
	}: { caption?: string; children: Snippet } = $props();
</script>

<div class="table-wrap">
	<table>
		{@render children()}
	</table>
</div>
{#if caption}
	<p class="table-caption">{caption}</p>
{/if}

<style>
	.table-wrap {
		margin: 18px 0;
		overflow-x: auto;
		border-radius: var(--radius);
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-sm);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
		background: var(--color-bg);
	}

	:global(.table-wrap th),
	:global(.table-wrap td) {
		padding: 10px 14px;
		text-align: left;
		border-bottom: 1px solid var(--color-line-soft);
	}

	:global(.table-wrap th) {
		background: var(--color-bg-tinted);
		font-weight: 600;
		color: var(--color-ink);
		border-bottom: 2px solid var(--color-line);
		font-size: 13.5px;
	}

	:global(.table-wrap td) {
		color: var(--color-ink-soft);
	}

	:global(.table-wrap tr:last-child td) {
		border-bottom: none;
	}

	:global(.table-wrap tr:hover td) {
		background: var(--color-bg-soft);
	}

	:global(.table-wrap td code),
	:global(.table-wrap th code) {
		background: var(--color-bg-tinted);
		color: var(--color-accent-dark);
		padding: 1px 5px;
		border-radius: 3px;
		font-family: var(--font-mono);
		font-size: 12.5px;
	}

	.table-caption {
		font-size: 13px;
		color: var(--color-ink-muted);
		text-align: center;
		margin: -6px 0 16px;
		font-style: italic;
	}
</style>
