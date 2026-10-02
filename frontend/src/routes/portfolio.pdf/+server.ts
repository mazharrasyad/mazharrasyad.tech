import { buildPortfolioPdf } from '$lib/server/portfolio-pdf';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const pdf = await buildPortfolioPdf();
	return new Response(pdf, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Portfolio-Muhammad-Azhar-Rasyad.pdf"'
		}
	});
};
