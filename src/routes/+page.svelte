<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Card from '$lib/components/Card.svelte';

  const cards = [
    { title: 'SvelteKit', description: 'Full-stack framework บน Svelte รองรับ SSR, SSG และ SPA' },
    { title: 'Component-based', description: 'แยก UI ออกเป็น component เล็กๆ แล้วนำมาประกอบกัน' },
    { title: 'GitHub Pages', description: 'Deploy ด้วย adapter-static ได้ฟรีบน GitHub Pages' },
  ];
</script>

<Navbar />
<Hero title="Hello, SvelteKit!" subtitle="ตัวอย่าง component-based homepage" />

<section id="about" class="cards">
  {#each cards as card}
    <Card title={card.title} description={card.description} />
  {/each}
</section>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 3rem 2rem;
    background: #181825;
  }
</style>
