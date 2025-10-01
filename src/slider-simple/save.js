import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import NavigationSwiper from '../slider-navigation/navigationSwiper';
import './style.scss';

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
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<NavigationSwiper
					navigationDisplay={ true }
					paginationDisplay={ true }
				/>
			</div>
		</div>
	);
}
