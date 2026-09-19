<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import CategoryList from '$lib/components/CategoryList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const category = $derived(data.category);
	const title = $derived(`${category.name} Projects - Muhammad Azhar Rasyad`);
	const description = $derived(
		`${category.projects.length} ${category.name.toLowerCase()} projects by Muhammad Azhar Rasyad, Software Engineer. ${category.description}`
	);
	const url = $derived(`https://mazharrasyad.tech/projects/${category.slug}`);
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

<div class="min-h-[calc(100dvh-6.75rem)] text-white flex flex-col p-4 md:p-8 w-full">
	<header class="max-w-4xl mx-auto w-full mb-8 flex justify-between items-center">
		<a href="/projects" class="link-btn">
			<Icon name="arrow-left" class="w-4 h-4" /> <span>Projects</span>
		</a>
	</header>

	<main class="max-w-4xl mx-auto w-full flex-1">
		<h1 class="text-4xl md:text-6xl font-black text-white mb-6">{category.name}</h1>
		<CategoryList {category} />
	</main>
</div>
