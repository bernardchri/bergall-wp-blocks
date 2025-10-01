import { useBlockProps } from '@wordpress/block-editor';
import './style.css';

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
					{ /* <NavigationSwiper
						navigationDisplay={ true }
						paginationDisplay={ true }
					/> */ }
				</>
			) : (
				<p>Aucune image sélectionnée.</p>
			) }
		</div>
	);
}
