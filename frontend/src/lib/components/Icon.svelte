<script lang="ts">
	// Small hand-picked icon set (Feather Icons / Simple Icons, MIT-licensed),
	// inlined so the page never depends on the Font Awesome CDN.
	type IconName =
		| 'arrow-left'
		| 'arrow-up'
		| 'github'
		| 'linkedin'
		| 'google-scholar'
		| 'whatsapp'
		| 'mail'
		| 'map-pin'
		| 'file-text'
		| 'chevron-left'
		| 'chevron-right'
		| 'external-link'
		| 'search';

	let { name, class: klass = '' }: { name: IconName; class?: string } = $props();
</script>

{#if name === 'arrow-left'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
{:else if name === 'arrow-up'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
{:else if name === 'github'}
	<svg viewBox="0 0 24 24" fill="currentColor" class={klass}><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.5.11-3.13 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.63.24 2.83.12 3.13.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" /></svg>
{:else if name === 'linkedin'}
	<svg viewBox="0 0 24 24" fill="currentColor" class={klass}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
{:else if name === 'google-scholar'}
	<svg viewBox="0 0 24 24" fill="currentColor" class={klass}><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.24 14.978 9.5 12 9.5c-2.977 0-5.548 1.74-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /></svg>
{:else if name === 'whatsapp'}
	<svg viewBox="0 0 24 24" fill="currentColor" class={klass}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.82.5 3.52 1.36 4.98L2 22l5.25-1.44a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.11.86.83-3.03-.2-.31a8.14 8.14 0 0 1-1.26-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.78 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.51-3.67 8.1-8.13 8.1Zm4.47-6.08c-.24-.12-1.44-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" /></svg>
{:else if name === 'mail'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6 12 13 2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
{:else if name === 'map-pin'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
{:else if name === 'file-text'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
{:else if name === 'chevron-left'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><polyline points="15 18 9 12 15 6" /></svg>
{:else if name === 'chevron-right'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><polyline points="9 18 15 12 9 6" /></svg>
{:else if name === 'external-link'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
{:else if name === 'search'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={klass}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
{/if}
