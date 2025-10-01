import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';
import NavigationSwiper from '../slider-navigation/navigationSwiper.js';

export default function save({ attributes }) {
	const { slides, slidesPerView, slidesPerViewMobile } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div
			{...blockProps}
			className="anima-slider-image"
			data-slides={slidesPerView}
			data-slides-mobile={slidesPerViewMobile}
		>
			{slides.length > 0 ? (
				<>
					<div className="swiper-wrapper">
						{slides.map((slide) => (
							<div className="swiper-slide" key={slide.id}>
								<img src={slide.url} alt={slide.alt} onLoad={""} />
							</div>
						))}
					</div>
					{
						slides.length > 1 ? <NavigationSwiper
							navigationDisplay={true}
							paginationDisplay={true}
						/> :
							null
					}

				</>
			) : (
				<p></p>
			)}
		</div>
	);
}
