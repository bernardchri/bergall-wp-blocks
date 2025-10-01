import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	Button,
} from '@wordpress/components';

import { animationtext } from './view.js';
import { useEffect, useRef } from 'react';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		startChar,
		endChar,
		startNumber,
		endNumber,
		delay,
		increment,
		speed,
		locale,
	} = attributes;

	const refBloc = useRef( null );

	const blockProps = useBlockProps();

	useEffect( () => {}, [ attributes ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Animation Controls">
					<Button
						isPrimary
						className="number-animation-play-button"
						type="button"
						onClick={ () =>
							animationtext( {
								block: refBloc.current,
								currentNumber:
									isNaN( startNumber ) || startNumber === null
										? 0
										: startNumber,
								startChar,
								endChar,
								startNumber:
									isNaN( startNumber ) || startNumber === null
										? 0
										: startNumber,
								endNumber:
									isNaN( endNumber ) || endNumber === null
										? 0
										: endNumber,
								delay:
									isNaN( delay ) || delay === null ? 0 : delay,
								increment:
									isNaN( increment ) || increment === null
										? 0
										: increment,
								speed:
									isNaN( speed ) || speed === null ? 0 : speed,
								locale,
							} )
						}
					>
						Lire
					</Button>
				</PanelBody>
				<PanelBody title="Animation Settings">
					<TextControl
						label="Start Character"
						value={ startChar }
						onChange={ ( val ) =>
							setAttributes( {
								startChar: isNaN( '' ) ? 0 : val,
							} )
						}
					/>
					<TextControl
						label="End Character"
						value={ endChar }
						onChange={ ( val ) =>
							setAttributes( { endChar: val } )
						}
					/>
					<TextControl
						label="Start Number"
						value={
							isNaN( startNumber ) || startNumber === null
								? 0
								: startNumber
						}
						onChange={ ( val ) =>
							setAttributes( {
								startNumber:
									isNaN( parseFloat( val ) ) || val === null
										? 0
										: parseFloat( val ),
							} )
						}
						type="number"
					/>
					<TextControl
						label="End Number"
						value={
							isNaN( endNumber ) || endNumber === null
								? 0
								: endNumber
						}
						onChange={ ( val ) =>
							setAttributes( {
								endNumber:
									isNaN( parseFloat( val ) ) || val === null
										? 0
										: parseFloat( val ),
							} )
						}
						type="number"
					/>
					<RangeControl
						label="Delay (ms)"
						value={
							isNaN( delay ) ||
							delay === null ||
							delay === undefined
								? 0
								: delay
						}
						onChange={ ( val ) =>
							setAttributes( {
								delay: isNaN( val ) || val === null ? 0 : val,
							} )
						}
						min={ 0 }
						step={ 125 }
						max={ 5000 }
					/>
					<RangeControl
						label="Increment"
						value={
							isNaN( increment ) || increment === null
								? 0
								: increment
						}
						onChange={ ( val ) =>
							setAttributes( {
								increment:
									isNaN( val ) || val === null ? 0 : val,
							} )
						}
						min={ 1 }
						max={ 1000 }
						step={ 1 }
					/>
					<RangeControl
						label="Duree (s)"
						value={ isNaN( speed ) || speed === null ? 0 : speed }
						onChange={ ( val ) =>
							setAttributes( {
								speed: isNaN( val ) || val === null ? 0 : val,
							} )
						}
						step={ 0.15 }
						min={ 0.15 }
						max={ 10 }
					/>
					<SelectControl
						label="Locale"
						value={ locale }
						options={ [
							{ label: 'English (US)', value: 'en-US' },
							{ label: 'French (FR)', value: 'fr-FR' },
						] }
						onChange={ ( val ) => setAttributes( { locale: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="number-animation-block" ref={ refBloc }>
				{ startChar ? startChar : '' }
				{ endNumber.toLocaleString( locale ) }
				{ endChar ? endChar : '' }
			</div>
		</div>
	);
}
