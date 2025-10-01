import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialisation Swiper pour tous les sliders du front
document.addEventListener('DOMContentLoaded', () => {
	const sliders = document.querySelectorAll('.anima-slider-image');
	console.log(sliders)
	if (sliders.length < 1) return;

	
	sliders.forEach((slider) => {
		// Evite de réinitialiser si déjà initialisé
		if (!slider.classList.contains('swiper-initialized')) {
			new Swiper(slider, {
				slidesPerView: parseInt(slider.dataset.slides) || 1,
				grabCursor: true,
				spaceBetween: 10,
				speed: 500,
				effect: 'fade',
				autoHeight: true,
				fadeEffect: {
					crossFade: true,
				},
				modules: [Navigation, Pagination, EffectFade],
				pagination: {
					el: slider.querySelector('.pagination'),
				},
				navigation: {
					nextEl: slider.querySelector('.button-next'),
					prevEl: slider.querySelector('.button-prev'),
				},
				breakpoints: {
					0: {
						slidesPerView:
							parseInt(slider.dataset.slidesMobile) || 1,
					},
					768: {
						slidesPerView: parseInt(slider.dataset.slides) || 1,
					},
				},
			});
			slider.classList.add('swiper-initialized');
		}
	});
});
