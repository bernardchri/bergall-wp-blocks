import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import metadata from './block.json';
import { useState } from 'react';

export default function Edit( { attributes, setAttributes } ) {
	const { speed, link, gradianttransition, direction, rotation } = attributes;

	const [ previewMode, setPreviewMode ] = useState( false );

	const blockProps = useBlockProps( {
		className: `marquee-container marquee-container-editor`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<div style={ { padding: '1rem' } }>
					{ ' ' }
					{ metadata.description }
				</div>
				<PanelBody title="Paramètres du Marquee">
					<Button
						style={ { marginBottom: '1rem' } }
						isSecondary
						onClick={ () => setPreviewMode( ! previewMode ) }
					>
						{ previewMode === false ? 'Deplier' : 'Lire' }
					</Button>

					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Durée de la boucle en sec"
						value={ speed }
						onChange={ ( value ) =>
							setAttributes( { speed: value } )
						}
						min={ 0 }
						max={ 60 }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label="Direction"
						checked={ direction }
						onChange={ ( value ) =>
							setAttributes( { direction: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label="Activer/Désactiver le dégradé des bords"
						checked={ gradianttransition }
						onChange={ ( value ) =>
							setAttributes( { gradianttransition: value } )
						}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Rotation"
						value={ rotation }
						onChange={ ( value ) =>
							setAttributes( { rotation: value } )
						}
						min={ -90 }
						max={ 90 }
					/>
					<URLInput
						label="Lien (URL)"
						value={ link }
						onChange={ ( value ) =>
							setAttributes( { link: value } )
						}
						placeholder="https://example.com"
					/>
				</PanelBody>
			</InspectorControls>
			<div
				className={ `marquee-wrapper ${
					gradianttransition ? 'fadeout-horizontal' : ''
				}` }
				style={ {
					overflow: 'scroll',
					transform: `rotate(${ rotation }deg)`,
				} }
			>
				<div
					className={ `marquee-content ${
						! previewMode ? '' : '--preview'
					} ` }
					style={ {
						'--speed': `${ speed }s`,
						'--direction': direction ? 'forwards' : 'reverse',
					} }
				>
					<InnerBlocks
						allowedBlocks={ [ 'core/paragraph', 'core/group' ] }
					/>
				</div>
			</div>
		</div>
	);
}
