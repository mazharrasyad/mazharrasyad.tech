<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categories, projectCountLabel } from '$lib/projects';

	const title = 'Website & Information System Development for Organizations - Muhammad Azhar Rasyad';
	const url = 'https://mazharrasyad.tech/jasa';
	const image = 'https://mazharrasyad.tech/logo.png';

	const waText = encodeURIComponent(
		'Hi, I found your information system/website development service on mazharrasyad.tech and would like to consult about my agency/organization/business needs. When are you available to discuss?'
	);
	const waUrl = `https://wa.me/6281290351971?text=${waText}`;

	const services = [
		{
			icon: 'monitor',
			title: 'Information Systems & Web Apps',
			text: 'Applications for agencies and organizations that follow your workflow, replacing manual record-keeping in Excel or on paper.',
			points: [
				'Digital data and document records',
				'Multi-level submissions and approvals',
				'Access rights per user and role',
				'Reporting and data export'
			]
		},
		{
			icon: 'globe',
			title: 'Website Company Profile',
			text: 'A clean company site that is easy to find on Google and looks good on both mobile and desktop.',
			points: [
				'Company profile, products and services',
				'Articles and testimonials',
				'Contact form and WhatsApp button',
				'SEO basics so you are easy to find'
			]
		},
		{
			icon: 'bar-chart',
			title: 'Dashboards & Data Reports',
			text: 'Scattered data summarized into an easy-to-read view, so decisions can be made faster.',
			points: [
				'Performance charts and summaries',
				'Daily, monthly and yearly recaps',
				'Data filters to fit your needs',
				'Downloadable reports'
			]
		},
		{
			icon: 'shopping-cart',
			title: 'Operations & Point of Sale (POS) Apps',
			text: 'Systems to run day-to-day business operations, from orders to sales reports.',
			points: [
				'Sales transactions and checkout',
				'Stock and inventory',
				'Orders and reservations',
				'Sales reports'
			]
		},
		{
			icon: 'server',
			title: 'APIs & System Integration',
			text: 'Secure, well-structured backends that connect your application with the other systems you already run.',
			points: [
				'REST APIs for web and mobile',
				'Authentication and authorization',
				'Third-party service integration',
				'Data migration and cleanup'
			]
		},
		{
			icon: 'lock',
			title: 'Blockchain & Document Verification',
			text: 'For data that must be tamper-proof, such as certificates and official records. Built on Hyperledger Fabric research, not just a trend.',
			points: [
				'Smart contracts and chaincode',
				'Records that cannot be silently altered',
				'Networks with Raft consensus',
				'Web interfaces for non-technical users'
			]
		}
	] as const;

	const education = [
		{
			level: "Master's",
			title: 'Master of Computer Science',
			place: 'Universitas Budi Luhur',
			year: '2024 - 2026',
			text: 'Research on data modeling, enterprise architecture for healthcare digitalization, and Hyperledger Fabric blockchain. Three articles published in scientific journals.'
		},
		{
			level: "Bachelor's",
			title: 'Bachelor of Computer Science',
			place: 'STT Terpadu Nurul Fikri',
			year: '2017 - 2021',
			text: '1st place in the Astro II Web Development Hackathon, 2nd and 3rd place in Smart City Web Development, 3rd place in Web Design, and finalist in the Jamkrindo Hackathon.'
		},
		{
			level: 'Vocational High School',
			title: 'Software Engineering',
			place: 'SMKN 1 Cibinong',
			year: '2014 - 2017',
			text: 'Where I started building software, with a WordPress multiposting plugin as the final project.'
		}
	];

	const experienceHighlights = [
		'8+ years of experience as a Software Engineer',
		'Currently at Tripasysfo and Join PKS, and taking freelance projects',
		'Experienced in building systems for urban villages, districts, city agencies and local governments'
	];

	// Learning and Campus work is left out on purpose: this page is about client work.
	const categoryInfo = [
		{
			slug: 'government',
			icon: 'landmark',
			label: 'Government Agencies',
			text: 'Information systems for agencies and local governments, public services and civil-service apps.'
		},
		{
			slug: 'company',
			icon: 'briefcase',
			label: 'Company',
			text: 'Products for companies and clients, as an employee, intern or freelancer.'
		},
		{
			slug: 'organization',
			icon: 'users',
			label: 'Organization',
			text: 'Systems for communities, political groups and campus organizations.'
		},
		{
			slug: 'research',
			icon: 'flask',
			label: 'Research',
			text: 'Blockchain, data and IoT development from graduate research.'
		}
	] as const;

	const projectCategories = categoryInfo.map((c) => ({
		...c,
		count: categories.find((cat) => cat.slug === c.slug)?.projects.length ?? 0
	}));

	const governmentCount = categories.find((c) => c.slug === 'government')?.projects.length ?? 0;

	const description = `Website & information system development for agencies, organizations and companies. ${governmentCount} government systems, ${projectCountLabel} projects, 8+ years of engineering. Consult via WhatsApp.`;

	const stats = [
		{ value: String(governmentCount), label: 'government systems' },
		{ value: projectCountLabel, label: 'projects delivered' },
		{ value: '8+', label: 'years of experience' },
		{ value: 'MSc', label: 'Computer Science' }
	];

	// Every claim here is backed by something on /projects, /experience or /education.
	const differentiators = [
		{
			icon: 'landmark',
			title: 'I know how agencies work',
			text: `${governmentCount} systems delivered for urban villages, districts and city agencies. Multi-level workflows, periodic reports and role-based access are nothing new to me.`
		},
		{
			icon: 'users',
			title: 'Work directly with the engineer',
			text: 'You talk to the person who writes the code, with no layer of sales or project managers translating your needs.'
		},
		{
			icon: 'graduation-cap',
			title: 'Grounded in computer science, not guesswork',
			text: 'Master of Computer Science with research in data and blockchain, and three journal articles. A good fit for non-standard requirements.'
		},
		{
			icon: 'lock',
			title: 'Built around your workflow',
			text: 'No forced templates. The system follows how your organization works, so your team does not have to change its habits just to fit the app.'
		}
	] as const;

	// Real systems from /projects, grouped by the problem they solve.
	const useCases = [
		{
			icon: 'users',
			title: 'Performance & staffing',
			text: 'Daily activity logs, supervisor appraisals and workforce performance recaps.',
			examples: ['E-Kinerja PJLP', 'ESETKO PJLP', 'SIVERJAB']
		},
		{
			icon: 'file-text',
			title: 'Permits & public services',
			text: 'Citizen applications, file status tracking and public reporting.',
			examples: ['SIP', 'SITEMAN-NIB', 'PAMOR', 'PPID']
		},
		{
			icon: 'search',
			title: 'Archives, contracts & procurement',
			text: 'Indexed, searchable digital documents, contract workflows and goods requisitions.',
			examples: ['Arsip', 'SIARIS', 'E-Contract', 'E-RKBU']
		},
		{
			icon: 'map-pin',
			title: 'Health & environment',
			text: 'Field data entry by officers and monitoring of cases or area conditions.',
			examples: ['Posyandu', 'DBD', 'PSN', 'Penataan']
		}
	] as const;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Muhammad Azhar Rasyad - Website & Information System Development',
		url,
		image,
		email: 'mailto:muhazharrasyad@gmail.com',
		telephone: '+6281290351971',
		areaServed: { '@type': 'Country', name: 'Indonesia' },
		knowsAbout: [
			'Government information systems',
			'Web applications',
			'Website company profile',
			'Data migration from Excel',
			'Blockchain Hyperledger Fabric'
		],
		address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
		founder: { '@type': 'Person', name: 'Muhammad Azhar Rasyad', url: 'https://mazharrasyad.tech/' },
		makesOffer: services.map((s) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: s.title, description: s.text }
		}))
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

