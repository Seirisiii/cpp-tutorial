<script lang="ts">
	import type { Snippet } from 'svelte';

	type CalloutType = 'definition' | 'warning' | 'tip' | 'note' | 'example' | 'practice' | 'summary';

	const defaultLabels: Record<CalloutType, string> = {
		definition: 'นิยาม',
		warning: 'ข้อควรระวัง',
		tip: 'คำแนะนำ',
		note: 'หมายเหตุ',
		example: 'ตัวอย่าง',
		practice: 'ฝึกหัด',
		summary: 'สรุป'
	};

	let {
		type,
		label,
		children
	}: { type: CalloutType; label?: string; children: Snippet } = $props();

	const displayLabel = $derived(label ?? defaultLabels[type]);
</script>

<div class="callout {type}">
	<span class="callout-label">{displayLabel}</span>
	<div class="callout-body">
		{@render children()}
	</div>
</div>

<style>
	.callout {
		margin: 16px 0;
		padding: 14px 18px;
		border-radius: var(--radius);
		border-left: 4px solid;
		font-size: 14.5px;
		line-height: 1.7;
		display: flex;
		gap: 14px;
		align-items: flex-start;
	}

	.callout-label {
		flex-shrink: 0;
		font-weight: 700;
		font-size: 13px;
		padding: 3px 10px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-top: 1px;
	}

	.callout-body { flex: 1; }

	/* definition */
	.callout.definition {
		background: var(--color-def-bg);
		border-left-color: var(--color-def-border);
		color: var(--color-def-ink);
	}
	.callout.definition .callout-label {
		color: var(--color-def-ink);
		background: rgba(255, 255, 255, 0.7);
	}

	/* warning */
	.callout.warning {
		background: var(--color-warning-bg);
		border-left-color: var(--color-warning-border);
		color: var(--color-warning-ink);
	}
	.callout.warning .callout-label {
		color: var(--color-warning-ink);
		background: rgba(255, 255, 255, 0.7);
	}

	/* tip */
	.callout.tip {
		background: var(--color-tip-bg);
		border-left-color: var(--color-tip-border);
		color: var(--color-tip-ink);
	}
	.callout.tip .callout-label {
		color: var(--color-tip-ink);
		background: rgba(255, 255, 255, 0.7);
	}

	/* note */
	.callout.note {
		background: var(--color-note-bg);
		border-left-color: var(--color-note-border);
		color: var(--color-note-ink);
	}
	.callout.note .callout-label {
		color: var(--color-note-ink);
		background: rgba(255, 255, 255, 0.7);
	}

	/* example / summary / practice */
	.callout.example,
	.callout.summary,
	.callout.practice {
		background: var(--color-example-bg);
		border-left-color: var(--color-example-border);
		color: var(--color-example-ink);
	}
	.callout.example .callout-label,
	.callout.summary .callout-label,
	.callout.practice .callout-label {
		color: var(--color-example-ink);
		background: rgba(255, 255, 255, 0.7);
	}

	@media (max-width: 768px) {
		.callout {
			flex-direction: column;
			gap: 8px;
			padding: 12px 14px;
		}

		.callout-label {
			align-self: flex-start;
		}
	}
</style>
