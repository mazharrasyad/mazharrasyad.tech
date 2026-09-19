<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
</script>

<!-- Sits after the page content; pages are at least one screen tall, so it only shows once you scroll to the end. -->
<footer
	class="min-h-[3.25rem] py-2 flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-2 px-4 text-center border-t border-white/10 bg-[#0f172a]/95"
>
	<p class="text-sm leading-tight text-slate-300">
		Interested in working together? Get in touch via
	</p>
	<a
		href="https://wa.me/+6281290351971"
		target="_blank"
		rel="noopener noreferrer"
		class="inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg bg-green-500 text-white text-sm font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-md shadow-green-500/20"
	>
		<Icon name="whatsapp" class="w-4 h-4" />
		WhatsApp
	</a>
</footer>
