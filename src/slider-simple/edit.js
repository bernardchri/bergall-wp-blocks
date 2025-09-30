import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import NavigationSwiper from '../../src/components/navigation-swiper';

export default function Edit( { attributes, setAttributes } ) {
	// ref vers le container DOM du slider
	const sliderContainerRef = useRef( null );
	const refContainer = useRef( null );
	const { numberofslides, numberofslidesMobile } = attributes;
	const blockProps = useBlockProps( {
		style: { outline: '1px dotted grey', padding: '0.5rem' },
	} );

	useEffect( () => {
		if ( sliderContainerRef.current ) {
			// Détruire l'instance précédente si elle existe
			if ( sliderContainerRef.current.swiper ) {
				sliderContainerRef.current.swiper.destroy( true, true );
			}

			// Créer une nouvelle instance Swiper
			new Swiper( sliderContainerRef.current, {
				slidesPerView: numberofslides,
				modules: [ Navigation, Pagination ],
				navigation: {
					nextEl: sliderContainerRef.current.querySelector(
						'.button-next'
					),
					prevEl: sliderContainerRef.current.querySelector(
						'.button-prev'
					),
				},
				pagination: {
					el: sliderContainerRef.current.querySelector(
						'.pagination'
					),
					clickable: true,
				},
				// Ajoutez d'autres options Swiper si besoin
			} );
		}
	}, [ numberofslides, numberofslidesMobile ] );

	return (
		<div { ...blockProps } ref={ refContainer }>
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
			<div className="anima-swiper-container" ref={ sliderContainerRef }>
				<div className="swiper-wrapper">
					<InnerBlocks
						allowedBlocks={ [ 'anima/slider-simple-item' ] }
					/>
				</div>
				<NavigationSwiper
					paginationDisplay={ true }
					navigationDisplay={ true }
				/>
			</div>
		</div>
	);
}
