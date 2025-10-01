import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import NavigationSwiper from '../slider-navigation/navigationSwiper';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	// ref vers le container DOM du slider
	const sliderContainerRef = useRef( null );
	const { numberofslides, numberofslidesMobile } = attributes;

	return (
		<div { ...useBlockProps( { className: '--editor' } ) }>
			<InspectorControls>
				<PanelBody title="Paramètres du slider">
					<RangeControl
						label="Nombre de slides visibles"
						value={ numberofslides }
						onChange={ ( value ) =>
							setAttributes( { numberofslides: value } )
						}
						min={ 1 }
						max={ 10 }
						step={ 0.25 }
					/>
					<RangeControl
						label="Nombre de slides visibles sur mobile"
						value={ numberofslidesMobile }
						onChange={ ( value ) =>
							setAttributes( { numberofslidesMobile: value } )
						}
						min={ 1 }
						max={ 5 }
						step={ 0.25 }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="swiper-container" ref={ sliderContainerRef }>
				<div className="swiper-wrapper">
					<InnerBlocks
						allowedBlocks={ [ 'animablocks/slider-simple-item' ] }
					/>
				</div>
				<NavigationSwiper
					navigationDisplay={ true }
					paginationDisplay={ true }
				/>
			</div>
		</div>
	);
}
