<script lang="ts">
	import TimelineEntry from '$lib/components/TimelineEntry.svelte';
	import educationData from '$lib/data/education.json';
	import type { Education } from '$lib/types';

	const entries = [...(educationData as Education[])].sort((a, b) => b.sortKey - a.sortKey);

	const title = 'Education - Muhammad Azhar Rasyad';
	const description =
		'Educational background of Muhammad Azhar Rasyad, Software Engineer: Master of Computer Science at Universitas Budi Luhur, an ongoing Doctor of Computer Science, Bachelor of Computer Science at STT Terpadu Nurul Fikri, and a vocational high school diploma from SMKN 1 Cibinong.';
	const url = 'https://mazharrasyad.tech/education';
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

<div class="flex-1 text-white flex flex-col p-4 md:p-8 w-full">
	<main class="max-w-3xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-8">Education</h1>

		<div>
			{#each entries as edu, i (edu.sortKey)}
				<TimelineEntry period={edu.year} accent="emerald" currentLabel="On Going" last={i === entries.length - 1}>
					<span
						class="inline-block mb-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-black uppercase tracking-wider"
					>
						{edu.level}
					</span>
					<h2 class="text-lg md:text-xl font-bold text-white leading-snug">{edu.field}</h2>
					<p class="text-sm text-slate-300 mt-1">
						{#if edu.institution}
							{edu.institution} <span class="text-slate-500 mx-1">·</span>
						{/if}
						{edu.degree}
					</p>
					{#if edu.highlights.length > 0}
						<ul class="mt-2.5 space-y-1">
							{#each edu.highlights as h (h)}
								<li class="text-base text-slate-300 flex gap-2">
									<span class="text-slate-500 shrink-0">•</span>
									<span>{h}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</TimelineEntry>
			{/each}
		</div>
	</main>
</div>
