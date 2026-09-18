<script lang="ts">
	import './layout.css';
	import Icon from '$lib/components/Icon.svelte';

	let { children } = $props();

	let showBackToTop = $state(false);

	function onScroll() {
		showBackToTop = window.scrollY > 600;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={onScroll} />

{@render children()}

{#if showBackToTop}
	<button
		type="button"
		onclick={scrollToTop}
		aria-label="Back to top"
		class="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-blue-500/15 backdrop-blur-md border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-black/30 hover:bg-blue-500/25 hover:scale-110 transition-all"
	>
		<Icon name="arrow-up" class="w-4 h-4" />
	</button>
{/if}
