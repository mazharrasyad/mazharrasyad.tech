<script lang="ts">
	import CategoryList from '$lib/components/CategoryList.svelte';
	import { categories, totalProjects } from '$lib/projects';

	// Tabs are the only way to switch category: no horizontal swiping, so a
	// stray touch/drag can't jump to another category.
	let activeIndex = $state(0);

	const active = $derived(categories[activeIndex]);

	function select(i: number) {
		activeIndex = i;
		window.scrollTo({ top: 0 });
	}

	const title = 'Projects - Muhammad Azhar Rasyad';
	const description = `${totalProjects}+ software projects by Muhammad Azhar Rasyad, grouped by where they came from: Government, Company, Organization, Research, Campus and Learning.`;
	const url = 'https://mazharrasyad.tech/projects';
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

<main class="w-full flex flex-col min-h-[calc(100dvh-3.5rem)]">
	<!-- Category tabs -->
	<div
		class="sticky top-14 z-30 shrink-0 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 py-3 border-b border-white/10 bg-[#0f172a]/95 backdrop-blur-md"
	>
		{#each categories as category, i (category.slug)}
			<button
				type="button"
				onclick={() => select(i)}
				aria-pressed={activeIndex === i}
				class="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all {activeIndex ===
				i
					? 'bg-blue-500 text-white'
					: 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
			>
				{category.name}
				<span class="tabular-nums {activeIndex === i ? 'text-blue-100' : 'text-slate-400'}">
					{category.projects.length}
				</span>
			</button>
		{/each}
	</div>

	<section class="w-full flex-1 px-4 md:px-8 py-8 md:py-12">
		<div class="max-w-4xl mx-auto w-full flex flex-col gap-4 md:gap-5">
			<h1 class="text-4xl md:text-6xl font-black text-white">{active.name}</h1>
			<CategoryList category={active} />
		</div>
	</section>
</main>
