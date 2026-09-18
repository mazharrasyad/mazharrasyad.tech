import { error } from '@sveltejs/kit';
import yearsData from '$lib/data/projects.json';
import type { YearData } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

const years = yearsData as YearData[];

export const prerender = true;

export const entries: EntryGenerator = () => {
	return years.map((y) => ({ year: String(y.year) }));
};

export const load: PageLoad = ({ params }) => {
	const year = Number(params.year);
	const data = years.find((y) => y.year === year);

	if (!data) {
		error(404, 'Year not found');
	}

	return { year, projects: data.projects };
};
