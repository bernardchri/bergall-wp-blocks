import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderSimple = ( slider, attributes ) => {
	const container = slider.querySelector( '.anima-swiper-container' );

	if ( ! container ) return;

	new Swiper( container, {
		slidesPerView: attributes.numberofslides,
		grabCursor: true,
		spaceBetween: 24,
		speed: 500,
		modules: [ Navigation, Pagination ],
		pagination: {
			el: slider.querySelector( '.pagination' ),
		},
		navigation: {
			nextEl: slider.querySelector( '.button-next' ),
			prevEl: slider.querySelector( '.button-prev' ),
		},
		breakpoints: {
			0: { slidesPerView: attributes.numberofslidesMobile },
			768: { slidesPerView: attributes.numberofslides },
		},
	} );
};

document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = document.querySelectorAll(
		'.wp-block-anima-slider-simple'
	);
	sliders.forEach( ( slider ) => {
		sliderSimple( slider, {
			numberofslides: slider.dataset.numberofslides,
			numberofslidesMobile: slider.dataset.numberofslidesmobile,
		} );
	} );
} );
