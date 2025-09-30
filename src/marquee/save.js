import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './style.scss'

export default function save( { attributes } ) {
	const { speed, link, direction, gradianttransition, rotation } = attributes;

	const content = (
		<div
			className={ `marquee-wrapper ${
				gradianttransition ? 'fadeout-horizontal' : ''
			}` }
			style={ { transform: `rotate(${ rotation }deg)` } }
		>
			<div
				className="marquee-content"
				style={ {
					'--speed': `${ speed }s`,
					'--direction': `${ direction ? 'forwards' : 'reverse' }`,
				} }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);

	return link ? (
		<div
			{ ...useBlockProps.save( {
				className: 'marquee-container --view',
			} ) }
		>
			<a href={ link } target="_blank" rel="noopener noreferrer">
				{ content }
			</a>
		</div>
	) : (
		<div
			{ ...useBlockProps.save( {
				className: 'marquee-container --view',
			} ) }
		>
			{ content }
		</div>
	);
}
