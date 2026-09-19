import { error, redirect } from '@sveltejs/kit';
import { categories, pageCategories, TAB_ONLY_SLUGS } from '$lib/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return pageCategories.map((c) => ({ category: c.slug }));
};

export const load: PageLoad = ({ params }) => {
	if (TAB_ONLY_SLUGS.includes(params.category)) {
		redirect(301, '/projects');
	}

	const category = categories.find((c) => c.slug === params.category);

	if (!category) {
		error(404, 'Category not found');
	}

	return { category };
};
