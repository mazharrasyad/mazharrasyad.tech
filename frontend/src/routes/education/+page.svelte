<script lang="ts">
	import educationData from '$lib/data/education.json';
	import type { Education } from '$lib/types';

	const entries = [...(educationData as Education[])].sort((a, b) => b.sortKey - a.sortKey);

	const title = 'Education - Muhammad Azhar Rasyad';
	const description =
		'Educational background of Muhammad Azhar Rasyad, Software Engineer: Master of Computer Science at Universitas Budi Luhur, Bachelor of Computer Science at STT Terpadu Nurul Fikri, and a vocational high school diploma from SMKN 1 Cibinong.';
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

<div class="min-h-screen text-white flex flex-col p-4 md:p-8 pb-24 w-full">
	<main class="max-w-3xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-8">Education</h1>

		<div class="flex flex-col gap-4 md:gap-5">
			{#each entries as edu (edu.institution)}
				<div class="card-glass rounded-2xl p-4 md:p-5">
					<span class="text-xs font-bold text-emerald-400 tabular-nums">{edu.year}</span>
					<h2 class="text-base md:text-lg font-bold text-white leading-snug mt-1.5">{edu.field}</h2>
					<p class="text-xs text-slate-500 mt-1">
						{edu.institution} <span class="text-slate-700 mx-1">·</span>
						{edu.degree}
					</p>
					{#if edu.highlights.length > 0}
						<ul class="mt-2.5 space-y-1">
							{#each edu.highlights as h (h)}
								<li class="text-xs text-slate-500 flex gap-2">
									<span class="text-slate-700 shrink-0">•</span>
									<span>{h}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>