<div class="relative min-h-[calc(100dvh-3.5rem)] text-white p-4 md:p-8 w-full pb-28 md:pb-12">
	<div aria-hidden="true" class="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[900px]"></div>
	<main class="relative max-w-3xl mx-auto w-full space-y-14 md:space-y-20 pt-4 md:pt-10">
		<!-- Hero -->
		<section class="text-center md:text-left">
			<span
				class="inline-flex items-center gap-1.5 mb-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-widest"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Taking new projects
			</span>
			<h1 class="text-3xl md:text-5xl font-black leading-tight">
				<span
					class="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent"
					>Website &amp; Information System</span
				> Development
			</h1>
			<p class="mt-4 text-base md:text-lg text-slate-300 max-w-2xl">
				Specializing in systems for agencies, organizations and companies that want to move from Excel
				and paper to applications people actually use. With you from understanding your needs until
				the system is up and running.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="jasa-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Consult via WhatsApp
				</a>
			</div>
			<dl class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each stats as st (st.label)}
					<div class="rounded-2xl bg-white/5 border border-white/10 p-4 text-center md:text-left">
						<dt class="sr-only">{st.label}</dt>
						<dd class="text-2xl md:text-3xl font-black text-blue-300">{st.value}</dd>
						<dd class="mt-0.5 text-xs text-slate-400">{st.label}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<!-- Why me -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Why work with me</h2>
			<p class="text-sm text-slate-400 mb-6">
				Not a big agency, and not an off-the-shelf template.
			</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each differentiators as d (d.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div
							class="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center"
						>
							<Icon name={d.icon} class="w-5 h-5" />
						</div>
						<h3 class="mt-4 font-bold text-white">{d.title}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{d.text}</p>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Use cases -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Problems I have solved</h2>
			<p class="text-sm text-slate-400 mb-6">
				Real systems already in use, grouped by the need they serve.
			</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each useCases as u (u.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center gap-3">
							<div
								class="w-10 h-10 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
							>
								<Icon name={u.icon} class="w-5 h-5" />
							</div>
							<h3 class="font-bold text-white">{u.title}</h3>
						</div>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{u.text}</p>
						<ul class="mt-3 flex flex-wrap gap-1.5">
							{#each u.examples as ex (ex)}
								<li
									class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300"
								>
									{ex}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
			<a
				href="/projects"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				See all projects
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Services -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Services</h2>
			<p class="text-sm text-slate-400 mb-6">What I can build for you.</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each services as s (s.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div
							class="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
						>
							<Icon name={s.icon} class="w-5 h-5" />
						</div>
						<h3 class="mt-4 font-bold text-white">{s.title}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{s.text}</p>
						<ul class="mt-3 space-y-1.5">
							{#each s.points as point (point)}
								<li class="flex items-start gap-2 text-sm text-slate-300">
									<Icon name="check" class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
									{point}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Education -->
		<section>
			<div class="flex items-center gap-3 mb-2">
				<div
					class="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 flex items-center justify-center"
				>
					<Icon name="graduation-cap" class="w-5 h-5" />
				</div>
				<h2 class="text-2xl md:text-3xl font-black">Educational Background</h2>
			</div>
			<p class="text-sm text-slate-400 mb-6">
				Built on a solid academic foundation, not trial and error.
			</p>
			<ul class="space-y-3">
				{#each education as e (e.level)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center justify-between gap-3">
							<span
								class="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold"
								>{e.level}</span
							>
							<span class="text-xs text-slate-400">{e.year}</span>
						</div>
						<h3 class="mt-2 font-bold text-white">{e.title}</h3>
						<p class="text-sm text-slate-400">{e.place}</p>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{e.text}</p>
					</li>
				{/each}
			</ul>
			<a
				href="/education"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				See full education history
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Experience -->
		<section>
			<div class="flex items-center gap-3 mb-6">
				<div
					class="w-11 h-11 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
				>
					<Icon name="briefcase" class="w-5 h-5" />
				</div>
				<h2 class="text-2xl md:text-3xl font-black">Work Experience</h2>
			</div>
			<ul class="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2.5">
				{#each experienceHighlights as h (h)}
					<li class="flex items-start gap-2 text-sm text-slate-300">
						<Icon name="check" class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
						{h}
					</li>
				{/each}
			</ul>
			<a
				href="/experience"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				See full experience
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Projects -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Past Projects</h2>
			<p class="text-sm text-slate-400 mb-6">
				Of the {projectCountLabel} projects delivered, {governmentCount} were for government agencies.
				Here is how they break down by category.
			</p>
			<ul class="grid grid-cols-2 gap-3 mb-4">
				{#each projectCategories as c (c.slug)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
						<div class="flex items-center justify-between">
							<div
								class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
							>
								<Icon name={c.icon} class="w-5 h-5" />
							</div>
							<span class="text-3xl md:text-4xl font-black text-blue-300">{c.count}</span>
						</div>
						<h3 class="mt-3 font-bold text-white">{c.label}</h3>
						<p class="mt-1 text-xs md:text-sm text-slate-300 leading-relaxed">{c.text}</p>
					</li>
				{/each}
			</ul>
			<a
				href="/projects"
				class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				See all projects
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Final CTA -->
		<section
			class="rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 p-6 md:p-10 text-center"
		>
			<h2 class="text-2xl md:text-3xl font-black">Tell me what you need</h2>
			<p class="mt-3 text-slate-300 max-w-xl mx-auto">
				Is your agency, organization or business still keeping records by hand? Walk me through the
				workflow first, and we will work out the system that fits best. Pricing is tailored to your
				needs and budget, so there are no fixed packages.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="jasa-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Chat WhatsApp
				</a>
				<a
					href="mailto:muhazharrasyad@gmail.com?subject=Website%2FApp%20Development%20Consultation"
					data-track-location="jasa-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Send Email
				</a>
			</div>
		</section>
	</main>
</div>
