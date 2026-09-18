<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import yearsData from '$lib/data/projects.json';
	import type { YearData } from '$lib/types';

	const years = yearsData as YearData[];
	const totalProjects = years.reduce((sum, y) => sum + y.projects.length, 0);
	const totalYears = years.length;
	const totalCategories = new Set(years.flatMap((y) => y.projects.map((p) => p.category))).size;

	let imgError = $state(false);

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
		sameAs: ['https://www.linkedin.com/in/mazharrasyad', 'https://github.com/mazharrasyad']
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

<main class="flex-1 w-full px-4 md:px-8 py-12">
	<div class="max-w-6xl mx-auto w-full flex flex-col gap-10 md:gap-12">
		<!-- Hero -->
		<section class="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
			<div class="relative shrink-0 mx-auto md:mx-0">
				<div
					class="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[3px] shadow-2xl shadow-blue-500/30"
				>
					{#if imgError}
						<div class="w-full h-full rounded-full bg-slate-700 flex items-center justify-center">
							<span class="text-3xl font-bold text-blue-400">AR</span>
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

			<div class="flex-1 text-center md:text-left pt-3 md:pt-0">
				<h1
					class="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
				>
					Muhammad Azhar Rasyad
				</h1>

				<div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-3 justify-center md:justify-start">
					<span
						class="w-fit mx-auto md:mx-0 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest"
					>
						Software Engineer
					</span>
					<p class="text-slate-400 text-sm font-medium">
						8+ Years Experience <span class="text-slate-600 mx-1">|</span> 2018 - Present
					</p>
				</div>

				<p class="text-slate-500 text-xs flex items-center justify-center md:justify-start gap-1 mb-6">
					<Icon name="map-pin" class="w-3 h-3 text-blue-500/70" />
					Jakarta, Indonesia
				</p>

				<div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
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
			</div>
		</section>

		<!-- Stats -->
		<section class="grid grid-cols-3 gap-3 md:gap-5">
			<div class="card-glass rounded-2xl p-4 md:p-6 text-center">
				<div class="text-2xl md:text-4xl font-black text-white mb-1">{totalProjects}+</div>
				<div class="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Projects</div>
			</div>
			<div class="card-glass rounded-2xl p-4 md:p-6 text-center">
				<div class="text-2xl md:text-4xl font-black text-white mb-1">{totalYears}</div>
				<div class="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Years Active</div>
			</div>
			<div class="card-glass rounded-2xl p-4 md:p-6 text-center">
				<div class="text-2xl md:text-4xl font-black text-white mb-1">{totalCategories}</div>
				<div class="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Disciplines</div>
			</div>
		</section>

		<!-- Years -->
		<section>
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Browse Projects by Year</h2>
				<span class="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold">
					{totalProjects}+ Projects
				</span>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
				{#each years as y (y.year)}
					<a href="/projects/{y.year}" class="year-link p-5 rounded-2xl text-center flex flex-col justify-center items-center gap-1">
						<span class="text-xl font-bold">{y.year}</span>
						<span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{y.projects.length} Projects</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</main>
