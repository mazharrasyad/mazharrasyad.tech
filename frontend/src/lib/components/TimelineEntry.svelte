<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { formatDuration, parsePeriod } from '$lib/timeline';

	let {
		period,
		accent,
		last = false,
		currentLabel,
		children
	}: {
		period: string;
		accent: 'emerald' | 'blue';
		last?: boolean;
		/** Badge text shown when the period is still running ("Present"). */
		currentLabel: string;
		children: Snippet;
	} = $props();

	const current = $derived(/present\s*$/i.test(period));

	const parts = $derived(parsePeriod(period));

	// Prerendered with the build date; refreshed in the browser so an ongoing
	// role's length doesn't go stale between deploys.
	let now = $state(new Date());
	onMount(() => (now = new Date()));
	const duration = $derived(formatDuration(period, now));

	const colors = {
		emerald: {
			year: 'text-emerald-400',
			dot: 'bg-emerald-400 ring-emerald-400/25',
			card: 'bg-emerald-500/15! border-emerald-400/60! shadow-lg shadow-emerald-500/10',
			badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
		},
		blue: {
			year: 'text-blue-400',
			dot: 'bg-blue-400 ring-blue-400/25',
			card: 'bg-blue-500/15! border-blue-400/60! shadow-lg shadow-blue-500/10',
			badge: 'bg-blue-500/20 border-blue-500/40 text-blue-300'
		}
	};
	const c = $derived(colors[accent]);

	// Finished periods go neutral so the ones still running stand out.
	const yearColor = $derived(current ? c.year : 'text-slate-400');
	const dotColor = $derived(current ? c.dot : 'bg-slate-500 ring-slate-500/25');
</script>

<div class="flex gap-3 md:gap-5">
	<div class="w-[4.5rem] md:w-28 shrink-0 text-right pt-3 md:pt-4 tabular-nums">
		{#if parts.month}
			<div class="text-sm font-bold text-slate-300 leading-none">{parts.month}</div>
		{/if}
		<div class="text-2xl md:text-4xl font-black leading-tight {yearColor}">{parts.year}</div>
		{#if parts.end}
			<div class="text-xs md:text-sm text-slate-400 leading-tight">→ {parts.end}</div>
		{/if}
		{#if duration}
			<div class="mt-1.5 text-xs md:text-sm font-bold leading-tight {yearColor}">{duration}</div>
		{/if}
	</div>

	<div class="flex flex-col items-center shrink-0" aria-hidden="true">
		<span class="relative mt-5 md:mt-6 w-3 h-3 shrink-0">
			{#if current}
				<span class="absolute inset-0 rounded-full animate-ping {c.dot.split(' ')[0]} opacity-60"></span>
			{/if}
			<span class="relative block w-3 h-3 rounded-full ring-4 {dotColor}"></span>
		</span>
		<span class="w-px flex-1 bg-white/15 {last ? 'opacity-0' : ''}"></span>
	</div>

	<div class="flex-1 min-w-0 {last ? '' : 'pb-4 md:pb-6'}">
		<div class="card-glass rounded-2xl p-4 md:p-5 {current ? c.card : ''}">
			{#if current}
				<span
					class="inline-flex items-center gap-1.5 mb-2 px-2.5 py-0.5 rounded-full border text-xs font-black uppercase tracking-wider {c.badge}"
				>
					<span class="w-1.5 h-1.5 rounded-full animate-pulse {c.dot.split(' ')[0]}"></span>
					{currentLabel}
				</span>
			{/if}
			{@render children()}
		</div>
	</div>
</div>
