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

	// Newest first, so scrolling down moves back through time.
	const chronoYears = [...years].sort((a, b) => b.year - a.year);

	let projectCounter = 0;
	const projectIndex = new Map<Project, number>();
	for (const y of chronoYears) {
		for (const p of y.projects) {
			projectCounter += 1;
			projectIndex.set(p, projectCounter);
		}
	}

	type Milestone =
		| { kind: 'education'; sortKey: number; data: Education }
		| { kind: 'experience'; sortKey: number; data: Experience }
		| { kind: 'publication'; sortKey: number; data: Publication };

	// Publications only carry a year, so they're placed mid-year (like undated
	// projects) to interleave sensibly with month-precise education/experience entries.
	const milestones: Milestone[] = [
		...education.map((data) => ({ kind: 'education' as const, sortKey: data.sortKey, data })),
		...experience.map((data) => ({ kind: 'experience' as const, sortKey: data.sortKey, data })),
		...scholar.publications.map((data) => ({
			kind: 'publication' as const,
			sortKey: data.year * 100 + 6,
			data
		}))
	].sort((a, b) => b.sortKey - a.sortKey);

	type StoryItem =
		| { kind: 'milestone'; sortKey: number; milestone: Milestone }
		| { kind: 'projects'; sortKey: number; yearData: YearData };

	const story: StoryItem[] = [
		...milestones.map((m) => ({ kind: 'milestone' as const, sortKey: m.sortKey, milestone: m })),
		...chronoYears.map((y) => ({ kind: 'projects' as const, sortKey: y.year * 100 + 6, yearData: y }))
	].sort((a, b) => b.sortKey - a.sortKey);

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

