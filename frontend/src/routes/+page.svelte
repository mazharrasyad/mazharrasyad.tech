<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import { reveal } from '$lib/actions/reveal';
	import yearsData from '$lib/data/projects.json';
	import scholarData from '$lib/data/scholar.json';
	import educationData from '$lib/data/education.json';
	import experienceData from '$lib/data/experience.json';
	import type { YearData, ScholarData, Education, Experience, Project } from '$lib/types';

	const years = yearsData as YearData[];
	const totalProjects = years.reduce((sum, y) => sum + y.projects.length, 0);
	const scholar = scholarData as ScholarData;
	const education = educationData as Education[];
	const experience = experienceData as Experience[];

	// Oldest first, so scrolling down mirrors moving forward through time.
	const chronoYears = [...years].sort((a, b) => a.year - b.year);

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
		| { kind: 'experience'; sortKey: number; data: Experience };

	const milestones: Milestone[] = [
		...education.map((data) => ({ kind: 'education' as const, sortKey: data.sortKey, data })),
		...experience.map((data) => ({ kind: 'experience' as const, sortKey: data.sortKey, data }))
	].sort((a, b) => a.sortKey - b.sortKey);

	type StoryItem =
		| { kind: 'milestone'; sortKey: number; milestone: Milestone }
		| { kind: 'projects'; sortKey: number; yearData: YearData };

	const story: StoryItem[] = [
		...milestones.map((m) => ({ kind: 'milestone' as const, sortKey: m.sortKey, milestone: m })),
		...chronoYears.map((y) => ({ kind: 'projects' as const, sortKey: y.year * 100 + 6, yearData: y }))
	].sort((a, b) => a.sortKey - b.sortKey);

	let imgError = $state(false);
	let search = $state('');

	function matchingProjects(y: YearData) {
		const q = search.trim().toLowerCase();
		if (!q) return y.projects;
		return y.projects.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q) ||
				p.tools.toLowerCase().includes(q)
		);
	}

	const title = 'Muhammad Azhar Rasyad - Software Engineer';
	const description = `Software Engineer with 8+ years of experience (2018–present). Portfolio of ${totalProjects}+ projects across web development, blockchain, and data engineering. Based in Jakarta, Indonesia.`;
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
				The story of how a vocational-school student in Cibinong became a software engineer with {totalProjects}+
				shipped projects. Scroll down to follow the journey, year by year.
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

		<!-- Search (filters the project rows further down without breaking the timeline) -->
		<div class="relative -mb-8" use:reveal>
			<Icon name="search" class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
			<input
				type="text"
				bind:value={search}
				placeholder="Looking for a specific project? Search by title, category, or tools..."
				class="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-colors"
			/>
		</div>

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
									: 'bg-blue-500'}"
							></span>

							{#if item.milestone.kind === 'education'}
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
							{@const list = matchingProjects(item.yearData)}
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

							{#if list.length > 0}
								<div class="card-glass rounded-2xl px-3 md:px-4 divide-y divide-white/5">
									{#each list as project (project.title)}
										<ProjectRow {project} index={projectIndex.get(project) ?? 0} digits={3} />
									{/each}
								</div>
							{:else}
								<p class="text-xs text-slate-600 italic">No {item.yearData.year} projects match "{search}".</p>
							{/if}
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Publications: the current chapter -->
		<section use:reveal>
			<div class="flex justify-between items-center mb-2 gap-3 flex-wrap">
				<h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Now: Research & Publications</h2>
				<a
					href={scholar.profileUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-xs bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-bold hover:bg-sky-500/20 transition-colors flex items-center gap-1.5"
				>
					<Icon name="google-scholar" class="w-3 h-3" />
					<span>Google Scholar</span>
				</a>
			</div>
			<p class="text-xs text-slate-500 mb-5">
				{scholar.citations} Citations <span class="text-slate-700 mx-1">·</span> h-index {scholar.hIndex}
				<span class="text-slate-700 mx-1">·</span> i10-index {scholar.i10Index}
			</p>

			<div class="card-glass rounded-2xl px-4 md:px-6 divide-y divide-white/5">
				{#each scholar.publications as pub (pub.title)}
					<div class="py-4 md:py-5 flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
						<span class="text-xs font-bold text-slate-500 shrink-0 md:w-12 tabular-nums">{pub.year}</span>
						<div class="flex-1 min-w-0">
							<a
								href={pub.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group/pub inline-flex items-start gap-1.5 text-sm md:text-base font-bold text-white leading-snug hover:text-blue-300 transition-colors"
							>
								<span>{pub.title}</span>
								<Icon
									name="external-link"
									class="w-3 h-3 mt-1 shrink-0 text-slate-600 group-hover/pub:text-blue-400 transition-colors"
								/>
							</a>
							<p class="text-xs text-slate-500 mt-1">{pub.authors}</p>
							<p class="text-xs text-slate-600 italic mt-0.5">{pub.venue}</p>
						</div>
						{#if pub.citations !== null}
							<span
								class="shrink-0 w-fit text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300"
							>
								{pub.citations} {pub.citations === 1 ? 'Citation' : 'Citations'}
							</span>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>
