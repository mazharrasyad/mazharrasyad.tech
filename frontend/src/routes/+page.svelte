<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import { reveal } from '$lib/actions/reveal';
	import yearsData from '$lib/data/projects.json';
	import scholarData from '$lib/data/scholar.json';
	import educationData from '$lib/data/education.json';
	import experienceData from '$lib/data/experience.json';
	import type { YearData, ScholarData, Education, Experience, Project, Publication } from '$lib/types';

	const years = yearsData as YearData[];
	const totalProjects = years.reduce((sum, y) => sum + y.projects.length, 0);
	const scholar = scholarData as ScholarData;
	const education = educationData as Education[];
	const experience = experienceData as Experience[];

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

	// Education and Experience each get their own dedicated slide (right
	// after Home) instead of being interleaved into whichever year they
	// started, so a multi-year degree/job isn't split piecemeal across the
	// timeline.
	type Milestone = { kind: 'publication'; sortKey: number; data: Publication };

	// Publications only carry a year, so they're placed mid-year (like
	// undated projects) within a year slide.
	const milestones: Milestone[] = scholar.publications.map((data) => ({
		kind: 'publication' as const,
		sortKey: data.year * 100 + 6,
		data
	}));

	const educationSlide = {
		kind: 'education' as const,
		entries: [...education].sort((a, b) => b.sortKey - a.sortKey)
	};

	const experienceSlide = {
		kind: 'experience' as const,
		entries: [...experience].sort((a, b) => b.sortKey - a.sortKey)
	};

	type YearSlide = { kind: 'year'; year: number; milestones: Milestone[]; projects: Project[] };
	type Slide = { kind: 'profile' } | typeof educationSlide | typeof experienceSlide | YearSlide;

	const allYears = new Set<number>();
	for (const m of milestones) allYears.add(Math.floor(m.sortKey / 100));
	for (const y of chronoYears) allYears.add(y.year);

	const yearSlides: YearSlide[] = [...allYears]
		.sort((a, b) => b - a)
		.map((year) => ({
			kind: 'year' as const,
			year,
			milestones: milestones
				.filter((m) => Math.floor(m.sortKey / 100) === year)
				.sort((a, b) => a.sortKey - b.sortKey),
			projects: chronoYears.find((y) => y.year === year)?.projects ?? []
		}));

	const slides: Slide[] = [{ kind: 'profile' }, educationSlide, experienceSlide, ...yearSlides];

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

	let imgError = $state(false);

	const title = 'Muhammad Azhar Rasyad - Software Engineer';
	const description = `Software Engineer dengan 8+ tahun pengalaman (2018–sekarang). Portofolio ${totalProjects}+ proyek di bidang pengembangan web, blockchain, dan rekayasa data. Berbasis di Jakarta, Indonesia.`;
	const url = 'https://mazharrasyad.tech/';
	const image = 'https://mazharrasyad.tech/logo.png';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Muhammad Azhar Rasyad',
		jobTitle: 'Software Engineer',
		url,
		image,
		email: 'mailto:muhazharrasyad@gmail.com',
		address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
		sameAs: [
			'https://www.linkedin.com/in/mazharrasyad',
			'https://github.com/mazharrasyad',
			'https://scholar.google.co.id/citations?user=TQn1C8IAAAAJ&hl=id'
		],
		alumniOf: education.map((edu) => ({ '@type': 'EducationalOrganization', name: edu.institution }))
	};
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
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<main class="w-full flex flex-col">
	<div class="relative w-full h-[calc(100dvh-3.5rem-env(safe-area-inset-bottom))]">
		<div
			bind:this={track}
			onscroll={onTrackScroll}
			class="h-full w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
		>
			{#each slides as slide (slide.kind === 'year' ? slide.year : slide.kind)}
				<section
					class="w-full h-full shrink-0 snap-center overflow-y-auto [content-visibility:auto] px-4 md:px-8 py-8 md:py-12"
				>
					{#if slide.kind === 'profile'}
						<div
							class="max-w-md mx-auto w-full h-full flex flex-col items-center justify-center text-center"
							use:reveal
						>
							<div class="relative mb-6">
								<div
									class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[3px] shadow-2xl shadow-blue-500/30"
								>
									{#if imgError}
										<div class="w-full h-full rounded-full bg-slate-700 flex items-center justify-center">
											<span class="text-2xl font-bold text-blue-400">AR</span>
										</div>
									{:else}
										<img
											src="/logo.png"
											alt="Muhammad Azhar Rasyad"
											class="w-full h-full rounded-full object-cover bg-slate-800"
											onerror={() => (imgError = true)}
										/>
									{/if}
								</div>
							</div>
							<span
								class="mb-4 whitespace-nowrap bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-emerald-500/10 animate-pulse"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Open to Remote Work
							</span>

							<h1
								class="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
							>
								Muhammad Azhar Rasyad
							</h1>
							<p class="text-slate-400 text-sm font-medium mb-7 flex items-center gap-2">
								Software Engineer <span class="text-slate-600">|</span>
								<Icon name="map-pin" class="w-3 h-3 text-blue-500/70" /> Jakarta, Indonesia
							</p>
							<div class="flex flex-wrap items-center justify-center gap-3">
								<a
									href="https://github.com/mazharrasyad"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-105 transition-all border border-white/10"
								>
									<Icon name="github" class="w-4 h-4" />
									<span class="text-xs font-bold">GitHub</span>
								</a>
								<a
									href="https://www.linkedin.com/in/mazharrasyad"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:scale-105 transition-all border border-blue-500/20"
								>
									<Icon name="linkedin" class="w-4 h-4" />
									<span class="text-xs font-bold">LinkedIn</span>
								</a>
								<a
									href="https://scholar.google.co.id/citations?user=TQn1C8IAAAAJ&hl=id"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:scale-105 transition-all border border-sky-500/20"
								>
									<Icon name="google-scholar" class="w-4 h-4" />
									<span class="text-xs font-bold">Google Scholar</span>
								</a>
								<a
									href="https://wa.me/+6281290351971"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:scale-105 transition-all border border-green-500/20"
								>
									<Icon name="whatsapp" class="w-4 h-4" />
									<span class="text-xs font-bold">WhatsApp</span>
								</a>
								<a
									href="mailto:muhazharrasyad@gmail.com"
									class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:scale-105 transition-all border border-rose-500/20"
								>
									<Icon name="mail" class="w-4 h-4" />
									<span class="text-xs font-bold">Email</span>
								</a>
								<a
									href="/cv.pdf"
									target="_blank"
									rel="noopener noreferrer"
									class="link-btn px-5 py-2.5 shadow-md shadow-blue-500/5 rounded-xl"
								>
									<Icon name="file-text" class="w-4 h-4 text-rose-400" />
									<span class="text-xs font-bold normal-case">View CV</span>
								</a>
							</div>

							<div class="mt-10 flex flex-col items-center gap-1 text-slate-600 animate-pulse">
								<span class="text-[10px] uppercase tracking-widest font-bold">Swipe to begin</span>
								<Icon name="chevron-right" class="w-4 h-4" />
							</div>
						</div>
					{:else if slide.kind === 'education'}
						<div class="max-w-3xl mx-auto w-full flex flex-col gap-4 md:gap-5">
							<h2 class="text-4xl md:text-6xl font-black text-white">Education</h2>

							{#each slide.entries as edu (edu.institution)}
								<div class="card-glass rounded-2xl p-4 md:p-5">
									<span class="text-xs font-bold text-emerald-400 tabular-nums">{edu.year}</span>
									<h3 class="text-base md:text-lg font-bold text-white leading-snug mt-1.5">{edu.field}</h3>
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
					{:else if slide.kind === 'experience'}
						<div class="max-w-3xl mx-auto w-full flex flex-col gap-4 md:gap-5">
							<h2 class="text-4xl md:text-6xl font-black text-white">Experience</h2>

							{#each slide.entries as exp (exp.sortKey)}
								<div class="card-glass rounded-2xl p-4 md:p-5">
									<span class="text-xs font-bold text-blue-400 tabular-nums">{exp.period}</span>
									<h3 class="text-base md:text-lg font-bold text-white leading-snug">{exp.title}</h3>
									<p class="text-xs text-slate-500 mt-1">
										{exp.company} <span class="text-slate-700 mx-1">·</span>
										{exp.type}
									</p>
									<ul class="mt-2.5 space-y-1">
										{#each exp.bullets as b (b)}
											<li class="text-xs text-slate-500 flex gap-2">
												<span class="text-slate-700 shrink-0">•</span>
												<span>{b}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					{:else}
						<div class="max-w-3xl mx-auto w-full flex flex-col gap-4 md:gap-5">
							<h2 class="text-4xl md:text-6xl font-black text-white tabular-nums">{slide.year}</h2>

							{#each slide.milestones as m, mi (m.sortKey + '-' + mi)}
								<div class="card-glass rounded-2xl p-4 md:p-5">
									<div class="flex items-center gap-2 mb-1.5 flex-wrap">
										<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400">
											Journal
										</span>
										{#if m.data.citations !== null}
											<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300">
												{m.data.citations} {m.data.citations === 1 ? 'Citation' : 'Citations'}
											</span>
										{/if}
									</div>
									<a
										href={m.data.url}
										target="_blank"
										rel="noopener noreferrer"
										class="group/pub inline-flex items-start gap-1.5 text-base md:text-lg font-bold text-white leading-snug hover:text-blue-300 transition-colors"
									>
										<span>{m.data.title}</span>
										<Icon
											name="external-link"
											class="w-3 h-3 mt-1.5 shrink-0 text-slate-600 group-hover/pub:text-blue-400 transition-colors"
										/>
									</a>
									<p class="text-xs text-slate-500 mt-1">{m.data.authors}</p>
									<p class="text-xs text-slate-600 italic mt-0.5">{m.data.venue}</p>
								</div>
							{/each}

							{#if slide.projects.length > 0}
								<span
									class="w-fit text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300"
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
								<p class="text-slate-600 italic text-sm">Nothing recorded for {slide.year} yet.</p>
							{/if}
						</div>
					{/if}
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

	<!-- Slide indicators, pinned like a footer -->
	<div
		class="fixed bottom-0 inset-x-0 z-40 min-h-14 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 bg-[#0f172a]/95 backdrop-blur-md border-t border-white/10 [padding-bottom:env(safe-area-inset-bottom)]"
	>
		{#each slides as slide, i (slide.kind === 'year' ? slide.year : slide.kind)}
			<button
				type="button"
				onclick={() => goToSlide(i)}
				aria-label={slide.kind === 'year'
					? String(slide.year)
					: slide.kind === 'profile'
						? 'Home'
						: slide.kind === 'education'
							? 'Education'
							: 'Experience'}
				class="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider tabular-nums transition-all {activeIndex ===
				i
					? 'bg-blue-500 text-white'
					: 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'}"
			>
				{slide.kind === 'year'
					? slide.year
					: slide.kind === 'profile'
						? 'Home'
						: slide.kind === 'education'
							? 'Education'
							: 'Experience'}
			</button>
		{/each}
	</div>
</main>
