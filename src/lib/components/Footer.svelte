<script lang="ts">
	import { onMount } from 'svelte';

	let year = $state(new Date().getFullYear());
	onMount(() => {
		year = new Date().getFullYear();
	});
</script>

<footer class="footer">
	<p>© {year} C++ Tutorial — เนื้อหาสำหรับใช้อบรมค่ายโอลิมปิกวิชาการ สอวน.คอมพิวเตอร์​ ค่าย 1</p>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-line);
		padding: 32px 24px;
		text-align: center;
		color: var(--color-ink-muted);
		font-size: 13px;
		background: var(--color-bg-soft);
		margin-top: 60px;
	}

	.footer p { margin: 4px 0; }

	.footer-meta {
		font-size: 12px;
		font-style: italic;
	}
</style>
