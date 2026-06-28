<script lang="ts">
	import './layout.css';
	import Topbar from '$lib/components/Topbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fontSize } from '$lib/stores/nav';
	import { onMount } from 'svelte';

	let { children } = $props();
	let sidebarOpen = $state(false);

	// Apply font size as CSS variable on :root
	$effect(() => {
		document.documentElement.style.setProperty('--font-size-base', `${$fontSize}px`);
	});

	onMount(() => {
		// Load saved font size
		const saved = localStorage.getItem('cppTutFontSize');
		if (saved) {
			const num = Number(saved);
			if (num >= 13 && num <= 20) fontSize.set(num);
		}
		// Persist changes
		return fontSize.subscribe((v) => {
			localStorage.setItem('cppTutFontSize', String(v));
		});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+Thai:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Topbar onMenuClick={() => (sidebarOpen = !sidebarOpen)} />

<div
	class="sidebar-overlay"
	class:active={sidebarOpen}
	onclick={() => (sidebarOpen = false)}
	onkeydown={() => (sidebarOpen = false)}
	role="presentation"
></div>

<Sidebar open={sidebarOpen} onclose={() => (sidebarOpen = false)} />

<main class="main">
	{@render children()}
	<Footer />
</main>

<style>
	.sidebar-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 55;
		backdrop-filter: blur(2px);
	}

	.sidebar-overlay.active {
		display: block;
	}

	.main {
		margin-left: var(--sidebar-w);
		min-height: 100vh;
	}

	@media (max-width: 768px) {
		.main {
			margin-left: 0;
		}
	}
</style>
