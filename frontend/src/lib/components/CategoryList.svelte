<script lang="ts">
	import Icon from './Icon.svelte';
	import ProjectRow from './ProjectRow.svelte';
	import type { Category } from '$lib/projects';

	let { category }: { category: Category } = $props();
</script>

<div class="flex flex-col gap-4 md:gap-5">
	<p class="text-base text-slate-300 max-w-2xl">{category.description}</p>

	{#each category.publications as pub (pub.url)}
		<div class="card-glass rounded-2xl p-4 md:p-5">
			<div class="flex items-center gap-2 mb-1.5 flex-wrap">
				<span class="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400">
					Journal
				</span>
				<span class="bg-white/5 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold border border-white/10">
					{pub.year}
				</span>
				{#if pub.citations !== null}
					<span class="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300">
						{pub.citations}
						{pub.citations === 1 ? 'Citation' : 'Citations'}
					</span>
				{/if}
			</div>
			<a
				href={pub.url}
				target="_blank"
				rel="noopener noreferrer"
				class="group/pub inline-flex items-start gap-1.5 text-lg md:text-xl font-bold text-white leading-snug hover:text-blue-300 transition-colors"
			>
				<span>{pub.title}</span>
				<Icon
					name="external-link"
					class="w-3 h-3 mt-2 shrink-0 text-slate-400 group-hover/pub:text-blue-400 transition-colors"
				/>
			</a>
			<p class="text-sm text-slate-300 mt-1">{pub.authors}</p>
			<p class="text-sm text-slate-400 italic mt-0.5">{pub.venue}</p>
		</div>
	{/each}

	{#if category.projects.length > 0}
		<span
			class="w-fit text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300"
		>
			{category.projects.length}
			{category.projects.length === 1 ? 'Project' : 'Projects'}
		</span>
		<div class="flex flex-col gap-3">
			{#each category.projects as project, i (project.title)}
				<ProjectRow {project} year={project.year} index={i + 1} />
			{/each}
		</div>
	{:else if category.publications.length === 0}
		<p class="text-slate-400 italic text-base">Nothing recorded in {category.name} yet.</p>
	{/if}
</div>
