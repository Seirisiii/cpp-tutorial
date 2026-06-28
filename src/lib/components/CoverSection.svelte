<script lang="ts">
	import { chapters } from '$lib/data/toc';
</script>

<section class="cover" id="cover">
	<div class="cover-inner">
		<h1 class="cover-title">การเขียนโปรแกรม C++</h1>
		<p class="cover-subtitle">C++ Tutorial</p>
		<p class="cover-meta">เนื้อหาสำหรับใช้อบรมค่ายโอลิมปิกวิชาการ สอวน.คอมพิวเตอร์ ค่าย 1</p>

		<div class="cover-actions">
			<a href="#chapter-1" class="btn btn-primary">เริ่มอ่าน</a>
			<a href="/about" class="btn btn-secondary">เกี่ยวกับเรา</a>
		</div>

		<div class="cover-toc-preview">
			{#each chapters as ch}
				<a href="#{ch.sections[0].slug}" class="cover-chip">
					<span class="chip-num">{ch.num}</span>
					{ch.title}
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.cover {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 24px;
		background:
			radial-gradient(circle at 20% 20%, var(--color-accent-soft) 0, transparent 50%),
			radial-gradient(circle at 80% 80%, #f0f9ff 0, transparent 50%),
			var(--color-bg);
		position: relative;
		overflow: hidden;
	}

	.cover::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px),
			linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px);
		background-size: 40px 40px;
		opacity: 0.4;
		pointer-events: none;
	}

	.cover-inner {
		max-width: 720px;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.cover-title {
		font-family: var(--font-serif);
		font-size: clamp(38px, 6vw, 64px);
		font-weight: 700;
		color: var(--color-ink);
		margin: 0 0 8px;
		line-height: 1.15;
	}

	.cover-subtitle {
		font-family: var(--font-mono);
		font-size: clamp(18px, 2.5vw, 24px);
		color: var(--color-accent);
		margin: 0 0 16px;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.cover-meta {
		font-size: 15px;
		color: var(--color-ink-soft);
		margin: 0 0 4px;
	}

	.cover-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		margin: 28px 0 28px;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-block;
		padding: 12px 28px;
		border-radius: var(--radius);
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.15s;
		border: 1px solid transparent;
	}

	.btn-primary {
		background: var(--color-accent);
		color: white;
		box-shadow: var(--shadow-md);
	}

	.btn-primary:hover {
		background: var(--color-accent-dark);
		transform: translateY(-1px);
		box-shadow: var(--shadow-lg);
	}

	.btn-secondary {
		background: var(--color-bg);
		color: var(--color-ink);
		border-color: var(--color-line);
	}

	.btn-secondary:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-dark);
	}

	.cover-toc-preview {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		max-width: 640px;
		margin: 0 auto;
	}

	.cover-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--color-bg);
		border: 1px solid var(--color-line);
		color: var(--color-ink-soft);
		padding: 8px 14px;
		border-radius: 999px;
		font-size: 13px;
		text-decoration: none;
		transition: all 0.15s;
		box-shadow: var(--shadow-sm);
	}

	.cover-chip:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-dark);
		transform: translateY(-1px);
	}

	.chip-num {
		background: var(--color-accent-soft);
		color: var(--color-accent-dark);
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 11px;
		padding: 2px 6px;
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.cover {
			padding-top: calc(var(--topbar-h) + 40px);
		}

		.cover-toc-preview {
			flex-direction: column;
			align-items: stretch;
		}

		.cover-chip {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.cover-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.btn {
			text-align: center;
		}
	}
</style>
