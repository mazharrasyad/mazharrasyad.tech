<script lang="ts">
	import type { Snippet } from 'svelte';
	import { parsePeriod } from '$lib/timeline';

	let {
		period,
		accent,
		last = false,
		children
	}: { period: string; accent: 'emerald' | 'blue'; last?: boolean; children: Snippet } = $props();

	const parts = $derived(parsePeriod(period));

	const colors = {
		emerald: { year: 'text-emerald-400', dot: 'bg-emerald-400 ring-emerald-400/25' },
		blue: { year: 'text-blue-400', dot: 'bg-blue-400 ring-blue-400/25' }
	};
	const c = $derived(colors[accent]);
</script>

<div class="flex gap-3 md:gap-5">
	<div class="w-[4.5rem] md:w-28 shrink-0 text-right pt-3 md:pt-4 tabular-nums">
		{#if parts.month}
			<div class="text-sm font-bold text-slate-300 leading-none">{parts.month}</div>
		{/if}
		<div class="text-2xl md:text-4xl font-black leading-tight {c.year}">{parts.year}</div>
		{#if parts.end}
			<div class="text-xs md:text-sm text-slate-400 leading-tight">→ {parts.end}</div>
		{/if}
	</div>

	<div class="flex flex-col items-center shrink-0" aria-hidden="true">
		<span class="mt-5 md:mt-6 w-3 h-3 rounded-full ring-4 {c.dot}"></span>
		<span class="w-px flex-1 bg-white/15 {last ? 'opacity-0' : ''}"></span>
	</div>

	<div class="flex-1 min-w-0 {last ? '' : 'pb-4 md:pb-6'}">
		<div class="card-glass rounded-2xl p-4 md:p-5">
			{@render children()}
		</div>
	</div>
</div>
