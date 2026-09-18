<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/education', label: 'Education' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/timeline', label: 'Timeline' }
	];

	// Year pages under /projects/ belong to the Timeline tab.
	function isActive(href: string) {
		const path = page.url.pathname.replace(/\/$/, '') || '/';
		if (href === '/timeline') return path === '/timeline' || path.startsWith('/projects');
		return path === href;
	}
</script>

<nav
	aria-label="Main"
	class="fixed bottom-0 inset-x-0 z-40 min-h-14 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 bg-[#0f172a]/95 backdrop-blur-md border-t border-white/10 [padding-bottom:env(safe-area-inset-bottom)]"
>
	{#each links as link (link.href)}
		<a
			href={link.href}
			aria-current={isActive(link.href) ? 'page' : undefined}
			class="shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all {isActive(
				link.href
			)
				? 'bg-blue-500 text-white'
				: 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'}"
		>
			{link.label}
		</a>
	{/each}
</nav>
