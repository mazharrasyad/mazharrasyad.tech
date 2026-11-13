<script lang="ts">
	import TimelineEntry from '$lib/components/TimelineEntry.svelte';
	import hackathonData from '$lib/data/hackathon.json';

	type Competition = { date: string; category: string; organizer: string; result: string };

	// Oldest first, as a track record.
	const entries = [...(hackathonData as Competition[])].sort((a, b) => a.date.localeCompare(b.date));

	// TimelineEntry reads "MM/YYYY" periods.
	function toPeriod(d: string) {
		const [y, m] = d.split('-');
		return `${m}/${y}`;
	}

	const count = (r: string) => entries.filter((e) => e.result === r).length;
	const stats = [
		{ label: 'Competitions', value: entries.length },
		{ label: '1st Place', value: count('1st Place') },
		{ label: 'Podium', value: entries.filter((e) => /Place$/.test(e.result)).length },
		{ label: 'Finalist', value: count('Finalist') }
	];

	function badge(result: string) {
		if (result === '1st Place') return 'bg-amber-500/20 border-amber-400/50 text-amber-300';
		if (result === '2nd Place') return 'bg-slate-300/15 border-slate-300/40 text-slate-200';
		if (result === '3rd Place') return 'bg-orange-700/25 border-orange-500/40 text-orange-300';
		if (result === 'Finalist') return 'bg-sky-500/20 border-sky-400/40 text-sky-300';
		return 'bg-white/5 border-white/15 text-slate-400';
	}

	const title = 'Hackathon - Muhammad Azhar Rasyad';
	const description = `${entries.length} IT competitions and hackathons joined by Muhammad Azhar Rasyad since 2018, including 1st place in Hackathon Software Development and UI/UX Design.`;
	const url = 'https://mazharrasyad.tech/hackathon';
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
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<div class="flex-1 text-white flex flex-col p-4 md:p-8 w-full">
	<main class="max-w-3xl mx-auto w-full flex-1 pt-4 md:pt-8">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-6">Hackathon</h1>

		<dl class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
			{#each stats as s (s.label)}
				<div class="card-glass rounded-2xl p-4 text-center">
					<dd class="text-3xl font-black text-amber-400 tabular-nums">{s.value}</dd>
					<dt class="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{s.label}</dt>
				</div>
			{/each}
		</dl>

		<div>
			{#each entries as e, i (i)}
				<TimelineEntry period={toPeriod(e.date)} accent="blue" currentLabel="" last={i === entries.length - 1}>
					<span
						class="inline-block mb-2 px-3 py-1 rounded-full border text-sm font-black uppercase tracking-wider {badge(e.result)}"
					>
						{e.result}
					</span>
					<h2 class="text-lg md:text-xl font-bold text-white leading-snug">{e.category}</h2>
					<p class="text-sm text-slate-300 mt-1">{e.organizer}</p>
				</TimelineEntry>
			{/each}
		</div>
	</main>
</div>
