export interface Project {
	title: string;
	category: string;
	images: string[];
	description: string;
	tools: string;
	updated?: string;
	visibility: 'Public' | 'Private';
	sourceUrl: string;
}

export interface YearData {
	year: number;
	projects: Project[];
}

export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year: number;
	citations: number | null;
	url: string;
}

export interface ScholarData {
	profileUrl: string;
	citations: number;
	hIndex: number;
	i10Index: number;
	publications: Publication[];
}

export interface Education {
	sortKey: number;
	field: string;
	level: string;
	degree: string;
	institution: string;
	year: string;
	highlights: string[];
}

export interface Experience {
	sortKey: number;
	title: string;
	company: string;
	type: string;
	period: string;
	bullets: string[];
}
