<script lang="ts">
	import Icon from './Icon.svelte';
	import type { Project } from '$lib/types';

	let { project, index }: { project: Project; index: number } = $props();

	let gallery: HTMLDivElement | undefined = $state();

	function scroll(dir: -1 | 1) {
		gallery?.scrollBy({ left: dir * 200, behavior: 'smooth' });
	}
</script>

<div class="card-glass rounded-2xl overflow-hidden flex flex-col">
	<div class="p-6 pb-0 flex justify-between items-start mb-4">
		<h3 class="text-lg font-bold text-white">{index}. {project.title}</h3>
		<span class="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider whitespace-nowrap ml-2">
			{project.category}
		</span>
	</div>

	{#if project.images.length > 0}
		<div class="relative group">
			<div bind:this={gallery} class="px-6 flex overflow-x-auto gap-3 snap-x scroll-smooth hide-scrollbar mb-4">
				{#each project.images as src (src)}
					<img {src} class="snap-center h-40 rounded-xl border border-white/10 shadow-lg" alt={project.title} loading="lazy" />
				{/each}
			</div>
			{#if project.images.length > 1}
				<button
					onclick={() => scroll(-1)}
					aria-label="Scroll left"
					class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
				>
					<Icon name="chevron-left" class="w-3 h-3" />
				</button>
				<button
					onclick={() => scroll(1)}
					aria-label="Scroll right"
					class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
				>
					<Icon name="chevron-right" class="w-3 h-3" />
				</button>
			{/if}
		</div>
	{/if}

	<p class="px-6 text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
		{project.description}
	</p>

	<div class="p-6 pt-4 border-t border-white/5 bg-white/2 mt-auto">
		<div class="flex justify-between items-center mb-4">
			<div class="flex flex-col">
				<span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Tools</span>
				<span class="text-xs text-slate-300 font-semibold">{project.tools}</span>
			</div>
			{#if project.updated}
				<div class="flex flex-col text-right">
					<span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Updated</span>
					<span class="text-xs text-slate-300">{project.updated}</span>
				</div>
			{/if}
		</div>
		<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" class="link-btn w-full">
			<span>View Source</span>
			<span
				class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-1 {project.visibility === 'Public'
					? 'bg-emerald-500/20 text-emerald-400'
					: 'bg-rose-500/20 text-rose-400'}"
			>
				{project.visibility}
			</span>
			<Icon name="github" class="w-3.5 h-3.5" />
		</a>
	</div>
</div>
