<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import yearsData from '$lib/data/projects.json';
	import scholarData from '$lib/data/scholar.json';
	import type { YearData, ScholarData, Project, Publication } from '$lib/types';

	const years = yearsData as YearData[];
	const totalProjects = years.reduce((sum, y) => sum + y.projects.length, 0);
	const scholar = scholarData as ScholarData;

	// Newest first.
	const chronoYears = [...years].sort((a, b) => b.year - a.year);

	let projectCounter = 0;
	const projectIndex = new Map<Project, number>();
	for (const y of chronoYears) {
		for (const p of y.projects) {
			projectCounter += 1;
			projectIndex.set(p, projectCounter);
		}
	}

	type Milestone = { kind: 'publication'; sortKey: number; data: Publication };

	// Publications only carry a year, so they're placed mid-year (like
	// undated projects) within a year slide.
	const milestones: Milestone[] = scholar.publications.map((data) => ({
		kind: 'publication' as const,
		sortKey: data.year * 100 + 6,
		data
	}));

	type YearSlide = { year: number; milestones: Milestone[]; projects: Project[] };

	const allYears = new Set<number>();
	for (const m of milestones) allYears.add(Math.floor(m.sortKey / 100));
	for (const y of chronoYears) allYears.add(y.year);

	const slides: YearSlide[] = [...allYears]
		.sort((a, b) => b - a)
		.map((year) => ({
			year,
			milestones: milestones
				.filter((m) => Math.floor(m.sortKey / 100) === year)
				.sort((a, b) => a.sortKey - b.sortKey),
			projects: chronoYears.find((y) => y.year === year)?.projects ?? []
		}));

	let track: HTMLDivElement | undefined = $state();
	let activeIndex = $state(0);

	function goToSlide(i: number) {
		if (!track) return;
		const clamped = Math.max(0, Math.min(slides.length - 1, i));
		track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
	}

	function onTrackScroll() {
		if (!track || track.clientWidth === 0) return;
		activeIndex = Math.round(track.scrollLeft / track.clientWidth);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') goToSlide(activeIndex + 1);
		else if (e.key === 'ArrowLeft') goToSlide(activeIndex - 1);
	}

	const title = 'Timeline - Muhammad Azhar Rasyad';
	const description = `Year-by-year timeline of ${totalProjects}+ projects and publications by Muhammad Azhar Rasyad, Software Engineer.`;
	const url = 'https://mazharrasyad.tech/timeline';
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

<svelte:window onkeydown={onKeydown} />

<main class="w-full flex flex-col h-[calc(100dvh-3.5rem)]">
	<!-- Year indicators -->
	<div class="shrink-0 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 py-3 border-b border-white/10">
		{#each slides as slide, i (slide.year)}
			<button
				type="button"
				onclick={() => goToSlide(i)}
				aria-label={String(slide.year)}
				class="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider tabular-nums transition-all {activeIndex === i
					? 'bg-blue-500 text-white'
					: 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
			>
				{slide.year}
			</button>
		{/each}
	</div>

	<div class="relative w-full flex-1 min-h-0">
		<div
			bind:this={track}
			onscroll={onTrackScroll}
			class="h-full w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
		>
			{#each slides as slide (slide.year)}
				<section
					class="w-full h-full shrink-0 snap-center overflow-y-auto [content-visibility:auto] px-4 md:px-8 py-8 md:py-12"
				>
					<div class="max-w-3xl mx-auto w-full flex flex-col gap-4 md:gap-5">
						<h2 class="text-4xl md:text-6xl font-black text-white tabular-nums">{slide.year}</h2>

						{#each slide.milestones as m, mi (m.sortKey + '-' + mi)}
							<div class="card-glass rounded-2xl p-4 md:p-5">
								<div class="flex items-center gap-2 mb-1.5 flex-wrap">
									<span class="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400">
										Journal
									</span>
									{#if m.data.citations !== null}
										<span class="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300">
											{m.data.citations} {m.data.citations === 1 ? 'Citation' : 'Citations'}
										</span>
									{/if}
								</div>
								<a
									href={m.data.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group/pub inline-flex items-start gap-1.5 text-lg md:text-xl font-bold text-white leading-snug hover:text-blue-300 transition-colors"
								>
									<span>{m.data.title}</span>
									<Icon
										name="external-link"
										class="w-3 h-3 mt-1.5 shrink-0 text-slate-400 group-hover/pub:text-blue-400 transition-colors"
									/>
								</a>
								<p class="text-sm text-slate-300 mt-1">{m.data.authors}</p>
								<p class="text-sm text-slate-400 italic mt-0.5">{m.data.venue}</p>
							</div>
						{/each}

						{#if slide.projects.length > 0}
							<span
								class="w-fit text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300"
							>
								{slide.projects.length}
								{slide.projects.length === 1 ? 'Project' : 'Projects'} Shipped
							</span>
							<div class="flex flex-col gap-3">
								{#each slide.projects as project (project.title)}
									<ProjectRow {project} index={projectIndex.get(project) ?? 0} digits={3} />
								{/each}
							</div>
						{/if}

						{#if slide.milestones.length === 0 && slide.projects.length === 0}
							<p class="text-slate-400 italic text-base">Nothing recorded for {slide.year} yet.</p>
						{/if}
					</div>
				</section>
			{/each}
		</div>

		<button
			type="button"
			onclick={() => goToSlide(activeIndex - 1)}
			disabled={activeIndex === 0}
			aria-label="Previous"
			class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
		>
			<Icon name="chevron-left" class="w-5 h-5" />
		</button>
		<button
			type="button"
			onclick={() => goToSlide(activeIndex + 1)}
			disabled={activeIndex === slides.length - 1}
			aria-label="Next"
			class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
		>
			<Icon name="chevron-right" class="w-5 h-5" />
		</button>
	</div>
</main>
