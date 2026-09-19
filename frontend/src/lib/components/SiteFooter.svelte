<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<!-- Height (3.25rem) is part of the 6.75rem the pages subtract along with the navbar. -->
<footer
	class="h-[3.25rem] flex items-center justify-center gap-3 px-4 border-t border-white/10 bg-[#0f172a]/95"
>
	<p class="text-sm leading-tight text-slate-300">Interested in working together? Get in touch.</p>
	<a
		href="https://wa.me/+6281290351971"
		target="_blank"
		rel="noopener noreferrer"
		class="flex items-center gap-2 pl-3 pr-4 h-8 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:scale-105 transition-all border border-green-500/20"
	>
		<Icon name="whatsapp" class="w-4 h-4" />
		<span class="text-sm font-bold">WhatsApp</span>
	</a>
</footer>
