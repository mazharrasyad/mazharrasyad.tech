<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import type { Project } from '$lib/types';

	let { project, index }: { project: Project; index: number } = $props();

	let expanded = $state(false);
	let gallery: HTMLDivElement | undefined = $state();

	function scroll(dir: -1 | 1) {
		gallery?.scrollBy({ left: dir * 240, behavior: 'smooth' });
	}
</script>

<div class="group/row">
	<button
		type="button"
		onclick={() => (expanded = !expanded)}
		aria-expanded={expanded}
		class="w-full flex items-center gap-4 md:gap-6 py-5 px-3 -mx-3 rounded-xl text-left transition-colors hover:bg-white/[0.04] cursor-pointer"
	>
		<span
			class="text-2xl md:text-3xl font-black tabular-nums w-10 md:w-14 shrink-0 transition-colors {expanded
				? 'text-blue-400'
				: 'text-slate-700 group-hover/row:text-blue-500/70'}"
		>
			{String(index).padStart(2, '0')}
		</span>

		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2 flex-wrap">
				<h3
					class="text-base md:text-lg font-bold truncate transition-colors {expanded
						? 'text-blue-300'
						: 'text-white group-hover/row:text-blue-300'}"
				>
					{project.title}
				</h3>
				<span class="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
					{project.category}
				</span>
				<span
					class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap {project.visibility === 'Public'
						? 'bg-emerald-500/20 text-emerald-400'
						: 'bg-rose-500/20 text-rose-400'}"
				>
					{project.visibility}
				</span>
			</div>
			<p class="text-xs text-slate-500 mt-1 truncate">{project.tools}</p>
		</div>

		{#if project.updated}
			<span class="hidden sm:block text-xs text-slate-500 shrink-0">{project.updated}</span>
		{/if}

		<span
			class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all {expanded
				? 'bg-blue-500/20 text-blue-400 rotate-90'
				: 'bg-white/5 text-slate-500 group-hover/row:bg-white/10 group-hover/row:text-slate-300'}"
		>
			<Icon name="chevron-right" class="w-3.5 h-3.5" />
		</span>
	</button>

	{#if expanded}
		<div transition:slide={{ duration: 250 }} class="pb-6 pl-14 md:pl-[4.75rem] pr-3">
			{#if project.images.length > 0}
				<div class="relative group/gallery mb-4">
					<div bind:this={gallery} class="flex overflow-x-auto gap-3 snap-x scroll-smooth hide-scrollbar">
						{#each project.images as src (src)}
							<img {src} class="snap-center h-44 md:h-52 rounded-xl border border-white/10 shadow-lg" alt={project.title} loading="lazy" />
						{/each}
					</div>
					{#if project.images.length > 1}
						<button
							onclick={() => scroll(-1)}
							aria-label="Scroll left"
							class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center justify-center"
						>
							<Icon name="chevron-left" class="w-3 h-3" />
						</button>
						<button
							onclick={() => scroll(1)}
							aria-label="Scroll right"
							class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center justify-center"
						>
							<Icon name="chevron-right" class="w-3 h-3" />
						</button>
					{/if}
				</div>
			{/if}

			<p class="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
				{project.description}
			</p>

			<a
				href={project.sourceUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="link-btn inline-flex w-auto px-5"
			>
				<span>View Source</span>
				<Icon name="external-link" class="w-3.5 h-3.5" />
			</a>
		</div>
	{/if}
</div>
