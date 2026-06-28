<script lang="ts">
	let { input, output }: { input: string; output: string } = $props();
</script>

<div class="io-example">
	<div class="io-box">
		<div class="io-box-label">Input</div>
		<pre>{input}</pre>
	</div>
	<div class="io-box">
		<div class="io-box-label">Output</div>
		<pre>{output}</pre>
	</div>
</div>

<style>
	.io-example {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin: 16px 0;
	}

	.io-box {
		background: var(--color-bg-soft);
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.io-box-label {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 8px 14px;
		background: var(--color-bg-tinted);
		border-bottom: 1px solid var(--color-line);
		color: var(--color-ink-muted);
	}

	pre {
		margin: 0;
		padding: 12px 14px;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.6;
		color: var(--color-ink);
		white-space: pre-wrap;
	}

	@media (max-width: 640px) {
		.io-example {
			grid-template-columns: 1fr;
		}
	}
</style>
