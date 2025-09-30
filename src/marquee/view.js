document.addEventListener('DOMContentLoaded', () => {
	const marqueeContainer = document.querySelectorAll('.wp-block-animablocks-marquee.marquee-container');

	if (!marqueeContainer) return;

	marqueeContainer.forEach((container) => {
		const marqueeContent = container.querySelector('.marquee-content');

		if (marqueeContent) {
			const clonedContent = marqueeContent.cloneNode(true);
			clonedContent.querySelectorAll('p').forEach((p) => {
				p.setAttribute('aria-hidden', 'true');
			});
			marqueeContent.innerHTML += clonedContent.innerHTML + clonedContent.innerHTML;
		}
	});
});
