<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { initAnalytics, trackContact, trackPageView } from '$lib/analytics';
	import Icon from '$lib/components/Icon.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();

	// The profile page is a single screen and /jasa has its own contact CTAs; the footer's prompt is redundant on both.
	const showFooter = $derived(!['/', '/jasa'].includes(page.url.pathname.replace(/\/$/, '') || '/'));

	let showBackToTop = $state(false);

	// Runs on first load and after every client-side route change.
	afterNavigate(() => {
		initAnalytics();
		trackPageView(page.url.pathname, document.title);
	});

	// One delegated listener covers every WhatsApp / email link on every page.
	function onClick(event: MouseEvent) {
		const link = (event.target as Element | null)?.closest('a');
		const href = link?.getAttribute('href') ?? '';
		const where = link?.dataset.trackLocation ?? page.url.pathname;
		if (/^https:\/\/wa\.me\//.test(href)) trackContact('whatsapp', where);
		else if (href.startsWith('mailto:')) trackContact('email', where);
	}

	function onScroll() {
		showBackToTop = window.scrollY > 600;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={onScroll} onclick={onClick} />

<SiteNav />

{@render children()}

{#if showFooter}
	<SiteFooter />
{/if}

{#if showBackToTop}
	<button
		type="button"
		onclick={scrollToTop}
		aria-label="Back to top"
		class="fixed bottom-20 right-6 z-50 w-11 h-11 rounded-full bg-blue-500/15 backdrop-blur-md border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-black/30 hover:bg-blue-500/25 hover:scale-110 transition-all"
	>
		<Icon name="arrow-up" class="w-4 h-4" />
	</button>
{/if}
