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
