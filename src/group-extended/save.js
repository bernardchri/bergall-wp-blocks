import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	

	const {
		href,
		newTab,
		animation,
		positionAbsolute,
		top,
		left,
		right,
		bottom,
		width,
		height,
		zIndex,
		overflow
	} = attributes;

	const wrapperStyle = {
		position: positionAbsolute ? 'absolute' : 'relative',
		overflow:
			overflow === 'x'
				? undefined
				: overflow === 'y'
				? undefined
				: overflow || undefined,
		overflowX: overflow === 'x' ? 'auto' : undefined,
		overflowY: overflow === 'y' ? 'auto' : undefined,
		top: positionAbsolute && top ? top : undefined,
		left: positionAbsolute && left ? left : undefined,
		right: positionAbsolute && right ? right : undefined,
		bottom: positionAbsolute && bottom ? bottom : undefined,
		width: width || undefined,
		height: height || undefined,
		zIndex: positionAbsolute && zIndex ? zIndex : undefined,
	};

	const blockProps = useBlockProps.save( {
		className: `animate-${ animation } ${ href ? 'has-link' : '' }`,
		style : {
			...wrapperStyle,
			...useBlockProps.save().style
		}
	} );

	const content = <InnerBlocks.Content />;

	return (
		<div { ...blockProps }>
			{ href ? (
				<a
					href={ href }
					target={ newTab ? '_blank' : '_self' }
					rel={ newTab ? 'noopener noreferrer' : undefined }
				>
					{ content }
				</a>
			) : (
				content
			) }
		</div>
	);
}
