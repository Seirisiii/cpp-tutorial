<script lang="ts">
	let { num, title }: { num: string; title: string } = $props();
</script>

<h2 class="section-heading">
	<span class="section-num">{num}</span>
	<span class="section-title">{title}</span>
</h2>

<style>
	.section-heading {
		font-family: var(--font-sans);
		font-weight: 700;
		color: var(--color-ink);
		margin: 0 0 14px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--color-line);
		line-height: 1.3;
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
		font-size: 22px;
	}

	.section-num {
		font-family: var(--font-mono);
		color: var(--color-accent);
		font-size: 0.85em;
		font-weight: 700;
		flex-shrink: 0;
	}

	.section-title {
		flex: 1;
	}
</style>
