<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const title = `Projects ${data.year} - Muhammad Azhar Rasyad`;
	const description = `A collection of ${data.projects.length} software projects built in ${data.year} by Muhammad Azhar Rasyad, Software Engineer.`;
	const url = `https://mazharrasyad.tech/projects/${data.year}`;
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

<div class="min-h-screen text-white flex flex-col p-4 md:p-8 w-full">
	<header class="max-w-5xl mx-auto w-full mb-8 flex justify-between items-center">
		<a href="/" class="link-btn">
			<Icon name="arrow-left" class="w-4 h-4" /> <span>Projects</span>
		</a>
	</header>

	<main class="max-w-5xl mx-auto w-full flex-1">
		<h1 class="text-xl font-bold mb-8 flex justify-between items-center">
			<div class="flex items-center gap-3">
				<span class="px-3 py-1 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
					{data.year}
				</span>
				<span>Project List</span>
			</div>
			<span class="text-xs bg-white/5 border border-white/10 text-slate-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
				{data.projects.length} Projects
			</span>
		</h1>

		<div class="card-glass rounded-2xl px-3 md:px-4 divide-y divide-white/5">
			{#each data.projects as project, i (project.title)}
				<ProjectRow {project} index={i + 1} />
			{/each}
		</div>
	</main>
</div>
