import type { Handle } from '@sveltejs/kit';

// The site is English except for the Indonesian ads landing page; runs at prerender time.
const indonesianPages = ['/konsultan-it'];

export const handle: Handle = ({ event, resolve }) => {
	const lang = indonesianPages.includes(event.url.pathname) ? 'id' : 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
