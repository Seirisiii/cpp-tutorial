<script lang="ts">
	let { onMenuClick }: { onMenuClick: () => void } = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<header class="topbar">
	<button class="topbar-menu" onclick={onMenuClick} aria-label="เมนู">
		<span></span><span></span><span></span>
	</button>
	<a href="/" class="topbar-title">การเขียนโปรแกรม C++</a>
	<button class="topbar-totop" onclick={scrollToTop} aria-label="กลับขึ้นบน">↑</button>
</header>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 50;
		height: var(--topbar-h);
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--color-line);
		display: none;
		align-items: center;
		padding: 0 16px;
		gap: 12px;
	}

	.topbar-menu,
	.topbar-totop {
		background: none;
		border: 1px solid var(--color-line);
		border-radius: 8px;
		width: 36px;
		height: 36px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		cursor: pointer;
		color: var(--color-ink);
		font-size: 18px;
		flex-shrink: 0;
	}

	.topbar-menu span {
		width: 16px;
		height: 2px;
		background: var(--color-ink);
		border-radius: 1px;
	}

	.topbar-title {
		flex: 1;
		font-weight: 600;
		font-size: 16px;
		color: var(--color-ink);
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 768px) {
		.topbar {
			display: flex;
		}
	}
</style>
