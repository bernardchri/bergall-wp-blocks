import { createTimeline, stagger } from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
	const headers = document.querySelectorAll(
		'.wp-block-animablocks-header-minimalist.header-minimalist'
	);
	
	if (!headers) return

	headers.forEach((header) => {
		const menuButton = header.querySelector('.header-minimalist__button');
		const menu = header.querySelector('.header-minimalist__menuburger');

		menuButton?.addEventListener('click', () => {
			const isOpen = menu.dataset.open === 'true';
			menu.dataset.open = !isOpen;
			menuButton.dataset.open = !isOpen;

			const tl = createTimeline({ autoplay: false });
			tl.set(
				'.header-minimalist .header-minimalist__menuburger ul li a',
				{ overflow: 'hidden' }
			).set(
				'.header-minimalist .header-minimalist__menuburger ul li a span',
				{ opacity: 0 }
			);

			if (!isOpen) {
				tl.add(
					'.header-minimalist .header-minimalist__menuburger ul li a span',
					{
						opacity: [0, 1],
						y: [40, 0],
						delay: stagger(50, { start: 150 }),
						duration: 400,
					}
				);
				tl.play();
			} else {
				tl.restart().pause();
			}
		});
	});
});
