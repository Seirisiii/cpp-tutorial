<script lang="ts">
  let { title, subtitle }: { title: string; subtitle: string } = $props();
</script>

<section class="hero">
  <h1>{title}</h1>
  <p>{subtitle}</p>
  <a href="#about" class="btn">Get Started</a>
</section>

<style>
  .hero {
    text-align: center;
    padding: 5rem 2rem;
    background: #181825;
    color: #cdd6f4;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #cba6f7;
  }
  p {
    font-size: 1.2rem;
    color: #a6adc8;
    margin-bottom: 2rem;
  }
  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #cba6f7;
    color: #1e1e2e;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
  }
  .btn:hover {
    background: #b4befe;
  }
</style>
