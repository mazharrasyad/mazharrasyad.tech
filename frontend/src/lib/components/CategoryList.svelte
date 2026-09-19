<script lang="ts">
	import ProjectRow from './ProjectRow.svelte';
	import YearGroup from './YearGroup.svelte';
	import type { Category } from '$lib/projects';

	let { category }: { category: Category } = $props();

	// Projects arrive newest year first; number them continuously across years.
	const groups = $derived.by(() => {
		const byYear: { year: number; items: { project: Category['projects'][number]; index: number }[] }[] = [];
		category.projects.forEach((project, i) => {
			let group = byYear[byYear.length - 1];
			if (!group || group.year !== project.year) {
				group = { year: project.year, items: [] };
				byYear.push(group);
			}
			group.items.push({ project, index: i + 1 });
		});
		return byYear;
	});
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
		<div class="mt-2">
			{#each groups as group, gi (group.year)}
				<YearGroup year={group.year} count={group.items.length} last={gi === groups.length - 1}>
					{#each group.items as { project, index } (project.title)}
						<ProjectRow {project} {index} />
					{/each}
				</YearGroup>
			{/each}
		</div>
	{:else}
		<p class="text-slate-400 italic text-base">Nothing recorded in {category.name} yet.</p>
	{/if}
</div>
