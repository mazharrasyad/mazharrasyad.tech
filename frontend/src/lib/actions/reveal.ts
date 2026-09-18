const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function reveal(node: HTMLElement) {
	if (typeof window === 'undefined' || prefersReducedMotion()) return;

	node.classList.add('reveal-hidden');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.remove('reveal-hidden');
				node.classList.add('reveal-visible');
				observer.disconnect();
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
