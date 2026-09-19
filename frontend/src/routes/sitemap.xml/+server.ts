import { categories } from '$lib/projects';
import type { RequestHandler } from './$types';

export const prerender = true;

const SITE = 'https://mazharrasyad.tech';

export const GET: RequestHandler = () => {
	const urls = [
		{ loc: `${SITE}/`, priority: '1.0' },
		{ loc: `${SITE}/jasa`, priority: '0.9' },
		{ loc: `${SITE}/education`, priority: '0.8' },
		{ loc: `${SITE}/experience`, priority: '0.8' },
		{ loc: `${SITE}/projects`, priority: '0.8' },
		{ loc: `${SITE}/journal`, priority: '0.8' },
		...categories.map((c) => ({ loc: `${SITE}/projects/${c.slug}`, priority: '0.7' }))
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
