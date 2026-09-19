<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { MONTH_NAMES } from '$lib/projects';

	// One year on the same rail as TimelineEntry (Education/Experience). The
	// year sits on the first row; each month with projects gets its own row,
	// labelled on the left under the year.
	let {
		year,
		count,
		months,
		last = false,
		unit = 'project',
		item
	}: {
		year: number;
		count: number;
		months: { month: number | null; items: T[] }[];
		last?: boolean;
		/** Singular noun for the count under the year. */
		unit?: string;
		item: Snippet<[T]>;
	} = $props();
</script>

{#each months as block, bi (block.month ?? 'none')}
	{@const first = bi === 0}
	{@const end = last && bi === months.length - 1}
	<div class="flex gap-3 md:gap-5">
		<div class="w-[4.5rem] md:w-28 shrink-0 text-right pt-3 md:pt-4 tabular-nums">
			{#if first}
				<div class="text-2xl md:text-4xl font-black leading-tight text-blue-400">{year}</div>
				<div class="text-xs md:text-sm font-bold text-slate-400 leading-tight">
					{count}
					{count === 1 ? unit : `${unit}s`}
				</div>
			{/if}
			{#if block.month !== null}
				<div class="{first ? 'mt-2' : ''} text-sm md:text-base font-bold text-slate-200 leading-tight">
					<span class="md:hidden">{MONTH_NAMES[block.month - 1].slice(0, 3)}</span>
					<span class="hidden md:inline">{MONTH_NAMES[block.month - 1]}</span>
				</div>
			{/if}
		</div>

		<div class="flex flex-col items-center shrink-0" aria-hidden="true">
			{#if first}
				<span class="mt-5 md:mt-6 w-3 h-3 shrink-0 rounded-full ring-4 bg-blue-400 ring-blue-400/25"></span>
			{:else}
				<span class="mt-[1.15rem] md:mt-[1.4rem] w-2 h-2 shrink-0 rounded-full bg-slate-400"></span>
			{/if}
			<span class="w-px flex-1 bg-white/15 {end ? 'opacity-0' : ''}"></span>
		</div>

		<div class="flex-1 min-w-0 flex flex-col gap-3 {end ? '' : 'pb-4 md:pb-6'}">
			{#each block.items as it, ii (ii)}
				{@render item(it)}
			{/each}
		</div>
	</div>
{/each}
