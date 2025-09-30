import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './style.scss';

export default function Save( { attributes } ) {
	const {
		initialScale,
		finalScale,
		zIndex,
		startX,
		startY,
		endX,
		endY,
		startRotate,
		endRotate,
		startOpacity,
		endOpacity,
		scrollEnterElement,
		scrollEnterViewport,
		scrollLeaveElement,
		scrollLeaveViewport,
		debug,
	} = attributes;

	return (
		<div
			{ ...useBlockProps.save() }
			data-initial-scale={ initialScale }
			data-final-scale={ finalScale }
			data-z-index={ zIndex }
			data-start-x={ startX }
			data-start-y={ startY }
			data-end-x={ endX }
			data-end-y={ endY }
			data-start-rotate={ startRotate }
			data-end-rotate={ endRotate }
			data-start-opacity={ startOpacity }
			data-end-opacity={ endOpacity }
			data-scroll-enter-element={ scrollEnterElement }
			data-scroll-enter-viewport={ scrollEnterViewport }
			data-scroll-leave-element={ scrollLeaveElement }
			data-scroll-leave-viewport={ scrollLeaveViewport }
			data-debug={ debug ? 'true' : 'false' }
		>
			<InnerBlocks.Content />
		</div>
	);
}
