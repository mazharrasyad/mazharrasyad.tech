<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import CategoryList from '$lib/components/CategoryList.svelte';
	import { categories, totalProjects } from '$lib/projects';

	let track: HTMLDivElement | undefined = $state();
	let activeIndex = $state(0);

	function goToSlide(i: number) {
		if (!track) return;
		const clamped = Math.max(0, Math.min(categories.length - 1, i));
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

	const title = 'Projects - Muhammad Azhar Rasyad';
	const description = `${totalProjects}+ software projects by Muhammad Azhar Rasyad, grouped by where they came from: Diklat (government), Company, Freelance, Organization, Research, Campus and Learning.`;
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

<svelte:window onkeydown={onKeydown} />

<main class="w-full flex flex-col h-[calc(100dvh-3.5rem)]">
	<!-- Category tabs -->
	<div
		class="shrink-0 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 py-3 border-b border-white/10"
	>
		{#each categories as category, i (category.slug)}
			<button
				type="button"
				onclick={() => goToSlide(i)}
				class="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all {activeIndex ===
				i
					? 'bg-blue-500 text-white'
					: 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
			>
				{category.name}
				<span class="tabular-nums {activeIndex === i ? 'text-blue-100' : 'text-slate-500'}">
					{category.projects.length}
				</span>
			</button>
		{/each}
	</div>

	<div class="relative w-full flex-1 min-h-0">
		<div
			bind:this={track}
			onscroll={onTrackScroll}
			class="h-full w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
		>
			{#each categories as category (category.slug)}
				<section
					class="w-full h-full shrink-0 snap-center overflow-y-auto [content-visibility:auto] px-4 md:px-8 py-8 md:py-12"
				>
					<div class="max-w-3xl mx-auto w-full flex flex-col gap-4 md:gap-5">
						<h2 class="text-4xl md:text-6xl font-black text-white">{category.name}</h2>
						<CategoryList {category} />
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
			disabled={activeIndex === categories.length - 1}
			aria-label="Next"
			class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
		>
			<Icon name="chevron-right" class="w-5 h-5" />
		</button>
	</div>
</main>
