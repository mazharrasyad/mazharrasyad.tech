<script lang="ts">
	import Icon from './Icon.svelte';
	import type { Project } from '$lib/types';

	let {
		project,
		index,
		year,
		digits = 2
	}: { project: Project; index: number; year?: number; digits?: number } = $props();

	let gallery: HTMLDivElement | undefined = $state();

	function scroll(dir: -1 | 1) {
		gallery?.scrollBy({ left: dir * 240, behavior: 'smooth' });
	}
</script>

<div class="card-glass rounded-2xl p-4 md:p-5 [content-visibility:auto] [contain-intrinsic-size:auto_180px]">
	<div class="flex items-start gap-4 md:gap-6">
		<span class="text-2xl md:text-3xl font-black tabular-nums w-10 md:w-14 shrink-0 text-slate-500">
			{String(index).padStart(digits, '0')}
		</span>

		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2 flex-wrap">
				<h3 class="text-lg md:text-xl font-bold text-white leading-snug">
					{project.title}
				</h3>
				{#if year}
					<span class="bg-white/5 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap border border-white/10">
						{year}
					</span>
				{/if}
				<span class="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
					{project.category}
				</span>
				{#if project.updated}
					<span class="text-sm text-slate-300">{project.updated}</span>
				{/if}
			</div>
			<p class="text-sm text-slate-300 mt-1">{project.tools}</p>

			{#if project.images.length > 0}
				<div class="relative group/gallery mt-3 mb-3">
					<div bind:this={gallery} class="flex overflow-x-auto gap-3 snap-x scroll-smooth hide-scrollbar">
						{#each project.images as src, i (src + '-' + i)}
							<img
								{src}
								width="320"
								height="208"
								class="snap-center h-44 md:h-52 w-auto rounded-xl border border-white/10 shadow-lg"
								alt={project.title}
								loading="lazy"
								decoding="async"
							/>
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

			<p class="text-slate-300 text-base leading-relaxed mt-2 max-w-2xl">
				{project.description}
			</p>

			<div class="flex flex-wrap gap-3 mt-4">
				{#if project.websiteUrl}
					<a
						href={project.websiteUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="link-btn inline-flex w-auto px-5"
					>
						<span>Visit Website</span>
						<Icon name="external-link" class="w-3.5 h-3.5" />
					</a>
				{/if}
				{#if project.visibility === 'Public'}
					<a
						href={project.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="link-btn inline-flex w-auto px-5"
					>
						<span>View Source</span>
						<span
							class="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400"
						>
							Public
						</span>
						<Icon name="external-link" class="w-3.5 h-3.5" />
					</a>
				{:else}
					<button
						type="button"
						disabled
						title="Source code is private"
						class="link-btn inline-flex w-auto px-5 opacity-60 cursor-not-allowed hover:transform-none!"
					>
						<span>View Source</span>
						<span
							class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400"
						>
							<Icon name="lock" class="w-3 h-3" />
							Private
						</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
