<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		year,
		count,
		last = false,
		children
	}: { year: number; count: number; last?: boolean; children: Snippet } = $props();
</script>

<!-- Same rail as TimelineEntry (Education/Experience): year on the left, dot + line, content on the right. -->
<div class="flex gap-3 md:gap-5">
	<div class="w-[4.5rem] md:w-28 shrink-0 text-right pt-3 md:pt-4 tabular-nums">
		<div class="text-2xl md:text-4xl font-black leading-tight text-blue-400">{year}</div>
		<div class="text-xs md:text-sm font-bold text-slate-300 leading-tight">
			{count}
			{count === 1 ? 'project' : 'projects'}
		</div>
	</div>

	<div class="flex flex-col items-center shrink-0" aria-hidden="true">
		<span class="mt-5 md:mt-6 w-3 h-3 shrink-0 rounded-full ring-4 bg-blue-400 ring-blue-400/25"></span>
		<span class="w-px flex-1 bg-white/15 {last ? 'opacity-0' : ''}"></span>
	</div>

	<div class="flex-1 min-w-0 flex flex-col gap-3 {last ? '' : 'pb-4 md:pb-6'}">
		{@render children()}
	</div>
</div>
