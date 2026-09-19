<script lang="ts">
	import ProjectRow from './ProjectRow.svelte';
	import type { Category } from '$lib/projects';

	let { category }: { category: Category } = $props();
</script>

<div class="flex flex-col gap-4 md:gap-5">
	<p class="text-base text-slate-300 max-w-2xl">{category.description}</p>

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
	{:else}
		<p class="text-slate-400 italic text-base">Nothing recorded in {category.name} yet.</p>
	{/if}
</div>
