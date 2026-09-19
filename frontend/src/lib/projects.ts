import yearsData from '$lib/data/projects.json';
import type { Project, YearData } from '$lib/types';

/** `year` is the group the project sits under; `month` (1-12) and `day` come from `updated` when present. */
export type ProjectWithYear = Project & { year: number; month: number | null; day: number };

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
		name: 'Government',
		description:
			'Government information systems: municipal and local-government agencies, public services and civil-service tooling.'
	},
	{
		name: 'Company',
		description:
			'Products built for companies and clients: as an employee, during internships and as a freelancer.'
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

const MONTH_INDEX = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Parses "25 May 2022" or "Jun 2026" into { month, day }; anything else has no month. */
function parseUpdated(updated?: string): { month: number | null; day: number } {
	const m = updated?.match(/^(?:(\d{1,2})\s+)?([A-Za-z]{3})[a-z]*\s+\d{4}$/);
	const month = m ? MONTH_INDEX.indexOf(m[2].toLowerCase()) + 1 : 0;
	return month > 0 ? { month, day: Number(m![1] ?? 0) } : { month: null, day: 0 };
}

// Newest first: year, then month, then day. Projects without a date keep
// their original order and sit after the dated ones of the same year.
const all: ProjectWithYear[] = years
	.flatMap((y) => y.projects.map((p) => ({ ...p, year: y.year, ...parseUpdated(p.updated) })))
	.sort(
		(a, b) =>
			b.year - a.year || (b.month ?? 0) - (a.month ?? 0) || b.day - a.day
	);

export const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const categories: Category[] = DEFINITIONS.map((def) => ({
	...def,
	slug: slugify(def.name),
	projects: all.filter((p) => p.group === def.name)
}));

export const totalProjects = all.length;
