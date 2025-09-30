import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

//TODO
// 💡 idée
// [ ] Corriger bug des couleurs
// Faire un tableau avec les différentes couleurs présentes
// à l'entrée dans le scroll si vers le base, faire une transition entre la couleur N-1 et N
// Si vers le haut : faire une transition entre la couleur N+1 et N
// [ ] Problème du changement de cible, ici uniquement le body, problème avec le changement de nom dans le input text

// Function to handle GSAP animation
const animateBackgroundColor = (
	element,
	backgroundColor,
	addClass,
	blockRef
) => {
	if ( element ) {
		const defaultColor = getComputedStyle( element ).backgroundColor;

		gsap.utils
			.toArray( '.wp-block-animablocks-change-color-on-scroll' )
			.forEach( ( section ) => {
				let lastColor = defaultColor;

				gsap.fromTo(
					element,
					{ backgroundColor: lastColor },
					{
						backgroundColor: backgroundColor,
						scrollTrigger: {
							scrub: true,
							trigger: blockRef,
							start: 'top bottom',
							end: 'bottom top',
							onEnter: () => {
								console.log( 'derniere oculeur : ', lastColor );
								if ( addClass ) {
									console.log( 'enter' );
									element.classList.add(
										'change-color-on-scroll'
									);
									lastColor = backgroundColor;
									// gsap.to(element, {backgroundColor : backgroundColor})
								}
							},
							onLeaveBack: () => {
								if ( addClass ) {
									element.classList.remove(
										'change-color-on-scroll'
									);
								}
								// gsap.to(element, { backgroundColor: defaultColor });
							},
						},
					}
				);
			} );
	}
};

registerBlockType( 'animablocks/change-color-on-scroll', {
	title: 'Change Color on Scroll',
	icon: 'shield',
	category: 'anima',
	attributes: {
		targetElement: {
			type: 'string',
			default: 'body',
		},
		backgroundColor: {
			type: 'string',
			default: '#999999',
		},
		addClass: {
			type: 'boolean',
			default: false,
		},
	},
	edit( { attributes, setAttributes } ) {
		const blockProps = useBlockProps();
		const { targetElement, backgroundColor, addClass } = attributes;
		const blockRef = useRef();
		const [ targetValue, setTargetValue ] = useState( 'body' );

		useEffect( () => {
			if ( targetElement ) {
				const element = document.querySelector( targetElement );
				animateBackgroundColor(
					element,
					backgroundColor,
					addClass,
					blockRef
				);
			}
		}, [ targetElement, backgroundColor, addClass, blockRef ] );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Settings">
						{ /* <TextControl
                            label="Target Element"
                            value={targetValue}
                            onChange={(val) => setTargetValue(val)}
                            onBlur={(val) => setAttributes({targetElement : val})}
                        /> */ }
						{ targetElement }
						<ColorPalette
							colors={ [
								{ name: 'gray', color: '#999999' },
								// Add more colors if needed
							] }
							value={ backgroundColor }
							onChange={ ( val ) =>
								setAttributes( { backgroundColor: val } )
							}
						/>
						<ToggleControl
							label="Add Class"
							checked={ addClass }
							onChange={ ( val ) =>
								setAttributes( { addClass: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps } ref={ blockRef }>
					<div style={ { backgroundColor } }>
						Changement de couleur du body partir de ce composant :{ ' ' }
						{ backgroundColor }
					</div>
				</div>
			</>
		);
	},
	save( { attributes } ) {
		const { backgroundColor, addClass } = attributes;

		return (
			<div
				{ ...useBlockProps.save() }
				data-background-color={ backgroundColor }
			></div>
		);
	},
} );

document.addEventListener( 'DOMContentLoaded', () => {
	const changeColorOnScroll = document.querySelectorAll(
		'.wp-block-animablocks-change-color-on-scroll'
	);
	const element = document.querySelector( 'body' );
	changeColorOnScroll.forEach( ( comp ) => {
		const backgroundColor = comp.getAttribute( 'data-background-color' );
		const addClass = comp.getAttribute( 'data-addclass' ) || false;
		animateBackgroundColor( element, backgroundColor, addClass, comp );
	} );
} );
