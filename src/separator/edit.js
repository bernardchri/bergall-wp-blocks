import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ColorPicker,
} from '@wordpress/components';
import { shapes } from './svgShapes';
import { __ } from '@wordpress/i18n';
import './style.css';

export default function Edit( { attributes, setAttributes } ) {
	const { shape, shapeColor, flipX, flipY } = attributes;

	const svgCode = shapes[ shape ].svg.replace( '{{color}}', shapeColor );
	const encodedSvg = `url("data:image/svg+xml;base64,${ btoa( svgCode ) }")`;

	const blockProps = useBlockProps( {
		style: {
			backgroundImage: encodedSvg,
			backgroundSize: 'contain',
			backgroundRepeat: 'repeat-x',
			backgroundPosition: 'center bottom',
			transform: `scaleX(${ flipX ? -1 : 1 }) scaleY(${
				flipY ? -1 : 1
			})`,
		},
		className: 'anima-separator',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Separator Settings', 'anima' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Shape', 'anima' ) }
						value={ shape }
						options={ Object.entries( shapes ).map(
							( [ key, val ] ) => ( {
								label: val.name,
								value: key,
							} )
						) }
						onChange={ ( value ) =>
							setAttributes( { shape: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Flip Horizontally', 'anima' ) }
						checked={ flipX }
						onChange={ ( value ) =>
							setAttributes( { flipX: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Flip Vertically', 'anima' ) }
						checked={ flipY }
						onChange={ ( value ) =>
							setAttributes( { flipY: value } )
						}
					/>
					<p>{ __( 'Shape Color', 'anima' ) }</p>
					<ColorPicker
						color={ shapeColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { shapeColor: value.hex } )
						}
						disableAlpha
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<p
					style={ {
						textAlign: 'center',
						padding: '2rem 0',
						color: '#888',
					} }
				>
					{ __( 'Separator Preview', 'anima' ) }
				</p>
			</div>
		</>
	);
}
