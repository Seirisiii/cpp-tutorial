<script lang="ts">
	let { num, title }: { num: number; title: string } = $props();
</script>

<section class="chapter-divider" id="chapter-{num}">
	<div class="chapter-divider-inner">
		<div class="chapter-num">บทที่ {num}</div>
		<h2 class="chapter-title">{title}</h2>
	</div>
</section>

<style>
	.chapter-divider {
		padding: 48px 24px 16px;
		text-align: center;
		margin: 24px 0 12px;
		scroll-margin-top: 16px;
	}

	.chapter-divider-inner {
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.chapter-num {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}

	.chapter-title {
		font-family: var(--font-serif);
		font-size: clamp(28px, 4vw, 40px);
		font-weight: 700;
		color: var(--color-ink);
		margin: 0;
		line-height: 1.2;
	}

	@media (max-width: 768px) {
		.chapter-divider {
			padding: 60px 16px 40px;
			margin: 24px 0;
		}
	}
</style>
