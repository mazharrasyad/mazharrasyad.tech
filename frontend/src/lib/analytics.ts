import { browser } from '$app/environment';
import tracking from '$lib/tracking.json';

// Measurement IDs live in tracking.json (also read by scripts/csp-hashes.mjs to
// open the CSP for exactly these vendors). Leave an ID empty to disable that
// vendor: nothing is loaded and no request leaves the page.
const GA4_ID = tracking.ga4Id.trim();
const ADS_ID = tracking.googleAdsId.trim();
// Conversion label of the Google Ads "lead" action, fired by trackContact().
const ADS_LEAD = ADS_ID && tracking.googleAdsLeadLabel.trim() ? `${ADS_ID}/${tracking.googleAdsLeadLabel.trim()}` : '';
const PIXEL_ID = tracking.metaPixelId.trim();

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & {
	callMethod?: (...args: unknown[]) => void;
	queue: unknown[][];
	loaded: boolean;
	version: string;
	push: unknown;
};

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: Gtag;
		fbq?: Fbq;
		_fbq?: Fbq;
	}
}

let started = false;

function loadScript(src: string) {
	const el = document.createElement('script');
	el.async = true;
	el.src = src;
	document.head.appendChild(el);
}

/** Loads GA4 and the Meta Pixel once. Safe to call repeatedly and during prerender. */
export function initAnalytics() {
	if (!browser || started) return;
	started = true;

	// GA4 and Google Ads share one gtag.js; it is loaded once with whichever ID is set.
	const gtagId = GA4_ID || ADS_ID;
	if (gtagId) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			// gtag.js requires the `arguments` object itself, not an array.
			// eslint-disable-next-line prefer-rest-params
			window.dataLayer!.push(arguments);
		};
		window.gtag('js', new Date());
		// Page views are sent per route change by trackPageView().
		if (GA4_ID) window.gtag('config', GA4_ID, { send_page_view: false });
		if (ADS_ID) window.gtag('config', ADS_ID);
		loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`);
	}

	if (PIXEL_ID) {
		// Standard Meta Pixel bootstrap, minus the inline <script> wrapper (the CSP forbids it).
		const fbq = function (...args: unknown[]) {
			if (fbq.callMethod) fbq.callMethod(...args);
			else fbq.queue.push(args);
		} as Fbq;
		fbq.push = fbq;
		fbq.loaded = true;
		fbq.version = '2.0';
		fbq.queue = [];
		window.fbq = fbq;
		window._fbq = fbq;
		window.fbq('init', PIXEL_ID);
		loadScript('https://connect.facebook.net/en_US/fbevents.js');
	}
}

/** Call on first load and after every client-side navigation. */
export function trackPageView(path: string, title: string) {
	if (!browser) return;
	window.gtag?.('event', 'page_view', {
		page_path: path,
		page_title: title,
		page_location: window.location.href
	});
	window.fbq?.('track', 'PageView');
}

/** A visitor tapped a way to contact you: the conversion you optimise ads for. */
export function trackContact(method: 'whatsapp' | 'email', location: string) {
	if (!browser) return;
	window.gtag?.('event', 'generate_lead', { method, location });
	if (ADS_LEAD) window.gtag?.('event', 'conversion', { send_to: ADS_LEAD, value: 1.0, currency: 'IDR' });
	window.fbq?.('track', 'Contact', { method, location });
}
