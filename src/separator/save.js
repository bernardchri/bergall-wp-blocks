import { useBlockProps } from '@wordpress/block-editor';
import { shapes } from './svgShapes';

export default function Save( { attributes } ) {
	const { shape, shapeColor, flipX, flipY } = attributes;

	const svgCode = shapes[ shape ].svg.replace( '{{color}}', shapeColor );
	const encodedSvg = `url("data:image/svg+xml;base64,${ btoa( svgCode ) }")`;

	const style = {
		backgroundImage: encodedSvg,
		backgroundSize: 'contain',
		backgroundRepeat: 'repeat-x',
		backgroundPosition: 'bottom center',
		transform: `scaleX(${ flipX ? -1 : 1 }) scaleY(${ flipY ? -1 : 1 })`,
	};

	return (
		<div
			{ ...useBlockProps.save( { className: 'anima-separator', style } ) }
		/>
	);
}
