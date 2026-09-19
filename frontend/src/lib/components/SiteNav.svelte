<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Profile' },
		{ href: '/education', label: 'Education' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/journal', label: 'Journal' },
		{ href: '/jasa', label: 'Jasa' }
	];

	// Category pages under /projects/ belong to the Projects tab.
	function isActive(href: string) {
		const path = page.url.pathname.replace(/\/$/, '') || '/';
		if (href === '/projects') return path.startsWith('/projects');
		return path === href;
	}
</script>

<nav
	aria-label="Main"
	class="sticky top-0 z-40 h-14 shrink-0 flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto hide-scrollbar px-4 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10"
>
	{#each links as link (link.href)}
		<a
			href={link.href}
			aria-current={isActive(link.href) ? 'page' : undefined}
			class="shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all {isActive(
				link.href
			)
				? 'bg-blue-500 text-white'
				: 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
		>
			{link.label}
		</a>
	{/each}
</nav>
