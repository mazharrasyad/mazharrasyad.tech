import yearsData from '$lib/data/projects.json';
import type { YearData } from '$lib/types';
import type { RequestHandler } from './$types';

export const prerender = true;

const SITE = 'https://mazharrasyad.tech';

export const GET: RequestHandler = () => {
	const years = yearsData as YearData[];

	const urls = [
		{ loc: `${SITE}/`, priority: '1.0' },
		...years.map((y) => ({ loc: `${SITE}/projects/${y.year}`, priority: '0.7' }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
