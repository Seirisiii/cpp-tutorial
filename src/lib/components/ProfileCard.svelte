<script lang="ts">
	interface Social {
		type: 'mail' | 'github' | 'facebook';
		href: string;
	}

	let {
		name,
		affiliation,
		avatarUrl,
		socials = []
	}: {
		name: string;
		affiliation: string;
		avatarUrl?: string;
		socials?: Social[];
	} = $props();

	const socialMeta: Record<Social['type'], { label: string; color: string; logo: string }> = {
		mail: { label: 'Mail', color: '#6D4AFF', logo: 'protonmail' },
		github: { label: 'GitHub', color: '#181717', logo: 'github' },
		facebook: { label: 'Facebook', color: '#1877F2', logo: 'facebook' }
	};
</script>

<article class="profile-card">
	<div class="profile-header">
		<div class="avatar">
			{#if avatarUrl}
				<img src={avatarUrl} alt="{name}'s avatar" />
			{:else}
				<span class="avatar-placeholder">{name[0]}</span>
			{/if}
		</div>
		<div class="profile-info">
			<h3 class="profile-name">{name}</h3>
			<p class="profile-affiliation">{@html affiliation}</p>
		</div>
	</div>
	{#if socials.length > 0}
		<div class="socials">
			{#each socials as social}
				{@const meta = socialMeta[social.type]}
				<a
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					class="social-badge"
					style="--badge-color: {meta.color}"
					aria-label={meta.label}
				>
					{meta.label}
				</a>
			{/each}
		</div>
	{/if}
</article>

<style>
	.profile-card {
		background: var(--color-bg);
		border: 1px solid var(--color-line);
		border-radius: var(--radius-xl);
		padding: 28px;
		box-shadow: var(--shadow-md);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.profile-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.profile-header {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-bottom: 18px;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 16px;
		overflow: hidden;
		flex-shrink: 0;
		background: var(--color-accent-soft);
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 28px;
		color: var(--color-accent);
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.profile-name {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
		color: var(--color-ink);
	}

	.profile-affiliation {
		margin: 0;
		font-size: 13px;
		color: var(--color-ink-soft);
		line-height: 1.5;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.social-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		text-decoration: none;
		background: var(--badge-color);
		color: white;
		transition: opacity 0.15s, transform 0.15s;
		letter-spacing: 0.02em;
	}

	.social-badge:hover {
		opacity: 0.85;
		transform: translateY(-1px);
	}
</style>
