import yearsData from '$lib/data/projects.json';
import type { Project, YearData } from '$lib/types';

export type ProjectWithYear = Project & { year: number };

export interface Category {
	name: string;
	slug: string;
	description: string;
	projects: ProjectWithYear[];
}

// Ordered as they appear in the tabs. `Project.group` in projects.json must
// match one of these names.
const DEFINITIONS = [
	{
		name: 'Diklat',
		description:
			'Government information systems: municipal and local-government agencies, public services and civil-service tooling.'
	},
	{
		name: 'Company',
		description: 'Products built for private companies as an employee and during internships.'
	},
	{
		name: 'Freelance',
		description: 'Client work delivered as an independent software engineer.'
	},
	{
		name: 'Organization',
		description: 'Systems for communities, political groups and campus organizations.'
	},
	{
		name: 'Research',
		description: 'Blockchain, data and IoT work from graduate research.'
	},
	{
		name: 'Campus',
		description: 'Coursework, prototypes and hackathon entries from my bachelor studies.'
	},
	{
		name: 'Learning',
		description:
			'Bootcamps, open classes, online courses, tutorials and experiments made while learning.'
	}
] as const;

const years = yearsData as YearData[];

const all: ProjectWithYear[] = [...years]
	.sort((a, b) => b.year - a.year)
	.flatMap((y) => y.projects.map((p) => ({ ...p, year: y.year })));

export const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const categories: Category[] = DEFINITIONS.map((def) => ({
	...def,
	slug: slugify(def.name),
	projects: all.filter((p) => p.group === def.name)
}));

export const totalProjects = all.length;
