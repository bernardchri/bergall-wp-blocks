import { useBlockProps } from '@wordpress/block-editor';
import NavigationSwiper from '../../src/components/navigation-swiper';
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function save( { attributes } ) {
	const { slides, slidesPerView, slidesPerViewMobile } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div
			{ ...blockProps }
			className="anima-slider-image"
			data-slides={ slidesPerView }
			data-slides-mobile={ slidesPerViewMobile }
		>
			{ slides.length > 0 ? (
				<>
					<div className="swiper-wrapper">
						{ slides.map( ( slide ) => (
							<div className="swiper-slide" key={ slide.id }>
								<img src={ slide.url } alt={ slide.alt } />
							</div>
						) ) }
					</div>
					<NavigationSwiper
						navigationDisplay={ true }
						paginationDisplay={ true }
					/>
				</>
			) : (
				<p>Aucune image sélectionnée.</p>
			) }
		</div>
	);
}

// Initialisation Swiper pour tous les sliders du front
document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = document.querySelectorAll( '.anima-slider-image' );

	sliders.forEach( ( slider ) => {
		// Evite de réinitialiser si déjà initialisé
		if ( ! slider.classList.contains( 'swiper-initialized' ) ) {
			new Swiper( slider, {
				slidesPerView: parseInt( slider.dataset.slides ) || 1,
				grabCursor: true,
				spaceBetween: 10,
				speed: 500,
				effect: 'fade',
				fadeEffect: {
					crossFade: true,
				},
				modules: [ Navigation, Pagination, EffectFade ],
				pagination: {
					el: slider.querySelector( '.pagination' ),
				},
				navigation: {
					nextEl: slider.querySelector( '.button-next' ),
					prevEl: slider.querySelector( '.button-prev' ),
				},
				breakpoints: {
					0: {
						slidesPerView:
							parseInt( slider.dataset.slidesMobile ) || 1,
					},
					768: {
						slidesPerView: parseInt( slider.dataset.slides ) || 1,
					},
				},
			} );
			slider.classList.add( 'swiper-initialized' );
		}
	} );
} );
