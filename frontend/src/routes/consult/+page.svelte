<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categories, projectCountLabel } from '$lib/projects';

	// Google Ads landing page for the IT consulting campaign.
	const title = 'IT Consultant for Businesses & Institutions - Muhammad Azhar Rasyad';
	const url = 'https://mazharrasyad.tech/consult';
	const image = 'https://mazharrasyad.tech/logo.png';

	const waText = encodeURIComponent(
		'Hi Azhar, I found mazharrasyad.tech and would like an IT consultation. When are you available?'
	);
	const waUrl = `https://wa.me/6281290351971?text=${waText}`;
	const mailUrl = 'mailto:muhazharrasyad@gmail.com?subject=IT%20consultation';

	const governmentCount = categories.find((c) => c.slug === 'government')?.projects.length ?? 0;

	const description = `Independent IT consultant based in Jakarta: system planning, application audits, technology selection and digital transformation. MSc in Computer Science, 8+ years, ${projectCountLabel} projects.`;

	const stats = [
		{ value: '8+', label: 'years of experience' },
		{ value: projectCountLabel, label: 'projects delivered' },
		{ value: String(governmentCount), label: 'government systems built' },
		{ value: 'MSc', label: 'Computer Science' }
	];

	// Pain points a prospect searching "IT consultant" typically arrives with.
	const problems = [
		'Your processes still run on spreadsheets, paper or WhatsApp groups, and it is getting messy',
		'You want to build an application but do not know where to start or what it should cost',
		'You already have a system, but it is slow, keeps breaking, or the vendor is gone',
		'You have several IT vendor quotes and cannot tell which one makes sense'
	];

	const services = [
		{
			icon: 'search',
			title: 'Requirements Analysis & System Planning',
			text: 'I map how your team works and turn it into a clear system plan before any development money is spent.',
			points: [
				'Mapping your current business processes',
				'Feature specification and priorities',
				'Time and budget estimates',
				'A phased development roadmap'
			]
		},
		{
			icon: 'lock',
			title: 'Application Audit & Review',
			text: 'A thorough review of your existing application: what is broken, what is risky, and what is worth keeping.',
			points: [
				'Code and database structure review',
				'Basic security and access-control checks',
				'Performance and bottleneck analysis',
				'Recommendation: fix it or rebuild it'
			]
		},
		{
			icon: 'server',
			title: 'Architecture & Technology Selection',
			text: 'Choosing the technology, hosting and integration approach that fits your scale and budget, not whatever is trending.',
			points: [
				'Stack and framework selection',
				'Hosting, servers and cloud',
				'System and API integration',
				'Buy off-the-shelf or build custom'
			]
		},
		{
			icon: 'landmark',
			title: 'Digital Transformation & Enterprise Architecture',
			text: 'Digitizing how your organization works in a structured way, backed by research in enterprise architecture for service digitalization.',
			points: [
				'Moving off spreadsheets and paper',
				'Multi-level approval workflows',
				'Consistent data across departments',
				'Dashboards for decision-making'
			]
		},
		{
			icon: 'briefcase',
			title: 'IT Project & Vendor Oversight',
			text: 'An independent second opinion so your IT project stays on course and the budget does not balloon.',
			points: [
				'Reviewing vendor quotes and proposals',
				'Writing technical requirements and RFPs',
				'Monitoring development progress',
				'Acceptance testing before handover'
			]
		},
		{
			icon: 'monitor',
			title: 'Implementation When You Need It',
			text: 'Recommendations do not have to stop at a document: I can also build the system and get it running.',
			points: [
				'Web apps and information systems',
				'Dashboards and data reports',
				'APIs for web and mobile',
				'Blockchain for document verification'
			]
		}
	] as const;

	const differentiators = [
		{
			icon: 'users',
			title: 'Talk directly to the consultant',
			text: 'You work with someone who understands the technical side down to the code, with no sales layer in between.'
		},
		{
			icon: 'graduation-cap',
			title: 'Grounded in computer science, not guesswork',
			text: 'Master of Computer Science with research in enterprise architecture, data modeling and blockchain, and three journal articles.'
		},
		{
			icon: 'landmark',
			title: 'Proven on complex workflows',
			text: `${governmentCount} systems built for Jakarta government agencies, from urban villages to city-level offices: multi-level approvals, periodic reporting and role-based access.`
		},
		{
			icon: 'check',
			title: 'Independent and objective',
			text: 'Not tied to any vendor or product, so what I recommend is what actually fits your needs.'
		}
	] as const;

	const process = [
		{
			title: 'Initial discussion',
			text: 'Tell me about your situation and goals on WhatsApp or email, and we map out the core problem together.'
		},
		{
			title: 'Analysis & recommendation',
			text: 'I study your requirements and existing systems, then send a written recommendation with scope, timeline and cost.'
		},
		{
			title: 'Execution',
			text: 'The recommendation is carried out, either built by me or with me guiding your team or vendor.'
		},
		{
			title: 'Ongoing support',
			text: 'Once the system is live, your team gets the documentation and guidance to run it.'
		}
	];

	const faqs = [
		{
			q: 'What does an IT consultant do?',
			a: 'Helps you make the right technology decisions: analyzing requirements, designing systems, choosing technology and vendors, auditing existing applications, and guiding the implementation.'
		},
		{
			q: 'How much does an IT consultant cost?',
			a: 'Pricing is quoted per engagement based on scope and duration, not fixed packages. After the initial discussion you receive a written scope and cost before any work starts.'
		},
		{
			q: 'Can you also build the application?',
			a: 'Yes. Besides consulting, I build web apps, dashboards, APIs and information systems, so recommendations can be put into practice right away.'
		},
		{
			q: 'Do you work with clients outside Jakarta?',
			a: 'Yes. Consulting and delivery are done online, so I work with businesses and institutions across Indonesia and abroad.'
		},
		{
			q: 'Who is this for?',
			a: 'Small and growing businesses digitizing how they work, institutions planning an information system, and teams that need a second opinion on an IT project or vendor.'
		}
	];

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			name: 'Muhammad Azhar Rasyad - IT Consultant',
			url,
			image,
			description,
			email: 'mailto:muhazharrasyad@gmail.com',
			telephone: '+6281290351971',
			areaServed: 'Worldwide',
			address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
			founder: { '@type': 'Person', name: 'Muhammad Azhar Rasyad', url: 'https://mazharrasyad.tech/' },
			makesOffer: services.map((s) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: s.title, description: s.text }
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((f) => ({
				'@type': 'Question',
				name: f.q,
				acceptedAnswer: { '@type': 'Answer', text: f.a }
			}))
		}
	];
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
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Independent IT Consultant
			</span>
			<h1 class="text-3xl md:text-5xl font-black leading-tight">
				IT Consultant for <span
					class="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent"
					>Businesses &amp; Institutions</span
				>
			</h1>
			<p class="mt-4 text-base md:text-lg text-slate-300 max-w-2xl">
				Make the right technology decisions before the budget is spent: from system planning and
				application audits to choosing technology and vendors, and digitizing how your team works.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="consult-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Consult on WhatsApp
				</a>
				<a
					href={mailUrl}
					data-track-location="consult-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Send Email
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

		<!-- Problems -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Sound familiar?</h2>
			<p class="text-sm text-slate-400 mb-6">The problems clients most often bring to the first conversation.</p>
			<ul class="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
				{#each problems as p (p)}
					<li class="flex items-start gap-2 text-sm md:text-base text-slate-300">
						<Icon name="check" class="w-4 h-4 mt-1 shrink-0 text-emerald-400" />
						{p}
					</li>
				{/each}
			</ul>
		</section>

		<!-- Services -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">IT Consulting Services</h2>
			<p class="text-sm text-slate-400 mb-6">From planning to a system that runs.</p>
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

		<!-- Why me -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Why consult with me</h2>
			<p class="text-sm text-slate-400 mb-6">Not a big agency, and not template answers.</p>
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
			<div class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
				<a href="/projects" class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200">
					See all {projectCountLabel} projects
					<Icon name="arrow-right" class="w-4 h-4" />
				</a>
				<a href="/journal" class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200">
					See journal publications
					<Icon name="arrow-right" class="w-4 h-4" />
				</a>
			</div>
		</section>

		<!-- Process -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">How it works</h2>
			<p class="text-sm text-slate-400 mb-6">Online from Jakarta (UTC+7), for clients in Indonesia and abroad.</p>
			<ol class="grid gap-3 md:grid-cols-2">
				{#each process as step, i (step.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center gap-3">
							<span
								class="w-9 h-9 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center font-black tabular-nums"
								>{i + 1}</span
							>
							<h3 class="font-bold text-white">{step.title}</h3>
						</div>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{step.text}</p>
					</li>
				{/each}
			</ol>
		</section>

		<!-- FAQ -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-6">Frequently asked questions</h2>
			<div class="space-y-3">
				{#each faqs as f (f.q)}
					<details class="group rounded-2xl bg-white/5 border border-white/10 p-5">
						<summary class="cursor-pointer list-none flex items-center justify-between gap-3 font-bold text-white">
							{f.q}
							<Icon name="chevron-right" class="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
						</summary>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{f.a}</p>
					</details>
				{/each}
			</div>
		</section>

		<!-- Final CTA -->
		<section
			class="rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 p-6 md:p-10 text-center"
		>
			<h2 class="text-2xl md:text-3xl font-black">Let's talk about your IT needs</h2>
			<p class="mt-3 text-slate-300 max-w-xl mx-auto">
				Tell me how your systems and processes work today. I will help you pin down the problem and
				suggest the most sensible next step for your budget.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="consult-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Consult on WhatsApp
				</a>
				<a
					href={mailUrl}
					data-track-location="consult-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Send Email
				</a>
			</div>
		</section>
	</main>
</div>

<!-- Ad visitors are mostly on phones: keep the WhatsApp button within thumb reach. -->
<a
	href={waUrl}
	target="_blank"
	rel="noopener noreferrer"
	data-track-location="consult-sticky"
	class="md:hidden fixed bottom-4 inset-x-4 z-40 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-black/40"
>
	<Icon name="whatsapp" class="w-5 h-5" />
	Consult on WhatsApp
</a>
