<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { reveal } from '$lib/actions/reveal';
	import educationData from '$lib/data/education.json';
	import type { Education } from '$lib/types';

	const education = educationData as Education[];

	let imgError = $state(false);

	const title = 'Muhammad Azhar Rasyad - Software Engineer';
	const description = `Software Engineer dengan 8+ tahun pengalaman (2018–sekarang). Portofolio 130+ proyek di bidang pengembangan web, blockchain, dan rekayasa data. Berbasis di Jakarta, Indonesia.`;
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
		alumniOf: education
			.filter((edu) => edu.institution)
			.map((edu) => ({ '@type': 'EducationalOrganization', name: edu.institution }))
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

<main class="w-full h-[calc(100dvh-3.5rem)] overflow-y-auto px-4 md:px-8 py-8 md:py-12">
	<div
		class="max-w-md mx-auto w-full min-h-full flex flex-col items-center justify-center text-center"
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
			class="mb-4 whitespace-nowrap bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-emerald-500/10 animate-pulse"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Open to Remote Work
		</span>

		<h1
			class="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
		>
			Muhammad Azhar Rasyad
		</h1>
		<p class="text-slate-300 text-base font-medium mb-7">
			Software Engineer<br />
			<span class="text-slate-400">Jakarta, Indonesia</span>
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3">
			<a
				href="https://github.com/mazharrasyad"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-105 transition-all border border-white/10"
			>
				<Icon name="github" class="w-4 h-4" />
				<span class="text-sm font-bold">GitHub</span>
			</a>
			<a
				href="https://www.linkedin.com/in/mazharrasyad"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:scale-105 transition-all border border-blue-500/20"
			>
				<Icon name="linkedin" class="w-4 h-4" />
				<span class="text-sm font-bold">LinkedIn</span>
			</a>
			<a
				href="https://scholar.google.co.id/citations?user=TQn1C8IAAAAJ&hl=id"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:scale-105 transition-all border border-sky-500/20"
			>
				<Icon name="google-scholar" class="w-4 h-4" />
				<span class="text-sm font-bold">Google Scholar</span>
			</a>
			<a
				href="https://wa.me/+6281290351971"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:scale-105 transition-all border border-green-500/20"
			>
				<Icon name="whatsapp" class="w-4 h-4" />
				<span class="text-sm font-bold">WhatsApp</span>
			</a>
			<a
				href="mailto:muhazharrasyad@gmail.com"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:scale-105 transition-all border border-rose-500/20"
			>
				<Icon name="mail" class="w-4 h-4" />
				<span class="text-sm font-bold">Email</span>
			</a>
			<a
				href="/cv.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-105 transition-all border border-white/10"
			>
				<Icon name="file-text" class="w-4 h-4 text-rose-400" />
				<span class="text-sm font-bold">View CV</span>
			</a>
		</div>
		<a
			href="https://www.hostinger.com/id?REFERRALCODE=mazharrasyad"
			target="_blank"
			rel="sponsored noopener noreferrer"
			class="mt-6 w-full group flex items-center gap-3 p-3 pr-4 rounded-2xl text-left bg-gradient-to-r from-violet-500/15 to-indigo-500/15 border border-violet-400/30 hover:border-violet-400/60 hover:scale-[1.02] transition-all shadow-lg shadow-violet-500/10"
		>
			<span
				class="shrink-0 w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center"
			>
				<Icon name="tag" class="w-5 h-5" />
			</span>
			<span class="min-w-0 flex-1">
				<span class="block text-sm font-bold text-white">Promo Hostinger</span>
				<span class="block text-xs text-slate-400">
					Hosting, VPS, domain, dan email untuk berbagai kebutuhan digital
				</span>
			</span>
			<Icon
				name="external-link"
				class="shrink-0 w-4 h-4 text-violet-300 group-hover:translate-x-0.5 transition-transform"
			/>
		</a>
	</div>
</main>
