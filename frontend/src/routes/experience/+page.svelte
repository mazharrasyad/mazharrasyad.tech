<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import type { Experience } from '$lib/types';

	const entries = [...(experienceData as Experience[])].sort((a, b) => b.sortKey - a.sortKey);

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

<div class="min-h-screen text-white flex flex-col p-4 md:p-8 pb-24 w-full">
	<main class="max-w-3xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-8">Experience</h1>

		<div class="flex flex-col gap-4 md:gap-5">
			{#each entries as exp (exp.sortKey)}
				<div class="card-glass rounded-2xl p-4 md:p-5">
					<span class="text-sm font-bold text-blue-400 tabular-nums">{exp.period}</span>
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
				</div>
			{/each}
		</div>
	</main>
</div>
