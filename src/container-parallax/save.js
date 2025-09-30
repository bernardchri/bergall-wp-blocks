import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './style.css';

export default function Save( { attributes } ) {
	const { speed, depth, alignment } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: 'parallax-container',
				'data-speed': speed,
				'data-depth': depth,
				style: {
					position: 'relative',
					zIndex: depth,
					textAlign: alignment,
				},
			} ) }
		>
			<div
				className="parallax-content"
				style={ {
					willChange: 'transform',
					transformStyle: 'preserve-3d',
					transformPerspective: 1000,
				} }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
