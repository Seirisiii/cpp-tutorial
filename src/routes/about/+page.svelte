<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	const members = [
		{
			name: 'Thitikorn Khamai (thi)',
			affiliation: 'Student at Computer Engineering<br>Chulalongkorn University (CP53)',
			avatarUrl: 'https://avatars.githubusercontent.com/u/121112840?v=4',
			socials: [
				{ type: 'mail' as const, href: 'mailto:thitikorn.tk2550@gmail.com' },
				{ type: 'github' as const, href: 'https://github.com/Seirisiii' },
				{ type: 'facebook' as const, href: 'https://www.facebook.com/thitikorn.kham.ai.331118' }
			]
		},
		{
			name: 'Prachya Sangkharat (iCE)',
			affiliation: "Student at Computer Science<br>King Mongkut's Institute of Technology Ladkrabang (CS28)",
			avatarUrl: 'https://avatars.githubusercontent.com/u/93990795?v=4',
			socials: [
				{ type: 'mail' as const, href: 'mailto:prachya.sangkharat@gmail.com' },
				{ type: 'github' as const, href: 'https://github.com/gbruunb' },
				{ type: 'facebook' as const, href: 'https://www.facebook.com/ice.unnameboy.gbru' }
			]
		}
	];
</script>

<svelte:head>
	<title>เกี่ยวกับเรา | C++ Tutorial</title>
	<meta name="description" content="ข้อมูลเกี่ยวกับผู้จัดทำ C++ Tutorial สำหรับค่าย สอวน. คอมพิวเตอร์" />
</svelte:head>

<div class="about-page">
	<!-- Hero -->
	<section class="hero">
		<h1 class="hero-title">เกี่ยวกับเรา</h1>
		<p class="hero-text">
			เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นสื่อการเรียนรู้ภาษา C++ สำหรับนักเรียนที่เข้าค่ายโอลิมปิกวิชาการ
			สอวน. สาขาคอมพิวเตอร์ โดยรวบรวมเนื้อหาพื้นฐานที่สำคัญ พร้อมตัวอย่างประกอบ
			เพื่อช่วยให้ผู้เรียนเข้าใจแนวคิดและสามารถนำไปประยุกต์ใช้ในการเขียนโปรแกรมได้
		</p>
	</section>

	<!-- About section -->
	<section class="content-block">
		<h2 class="section-title">เกี่ยวกับโครงการ</h2>
		<p class="section-text">
			เนื้อหาภายในเว็บไซต์เรียบเรียงตามลำดับการเรียนรู้ ตั้งแต่พื้นฐานของภาษา C++
			ไปจนถึงหัวข้อที่จำเป็นสำหรับการแก้โจทย์เชิงอัลกอริทึม
			โดยมุ่งเน้นความเข้าใจมากกว่าการท่องจำ
			และสามารถใช้เป็นเอกสารประกอบการเรียนหรือทบทวนด้วยตนเองได้
		</p>
		<p class="section-text">
			หวังว่าเว็บไซต์นี้จะเป็นประโยชน์สำหรับผู้ที่สนใจการเขียนโปรแกรม
			และเป็นอีกหนึ่งแหล่งเรียนรู้ที่ช่วยให้การเตรียมตัวสำหรับค่าย สอวน.
			เป็นเรื่องที่ง่ายและสนุกดียิ่งขึ้น
		</p>
	</section>

	<!-- Team section -->
	<section class="content-block">
		<h2 class="section-title">Our Team</h2>
		<div class="team-grid">
			{#each members as member}
				<ProfileCard
					name={member.name}
					affiliation={member.affiliation}
					avatarUrl={member.avatarUrl}
					socials={member.socials}
				/>
			{/each}
		</div>
	</section>

	<div class="back-link">
		<a href="/">← กลับหน้าหลัก</a>
	</div>
</div>

<style>
	.about-page {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 40px 24px 80px;
	}

	.hero {
		padding: 48px 40px;
		border-radius: var(--radius-xl);
		background: linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 100%);
		color: white;
		box-shadow: var(--shadow-lg);
		margin-bottom: 48px;
	}

	.hero-title {
		margin: 0 0 12px;
		font-family: var(--font-serif);
		font-size: clamp(28px, 5vw, 48px);
		font-weight: 700;
		line-height: 1.1;
	}

	.hero-text {
		margin: 0;
		color: rgba(255, 255, 255, 0.92);
		font-size: 16px;
		line-height: 1.75;
		max-width: 680px;
	}

	.content-block {
		margin-bottom: 48px;
	}

	.section-title {
		font-family: var(--font-serif);
		font-size: clamp(20px, 3vw, 28px);
		font-weight: 700;
		color: var(--color-ink);
		margin: 0 0 20px;
		padding-bottom: 12px;
		border-bottom: 2px solid var(--color-accent-soft);
	}

	.section-text {
		color: var(--color-ink-soft);
		line-height: 1.8;
		margin: 0 0 12px;
	}

	.team-grid {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	.back-link {
		margin-top: 40px;
		padding-top: 24px;
		border-top: 1px solid var(--color-line);
	}

	.back-link a {
		color: var(--color-accent);
		font-weight: 600;
		text-decoration: none;
		font-size: 15px;
		transition: color 0.15s;
	}

	.back-link a:hover {
		color: var(--color-accent-dark);
	}

	@media (max-width: 768px) {
		.about-page {
			padding-top: calc(var(--topbar-h) + 24px);
		}

		.hero {
			padding: 32px 24px;
		}
	}
</style>
