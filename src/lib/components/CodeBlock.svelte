<script lang="ts">
	let {
		code,
		lang = 'text',
		caption = ''
	}: { code: string; lang?: string; caption?: string } = $props();

	let codeEl: HTMLElement;
	let copied = $state(false);

	$effect(() => {
		if (codeEl && typeof window !== 'undefined') {
			const prism = (window as any).Prism;
			if (prism) {
				prism.highlightElement(codeEl);
			}
		}
	});

	async function copy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div class="code-outer">
	<div class="code-block">
		<div class="code-header">
			<span class="lang-badge">{lang}</span>
			<button class="copy-btn" onclick={copy} aria-label="คัดลอกโค้ด">
				{copied ? '✓ copied' : 'คัดลอก'}
			</button>
		</div>
		<div class="code-body">
			<pre><code bind:this={codeEl} class="language-{lang}">{code}</code></pre>
		</div>
	</div>
	{#if caption}
		<p class="code-caption">{caption}</p>
	{/if}
</div>

<style>
	.code-block {
		background: linear-gradient(145deg, #111827 0%, #0f172a 100%);
		border-radius: 12px;
		margin: 0;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.04),
			0 10px 24px rgba(2, 8, 23, 0.28);
		border: 1px solid var(--color-code-border);
		overflow: hidden;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.03);
		gap: 8px;
	}

	.lang-badge {
		font-family: var(--font-mono);
		font-size: 10px;
		color: #cbd5e1;
		background: rgba(255, 255, 255, 0.08);
		padding: 2px 8px;
		border-radius: 999px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
		flex-shrink: 0;
	}

	.copy-btn {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: #cbd5e1;
		font-family: var(--font-mono);
		font-size: 10px;
		padding: 2px 10px;
		border-radius: 999px;
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: background 0.15s;
		flex-shrink: 0;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.code-body {
		padding: 18px 20px;
		overflow-x: auto;
	}

	pre {
		margin: 0;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 13.5px;
		line-height: 1.75;
		color: var(--color-code-fg);
	}

	.code-outer {
		margin: 16px 0 4px;
	}

	.code-caption {
		display: block;
		width: 100%;
		font-size: 13px;
		color: var(--color-ink-muted);
		text-align: center;
		margin: 6px 0 16px;
		font-style: italic;
	}
</style>
