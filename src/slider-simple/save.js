import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import NavigationSwiper from '../../src/components/navigation-swiper';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function Save( { attributes } ) {
	const { numberofslides, numberofslidesMobile, autoplay, interval } =
		attributes;

	const blockProps = useBlockProps.save( {
		'data-numberofslides': numberofslides,
		'data-numberofslidesmobile': numberofslidesMobile,
		'data-autoplay': autoplay,
		'data-interval': interval,
	} );

	return (
		<div { ...blockProps }>
			<div className="anima-swiper-container">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<NavigationSwiper
					paginationDisplay={ true }
					navigationDisplay={ true }
				/>
			</div>
		</div>
	);
}

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