<main class="flex-1 w-full px-4 md:px-8 py-12 md:py-16">
	<div class="max-w-3xl mx-auto w-full flex flex-col gap-16 md:gap-20">
		<!-- Cover -->
		<section class="text-center flex flex-col items-center" use:reveal>
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
				<span
					class="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-emerald-500/10 animate-pulse"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Open to Remote Work
				</span>
			</div>

			<h1
				class="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
			>
				Muhammad Azhar Rasyad
			</h1>
			<p class="text-slate-400 text-sm font-medium mb-1 flex items-center gap-2">
				Software Engineer <span class="text-slate-600">|</span>
				<Icon name="map-pin" class="w-3 h-3 text-blue-500/70" /> Jakarta, Indonesia
			</p>
			<p class="text-slate-500 text-xs max-w-md mb-7 leading-relaxed">
				{totalProjects}+ shipped projects built alongside a Computer Science education, from a
				vocational high school in Cibinong to a Master's degree in progress. Scroll down to follow
				the journey, year by year.
			</p>

			<div class="flex flex-wrap items-center justify-center gap-3">
				<a
					href="https://www.linkedin.com/in/mazharrasyad"
					target="_blank"
					rel="noopener noreferrer"
					title="LinkedIn"
					class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 hover:scale-110 transition-all border border-blue-500/20"
				>
					<Icon name="linkedin" class="w-4 h-4" />
				</a>
				<a
					href="https://github.com/mazharrasyad"
					target="_blank"
					rel="noopener noreferrer"
					title="GitHub"
					class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:scale-110 transition-all border border-white/10"
				>
					<Icon name="github" class="w-4 h-4" />
				</a>
				<a
					href="https://scholar.google.co.id/citations?user=TQn1C8IAAAAJ&hl=id"
					target="_blank"
					rel="noopener noreferrer"
					title="Google Scholar"
					class="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 hover:scale-110 transition-all border border-sky-500/20"
				>
					<Icon name="google-scholar" class="w-4 h-4" />
				</a>
				<a
					href="https://wa.me/+6281290351971"
					target="_blank"
					rel="noopener noreferrer"
					title="WhatsApp"
					class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 hover:scale-110 transition-all border border-green-500/20"
				>
					<Icon name="whatsapp" class="w-4 h-4" />
				</a>
				<a
					href="mailto:muhazharrasyad@gmail.com"
					title="Email"
					class="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 hover:scale-110 transition-all border border-rose-500/20"
				>
					<Icon name="mail" class="w-4 h-4" />
				</a>
				<a
					href="/cv.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="link-btn px-5 py-2.5 shadow-md shadow-blue-500/5 rounded-xl text-xs uppercase tracking-wider font-bold"
				>
					<Icon name="file-text" class="w-4 h-4 text-rose-400" />
					<span>View CV</span>
				</a>
			</div>

			<div class="mt-10 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
				<span class="text-[10px] uppercase tracking-widest font-bold">Scroll to begin</span>
				<Icon name="chevron-right" class="w-4 h-4 rotate-90" />
			</div>
		</section>

		<!-- Timeline -->
		<section class="relative">
			<div class="timeline-line absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px"></div>

			<div class="flex flex-col gap-14 md:gap-16">
				{#each story as item, i (item.kind + '-' + item.sortKey + '-' + i)}
					<div class="relative pl-8 md:pl-10" use:reveal>
						{#if item.kind === 'milestone'}
							<span
								class="absolute left-0 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-4 border-[#0f172a] {item
									.milestone.kind === 'education'
									? 'bg-emerald-500'
									: item.milestone.kind === 'publication'
										? 'bg-sky-500'
										: 'bg-blue-500'}"
							></span>

							{#if item.milestone.kind === 'publication'}
								<div class="flex items-center gap-2 mb-1.5 flex-wrap">
									<span class="text-xs font-bold text-sky-400 tabular-nums">{item.milestone.data.year}</span>
									<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400">
										Journal
									</span>
									{#if item.milestone.data.citations !== null}
										<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300">
											{item.milestone.data.citations} {item.milestone.data.citations === 1 ? 'Citation' : 'Citations'}
										</span>
									{/if}
								</div>
								<a
									href={item.milestone.data.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group/pub inline-flex items-start gap-1.5 text-base md:text-lg font-bold text-white leading-snug hover:text-blue-300 transition-colors"
								>
									<span>{item.milestone.data.title}</span>
									<Icon
										name="external-link"
										class="w-3 h-3 mt-1.5 shrink-0 text-slate-600 group-hover/pub:text-blue-400 transition-colors"
									/>
								</a>
								<p class="text-xs text-slate-500 mt-1">{item.milestone.data.authors}</p>
								<p class="text-xs text-slate-600 italic mt-0.5">{item.milestone.data.venue}</p>
							{:else if item.milestone.kind === 'education'}
								<div class="flex items-center gap-2 mb-1.5 flex-wrap">
									<span class="text-xs font-bold text-emerald-400 tabular-nums">{item.milestone.data.year}</span>
									<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400">
										Education
									</span>
								</div>
								<h3 class="text-base md:text-lg font-bold text-white leading-snug">{item.milestone.data.field}</h3>
								<p class="text-xs text-slate-500 mt-1">
									{item.milestone.data.institution} <span class="text-slate-700 mx-1">·</span>
									{item.milestone.data.degree}
								</p>
								{#if item.milestone.data.highlights.length > 0}
									<ul class="mt-2.5 space-y-1">
										{#each item.milestone.data.highlights as h (h)}
											<li class="text-xs text-slate-500 flex gap-2">
												<span class="text-slate-700 shrink-0">•</span>
												<span>{h}</span>
											</li>
										{/each}
									</ul>
								{/if}
							{:else}
								<div class="flex items-center gap-2 mb-1.5 flex-wrap">
									<span class="text-xs font-bold text-blue-400 tabular-nums">{item.milestone.data.period}</span>
									<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400">
										Experience
									</span>
								</div>
								<h3 class="text-base md:text-lg font-bold text-white leading-snug">{item.milestone.data.title}</h3>
								<p class="text-xs text-slate-500 mt-1">
									{item.milestone.data.company} <span class="text-slate-700 mx-1">·</span>
									{item.milestone.data.type}
								</p>
								<ul class="mt-2.5 space-y-1">
									{#each item.milestone.data.bullets as b (b)}
										<li class="text-xs text-slate-500 flex gap-2">
											<span class="text-slate-700 shrink-0">•</span>
											<span>{b}</span>
										</li>
									{/each}
								</ul>
							{/if}
						{:else}
							<span
								class="absolute left-0 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-4 border-[#0f172a] bg-indigo-500"
							></span>

							<div class="flex items-center gap-2 mb-3 flex-wrap">
								<span class="text-xs font-bold text-indigo-400 tabular-nums">{item.yearData.year}</span>
								<span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300">
									{item.yearData.projects.length}
									{item.yearData.projects.length === 1 ? 'Project' : 'Projects'} Shipped
								</span>
							</div>

							<div class="flex flex-col gap-3">
								{#each item.yearData.projects as project (project.title)}
									<ProjectRow {project} index={projectIndex.get(project) ?? 0} digits={3} />
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

	</div>
</main>
