<script lang="ts">
	let progress = $state(0);

	function updateProgress() {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
	}
</script>

<svelte:window onscroll={updateProgress} />
<div class="progress-bar" style="width: {progress}%"></div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--color-accent), var(--color-accent-dark));
		z-index: 100;
		transition: width 0.1s linear;
		pointer-events: none;
	}
</style>
