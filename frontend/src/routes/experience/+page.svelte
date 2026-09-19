<script lang="ts">
	import TimelineEntry from '$lib/components/TimelineEntry.svelte';
	import experienceData from '$lib/data/experience.json';
	import type { Experience } from '$lib/types';

	const entries = [...(experienceData as Experience[])].sort((a, b) => b.sortKey - a.sortKey);

	const current = entries.filter((e) => /present\s*$/i.test(e.period));

	const title = 'Experience - Muhammad Azhar Rasyad';
	const description =
		'Professional experience of Muhammad Azhar Rasyad, Software Engineer with 8+ years in full-stack web development across government information systems, public health platforms, and commercial applications.';
	const url = 'https://mazharrasyad.tech/experience';
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
	<main class="max-w-3xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-8">Experience</h1>

		{#if current.length > 0}
			<section class="mb-8 rounded-2xl border border-blue-400/40 bg-blue-500/10 p-4 md:p-5">
				<h2 class="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-blue-300">
					<span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
					Currently working at
				</h2>
				<ul class="mt-3 flex flex-col gap-2">
					{#each current as exp (exp.sortKey)}
						<li class="text-base text-slate-200">
							<span class="font-bold text-white">{exp.company}</span>
							<span class="text-slate-400"> — {exp.title}, {exp.type}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<div>
			{#each entries as exp, i (exp.sortKey)}
				<TimelineEntry period={exp.period} accent="blue" currentLabel="Current" last={i === entries.length - 1}>
					<h2 class="text-lg md:text-xl font-bold text-white leading-snug">{exp.title}</h2>
					<p class="text-sm text-slate-300 mt-1">
						{exp.company} <span class="text-slate-500 mx-1">·</span>
						{exp.type}
					</p>
					<ul class="mt-2.5 space-y-1">
						{#each exp.bullets as b (b)}
							<li class="text-base text-slate-300 flex gap-2">
								<span class="text-slate-500 shrink-0">•</span>
								<span>{b}</span>
							</li>
						{/each}
					</ul>
				</TimelineEntry>
			{/each}
		</div>
	</main>
</div>
