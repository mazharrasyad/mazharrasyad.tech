import { error } from '@sveltejs/kit';
import { categories } from '$lib/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return categories.map((c) => ({ category: c.slug }));
};

export const load: PageLoad = ({ params }) => {
	const category = categories.find((c) => c.slug === params.category);

	if (!category) {
		error(404, 'Category not found');
	}

	return { category };
};
