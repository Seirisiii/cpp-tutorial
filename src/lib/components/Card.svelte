<script lang="ts">
  let { title, description }: { title: string; description: string } = $props();
</script>

<div class="card">
  <h2>{title}</h2>
  <p>{description}</p>
</div>

<style>
  .card {
    background: #1e1e2e;
    border: 1px solid #313244;
    border-radius: 12px;
    padding: 1.5rem;
    color: #cdd6f4;
  }
  h2 {
    font-size: 1.25rem;
    color: #89b4fa;
    margin-bottom: 0.5rem;
  }
  p {
    color: #a6adc8;
    line-height: 1.6;
  }
</style>
