import { animate, onScroll } from 'animejs';
import metadata from './block.json';

const BLOCK_CLASS = ".wp-block-animablocks-animate-on-scroll"

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( BLOCK_CLASS ).forEach( ( section ) => {
		const initialScale =
			parseFloat( section.getAttribute( 'data-initial-scale' ) ) ||
			metadata.attributes.initialScale.default;
		const finalScale =
			parseFloat( section.getAttribute( 'data-final-scale' ) ) ||
			metadata.attributes.finalScale.default;
		const zIndex =
			parseInt( section.getAttribute( 'data-z-index' ), 10 ) ||
			metadata.attributes.zIndex.default;
		const startX =
			parseFloat( section.getAttribute( 'data-start-x' ) ) ||
			metadata.attributes.startX.default;
		const startY =
			parseFloat( section.getAttribute( 'data-start-y' ) ) ||
			metadata.attributes.startY.default;
		const endX =
			parseFloat( section.getAttribute( 'data-end-x' ) ) ||
			metadata.attributes.endX.default;
		const endY =
			parseFloat( section.getAttribute( 'data-end-y' ) ) ||
			metadata.attributes.endY.default;
		const startRotate =
			parseFloat( section.getAttribute( 'data-start-rotate' ) ) ||
			metadata.attributes.startRotate.default;
		const endRotate =
			parseFloat( section.getAttribute( 'data-end-rotate' ) ) ||
			metadata.attributes.endRotate.default;

		// Correction : startOpacity et endOpacity doivent être >= 0 et <= 1
		let startOpacity = section.getAttribute( 'data-start-opacity' );
		let endOpacity = section.getAttribute( 'data-end-opacity' );
		startOpacity = startOpacity !== null ? parseFloat( startOpacity ) : 1;
		endOpacity = endOpacity !== null ? parseFloat( endOpacity ) : 1;

		// Clamp les valeurs pour éviter NaN ou hors bornes
		startOpacity = isNaN( startOpacity )
			? 1
			: Math.max( 0, Math.min( 1, startOpacity ) );
		endOpacity = isNaN( endOpacity )
			? 1
			: Math.max( 0, Math.min( 1, endOpacity ) );

		// Récupérer les triggers personnalisés ou fallback sur les valeurs par défaut
		const scrollEnterElement =
			section.getAttribute( 'data-scroll-enter-element' ) ||
			metadata.attributes.scrollEnterElement.default;
		const scrollEnterViewport =
			section.getAttribute( 'data-scroll-enter-viewport' ) ||
			metadata.attributes.scrollEnterViewport.default;
		const scrollLeaveElement =
			section.getAttribute( 'data-scroll-leave-element' ) ||
			metadata.attributes.scrollLeaveElement.default;
		const scrollLeaveViewport =
			section.getAttribute( 'data-scroll-leave-viewport' ) ||
			metadata.attributes.scrollLeaveViewport.default;

		// Compose les valeurs pour anime.js v4 : "element viewport"
		const scrollEnter = `${ scrollEnterElement } ${ scrollEnterViewport }`;
		const scrollLeave = `${ scrollLeaveElement } ${ scrollLeaveViewport }`;

		const debug = section.getAttribute( 'data-debug' ) === 'true';

		const sections = Array.isArray( section ) ? section : [ section ];
		sections.forEach( ( section ) => {
			if ( ! section ) return;
			animate( section, {
				scale: [ initialScale, finalScale ],
				zIndex: zIndex,
				translateX: [ startX, endX ],
				translateY: [ startY, endY ],
				rotate: [ startRotate, endRotate ],
				opacity: [ startOpacity, endOpacity ],
				autoplay: onScroll( {
					target: section,
					axis: 'y',
					sync: true,
					debug: debug,
					enter: scrollEnter,
					leave: scrollLeave,
				} ),
			} );
		} );
	} );
} );
