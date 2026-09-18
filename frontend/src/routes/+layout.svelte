<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	{@render children()}
	<footer class="text-center py-8">
		<p class="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
			&copy; {new Date().getFullYear()} Muhammad Azhar Rasyad
		</p>
	</footer>
</div>
