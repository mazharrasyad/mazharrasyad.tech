<script lang="ts">
	import ProjectRow from './ProjectRow.svelte';
	import YearGroup from './YearGroup.svelte';
	import { MONTH_NAMES, type Category } from '$lib/projects';

	let { category }: { category: Category } = $props();

	type Item = { project: Category['projects'][number]; index: number };
	type MonthBlock = { month: number | null; items: Item[] };

	// Projects arrive sorted newest first (year, then month); number them
	// continuously and bucket them year -> month.
	const groups = $derived.by(() => {
		const byYear: { year: number; count: number; months: MonthBlock[] }[] = [];
		category.projects.forEach((project, i) => {
			let group = byYear[byYear.length - 1];
			if (!group || group.year !== project.year) {
				group = { year: project.year, count: 0, months: [] };
				byYear.push(group);
			}
			let block = group.months[group.months.length - 1];
			if (!block || block.month !== project.month) {
				block = { month: project.month, items: [] };
				group.months.push(block);
			}
			block.items.push({ project, index: i + 1 });
			group.count += 1;
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
				<YearGroup year={group.year} count={group.count} last={gi === groups.length - 1}>
					{#each group.months as block (block.month ?? 'none')}
						<!-- Month labels only where the year has at least one dated project. -->
						{#if group.months.length > 1 || block.month !== null}
							<div
								class="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-300"
							>
								{block.month ? MONTH_NAMES[block.month - 1] : 'Undated'}
								<span class="h-px flex-1 bg-white/10"></span>
							</div>
						{/if}
						{#each block.items as { project, index } (project.title)}
							<ProjectRow {project} {index} />
						{/each}
					{/each}
				</YearGroup>
			{/each}
		</div>
	{:else}
		<p class="text-slate-400 italic text-base">Nothing recorded in {category.name} yet.</p>
	{/if}
</div>
