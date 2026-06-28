<script lang="ts">
	import { chapters } from '$lib/data/toc';
	import { activeSlug, fontSize } from '$lib/stores/nav';

	let { open = false, onclose }: { open?: boolean; onclose?: () => void } = $props();

	let expanded = $state<Record<number, boolean>>({});
	let query = $state('');

	// Scroll sidebar to show the active TOC link when it changes
	$effect(() => {
		const slug = $activeSlug;
		if (!slug) return;
		const el = document.querySelector<HTMLElement>('.toc-link.active');
		el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	});

	function toggle(num: number) {
		if (query.trim()) return;
		expanded[num] = !expanded[num];
	}

	// Auto-expand chapter that contains the active section
	$effect(() => {
		const slug = $activeSlug;
		if (!slug || query.trim()) return;
		for (const ch of chapters) {
			if (ch.sections.some((s) => s.slug === slug)) {
				expanded[ch.num] = true;
				break;
			}
		}
	});

	// Filtered chapters based on search query
	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return chapters;
		const result = [];
		for (const ch of chapters) {
			const chMatch = ch.title.toLowerCase().includes(q);
			const matchedSecs = ch.sections.filter((s) => s.title.toLowerCase().includes(q));
			if (chMatch || matchedSecs.length > 0) {
				result.push({ ...ch, sections: chMatch ? ch.sections : matchedSecs });
			}
		}
		return result;
	});
</script>

