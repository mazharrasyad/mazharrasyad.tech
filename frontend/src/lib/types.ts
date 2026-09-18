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
}

export interface ScholarData {
	profileUrl: string;
	citations: number;
	hIndex: number;
	i10Index: number;
	publications: Publication[];
}
