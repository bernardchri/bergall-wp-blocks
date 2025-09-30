import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	ToggleControl,
} from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { animate } from 'animejs';
import data from './block.json';

import './style.css';

registerBlockType( data.name, {
	title: __( 'Carrousel de texte', 'anima' ),
	supports: {
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontWeight: true,
			__experimentalFontStyle: true,
			__experimentalTextTransform: true,
		},
		textAlign: true,
		color: {
			text: true,
			background: true,
		},
		spacing: {
			padding: true,
		},
	},

	attributes: {
		messages: { type: 'array', default: [] },
		duration: { type: 'number', default: 3000 },
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { messages, duration } = attributes;
		const blockProps = useBlockProps( {
			className: 'texte-carrousel',
			'data-duration': duration,
		} );

		const wrapperRef = useRef( null );
		const [ isPlaying, setIsPlaying ] = useState( false );
		const [ currentIndex, setCurrentIndex ] = useState( 0 );
		const intervalRef = useRef( null );

		const updateMessage = ( value, index ) => {
			const newMessages = [ ...messages ];
			newMessages[ index ] = value;
			setAttributes( { messages: newMessages } );
		};

		const addMessage = () => {
			setAttributes( { messages: [ ...messages, 'Nouveau texte' ] } );
		};

		const removeMessage = ( index ) => {
			const newMessages = [ ...messages ];
			newMessages.splice( index, 1 );
			setAttributes( { messages: newMessages } );
		};

		useEffect( () => {
			if ( ! wrapperRef.current || messages.length < 2 ) return;

			const wrapper = wrapperRef.current;
			const slideCount = messages.length;
			const singleSlide = wrapper.firstChild;
			const slideHeight = singleSlide.offsetHeight;

			clearInterval( intervalRef.current );
			let index = 0;

			if ( isPlaying ) {
				intervalRef.current = setInterval( () => {
					index++;
					animate( wrapper, {
						translateY: -index * slideHeight,
						duration: 500,
						easing: 'easeInOutQuad',
						complete: () => {
							// Reset instantly if at the duplicated slide
							if ( index === slideCount ) {
								wrapper.style.transform = 'translateY(0px)';
								index = 0;
							}
						},
					} );
					setCurrentIndex( index % slideCount );
				}, duration );
			}

			return () => clearInterval( intervalRef.current );
		}, [ isPlaying, messages, duration ] );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Paramètres">
						<RangeControl
							label="Durée entre chaque message (ms)"
							value={ duration }
							onChange={ ( value ) =>
								setAttributes( { duration: value } )
							}
							min={ 250 }
							max={ 10000 }
							step={ 500 }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="texte-slide-wrapper" ref={ wrapperRef }>
						{ messages.map( ( msg, index ) => (
							<div className="texte-slide" key={ index }>
								<RichText
									tagName="div"
									value={ msg }
									onChange={ ( value ) =>
										updateMessage( value, index )
									}
									placeholder="Entrez un message…"
									allowedFormats={ [
										'core/bold',
										'core/italic',
									] }
								/>
							</div>
						) ) }
					</div>

					{ isSelected && (
						<div style={ { marginTop: '1em' } }>
							<Button
								variant="primary"
								onClick={ addMessage }
								style={ { marginRight: '1em' } }
							>
								Ajouter un message
							</Button>
							{ /* <ToggleControl
                                label={isPlaying ? 'Pause' : 'Lecture'}
                                checked={isPlaying}
                                onChange={() => setIsPlaying(!isPlaying)}
                            /> */ }
							{ messages.map( ( _, i ) => (
								<Button
									key={ i }
									isDestructive
									onClick={ () => removeMessage( i ) }
									style={ {
										display: 'block',
										marginTop: '0.5em',
									} }
								>
									Supprimer le message { i + 1 }
								</Button>
							) ) }
						</div>
					) }
				</div>
			</>
		);
	},

	save( { attributes } ) {
		const { messages, duration } = attributes;
		const blockProps = useBlockProps.save( {
			className: 'texte-carrousel',
			'data-duration': duration,
		} );

		return (
			<div { ...blockProps }>
				<div className="texte-slide-wrapper">
					{ messages.map( ( msg, i ) => (
						<div className="texte-slide" key={ i }>
							<RichText.Content tagName="div" value={ msg } />
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );

// Animation front
document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.texte-carrousel' ).forEach( ( carrousel ) => {
		const wrapper = carrousel.querySelector( '.texte-slide-wrapper' );
		const slides = wrapper.querySelectorAll( '.texte-slide' );
		const duration = parseInt( carrousel.dataset.duration || 3000, 10 );
		let slideCount = slides.length - 1; // last one is duplicate
		const slideHeight = slides[ 0 ].offsetHeight;
		let index = 0;

		if ( slides.length > 1 ) {
			const firstSlideClone = slides[ 0 ].cloneNode( true );
			wrapper.appendChild( firstSlideClone );
			wrapper.style.height = `${ slideHeight }px`; // Set initial height
			slideCount += 1; // Adjust slideCount to include the duplicate
			index = -1; // Reset index to 0
		}

		wrapper.style.height = `${ slideHeight }px`; // Set initial height
		wrapper.style.transition = 'none'; // Smooth transition for transform

		setInterval( () => {
			console.log( 'index', index, 'slideCount', slideCount );
			index++;
			animate( wrapper, {
				translateY: index * slideHeight * -1,
				duration: 200,
				easing: 'easeInOutQuad',
				complete: () => {
					if ( index === slideCount + 1 ) {
						// +1 because of the duplicate slide
						console.log( 'Resetting index to 0' );
						animate( wrapper, {
							translateY: 0,
							duration: 0, // Pas d'animation pour le reset
							easing: 'linear',
							complete: () => {
								index = -1; // Reset index
							},
						} );
					}
				},
			} );
		}, duration );
	} );
} );
