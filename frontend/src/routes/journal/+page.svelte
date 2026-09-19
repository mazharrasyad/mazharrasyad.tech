<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import YearGroup from '$lib/components/YearGroup.svelte';
	import scholarData from '$lib/data/scholar.json';
	import type { Publication, ScholarData } from '$lib/types';

	const scholar = scholarData as ScholarData;
	const publications = [...scholar.publications].sort((a, b) => b.year - a.year);

	// Newest year first; a paper only carries a year, so each year is one row.
	const byYear = $derived.by(() => {
		const groups: { year: number; items: Publication[] }[] = [];
		for (const pub of publications) {
			const last = groups[groups.length - 1];
			if (last && last.year === pub.year) last.items.push(pub);
			else groups.push({ year: pub.year, items: [pub] });
		}
		return groups;
	});

	const stats = [
		{ label: 'Publications', value: publications.length },
		{ label: 'Citations', value: scholar.citations },
		{ label: 'h-index', value: scholar.hIndex },
		{ label: 'i10-index', value: scholar.i10Index }
	];

	const title = 'Journal - Muhammad Azhar Rasyad';
	const description = `${publications.length} journal publications by Muhammad Azhar Rasyad on data modeling, enterprise architecture, blockchain, and web development.`;
	const url = 'https://mazharrasyad.tech/journal';
	const image = 'https://mazharrasyad.tech/logo.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Muhammad Azhar Rasyad" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<div class="min-h-[calc(100dvh-3.5rem)] text-white flex flex-col p-4 md:p-8 w-full">
	<main class="max-w-4xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-6">Journal</h1>

		<dl class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
			{#each stats as s (s.label)}
				<div class="card-glass rounded-2xl p-4 text-center">
					<dd class="text-3xl font-black text-sky-400 tabular-nums">{s.value}</dd>
					<dt class="text-sm text-slate-300 mt-1">{s.label}</dt>
				</div>
			{/each}
		</dl>

		<div class="mt-2">
			{#each byYear as group, gi (group.year)}
				<YearGroup
					year={group.year}
					count={group.items.length}
					months={[{ month: null, items: group.items }]}
					last={gi === byYear.length - 1}
					unit="paper"
				>
					{#snippet item(pub: Publication)}
						<div class="card-glass rounded-2xl p-4 md:p-5">
							<div class="flex items-center gap-2 mb-1.5 flex-wrap">
								<span class="bg-sky-500/15 text-sky-400 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
									Journal
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
					{/snippet}
				</YearGroup>
			{/each}
		</div>
	</main>
</div>