<nav class="sidebar" class:open aria-label="สารบัญ">
	<div class="sidebar-header">
		<a href="/" class="sidebar-brand">
			<span class="sidebar-brand-title">การเขียนโปรแกรม C++</span>
			<span class="sidebar-brand-sub">C++ Tutorial</span>
		</a>
		<div class="font-controls" role="group" aria-label="ขนาดตัวอักษร">
			<button
				class="font-btn"
				onclick={() => fontSize.update((v) => Math.max(13, v - 1))}
				aria-label="ลดขนาดตัวอักษร"
				title="ลดขนาด">A-</button
			>
			<button
				class="font-btn font-btn-reset"
				onclick={() => fontSize.set(15)}
				aria-label="รีเซ็ตขนาดตัวอักษร"
				title="ค่าเริ่มต้น">A</button
			>
			<button
				class="font-btn"
				onclick={() => fontSize.update((v) => Math.min(20, v + 1))}
				aria-label="เพิ่มขนาดตัวอักษร"
				title="เพิ่มขนาด">A+</button
			>
		</div>
	</div>

	<div class="sidebar-search">
		<input
			type="search"
			placeholder="ค้นหาหัวข้อ..."
			aria-label="ค้นหาในสารบัญ"
			bind:value={query}
		/>
	</div>

	{#if filtered.length === 0}
		<p class="search-empty">ไม่พบหัวข้อที่ค้นหา</p>
	{:else}
		<ul class="toc-list">
			{#each filtered as chapter}
				<li class="toc-chapter">
					<button
						class="toc-chapter-toggle"
						aria-expanded={query.trim() !== '' || (expanded[chapter.num] ?? false)}
						onclick={() => toggle(chapter.num)}
					>
						<span class="toc-chapter-num">{chapter.num}</span>
						<span class="toc-chapter-title">{chapter.title}</span>
						{#if !query.trim()}
							<span class="toc-chapter-arrow">▾</span>
						{/if}
					</button>
					<ul class="toc-sublist" class:open={query.trim() !== '' || expanded[chapter.num]}>
						{#each chapter.sections as section}
							<li class="toc-item">
								<a
									href="/#{section.slug}"
									class="toc-link"
									class:active={$activeSlug === section.slug}
									onclick={onclose}
								>
									<span class="toc-num">{section.num}</span>
									{section.title}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="sidebar-footer">
		<a href="/about" class="sidebar-about-link" onclick={onclose}>เกี่ยวกับเรา</a>
	</div>
</nav>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--sidebar-w);
		height: 100vh;
		background: var(--color-bg-soft);
		border-right: 1px solid var(--color-line);
		overflow-y: auto;
		z-index: 60;
		transition: transform 0.25s ease;
	}

	.sidebar::-webkit-scrollbar { width: 6px; }
	.sidebar::-webkit-scrollbar-track { background: transparent; }
	.sidebar::-webkit-scrollbar-thumb {
		background: var(--color-line);
		border-radius: 3px;
	}
	.sidebar::-webkit-scrollbar-thumb:hover { background: var(--color-ink-muted); }

	.sidebar-header {
		position: sticky;
		top: 0;
		background: var(--color-bg-soft);
		border-bottom: 1px solid var(--color-line);
		padding: 14px 16px;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.sidebar-brand {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--color-ink);
		min-width: 0;
	}

	.sidebar-brand-title {
		font-weight: 700;
		font-size: 13px;
		color: var(--color-accent-dark);
		line-height: 1.3;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sidebar-brand-sub {
		font-size: 11px;
		color: var(--color-ink-muted);
		font-family: var(--font-mono);
		margin-top: 2px;
	}

	/* Font size controls */
	.font-controls {
		display: flex;
		gap: 2px;
		flex-shrink: 0;
	}

	.font-btn {
		background: var(--color-bg);
		border: 1px solid var(--color-line);
		border-radius: 5px;
		padding: 3px 7px;
		font-size: 11px;
		font-weight: 600;
		color: var(--color-ink-soft);
		cursor: pointer;
		font-family: var(--font-mono);
		transition: all 0.15s;
		line-height: 1.4;
	}

	.font-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-dark);
		background: var(--color-accent-soft);
	}

	.font-btn-reset {
		font-size: 10px;
		color: var(--color-ink-muted);
	}

	.sidebar-search {
		padding: 10px 12px 6px;
		position: sticky;
		top: 64px;
		background: var(--color-bg-soft);
		z-index: 1;
	}

	.sidebar-search input {
		width: 100%;
		padding: 7px 10px;
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		font-family: var(--font-sans);
		font-size: 12px;
		background: var(--color-bg);
		color: var(--color-ink);
		transition: border-color 0.15s;
	}

	.sidebar-search input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px var(--color-accent-soft);
	}

	.search-empty {
		padding: 24px 20px;
		font-size: 13px;
		color: var(--color-ink-muted);
		text-align: center;
	}

	.toc-list {
		list-style: none;
		padding: 0 8px 24px;
		margin: 0;
	}

	.toc-chapter { margin: 0; }

	.toc-chapter-toggle {
		width: 100%;
		background: none;
		border: none;
		padding: 9px 10px;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 13.5px;
		color: var(--color-ink);
		text-align: left;
		border-radius: var(--radius);
		transition: background 0.15s;
		font-weight: 600;
		margin-top: 4px;
	}

	.toc-chapter-toggle:hover { background: var(--color-bg-tinted); }

	.toc-chapter-num {
		display: inline-block;
		background: var(--color-accent);
		color: white;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 11px;
		padding: 2px 7px;
		border-radius: 4px;
		min-width: 26px;
		text-align: center;
		flex-shrink: 0;
	}

	.toc-chapter-title { flex: 1; line-height: 1.4; }

	.toc-chapter-arrow {
		color: var(--color-ink-muted);
		transition: transform 0.2s;
		font-size: 12px;
	}

	.toc-chapter-toggle[aria-expanded='true'] .toc-chapter-arrow {
		transform: rotate(180deg);
	}

	.toc-sublist {
		list-style: none;
		padding: 0 0 4px;
		margin: 0;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease;
	}

	.toc-sublist.open { max-height: 2000px; }

	.toc-item { margin: 0; }

	.toc-link {
		display: block;
		padding: 5px 10px 5px 16px;
		text-decoration: none;
		color: var(--color-ink-soft);
		font-size: 12.5px;
		line-height: 1.45;
		border-radius: var(--radius);
		transition: all 0.15s;
		border-left: 3px solid transparent;
		margin-left: -3px;
	}

	.toc-link:hover {
		background: var(--color-bg-tinted);
		color: var(--color-ink);
	}

	/* Active section highlight */
	.toc-link.active {
		border-left-color: var(--color-accent);
		color: var(--color-accent-dark);
		background: var(--color-accent-soft);
		font-weight: 600;
	}

	.toc-num {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--color-ink-muted);
		margin-right: 4px;
	}

	.toc-link.active .toc-num {
		color: var(--color-accent);
	}

	.sidebar-footer {
		padding: 12px 16px 20px;
		border-top: 1px solid var(--color-line);
		margin-top: 8px;
	}

	.sidebar-about-link {
		display: block;
		padding: 8px 12px;
		font-size: 13px;
		color: var(--color-ink-muted);
		text-decoration: none;
		border-radius: var(--radius);
		transition: all 0.15s;
	}

	.sidebar-about-link:hover {
		color: var(--color-accent-dark);
		background: var(--color-accent-soft);
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
			box-shadow: var(--shadow-lg);
		}

		.sidebar.open {
			transform: translateX(0);
		}
	}
</style>
