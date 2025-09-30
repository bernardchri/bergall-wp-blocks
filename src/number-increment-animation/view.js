document.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll(
		'.wp-block-animablocks-number-increment-animation > .number-animation-block'
	);

	const observer = new IntersectionObserver( ( entries, observer ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting ) {
				const block = entry.target;
				const startChar = block.getAttribute( 'data-start-char' ) || '';
				const endChar = block.getAttribute( 'data-end-char' ) || '';
				const startNumber =
					parseFloat( block.getAttribute( 'data-start-number' ) ) ||
					0;
				const endNumber =
					parseFloat( block.getAttribute( 'data-end-number' ) ) ||
					100;
				const delay =
					parseInt( block.getAttribute( 'data-delay' ), 10 ) || 0;
				const speed =
					parseFloat( block.getAttribute( 'data-speed' ) ) || 1; // seconds
				const locale = block.getAttribute( 'data-locale' ) || 'en-US';

				let currentNumber = startNumber;

				animationtext( {
					block: block,
					startChar: startChar,
					endChar: endChar,
					startNumber: startNumber,
					endNumber: endNumber,
					delay: delay,
					speed: speed,
					locale,
					currentNumber: currentNumber,
				} );

				// const easeOutQuad = (t) => t * (2 - t);

				// setTimeout(() => {
				//     const startTime = performance.now();

				//     const frame = () => {
				//         const now = performance.now();
				//         const elapsed = now - startTime;

				//         if (elapsed < speed * 1000) {
				//             const progress = elapsed / (speed * 1000);
				//             currentNumber = startNumber + (endNumber - startNumber) * easeOutQuad(progress);
				//             const roundedNumber = Math.round(currentNumber);
				//             block.textContent = `${startChar}${roundedNumber.toLocaleString(locale)}${endChar}`;
				//             requestAnimationFrame(frame);
				//         } else {
				//             block.textContent = `${startChar}${endNumber.toLocaleString(locale)}${endChar}`;
				//         }
				//     };

				//     requestAnimationFrame(frame);
				// }, delay);

				observer.unobserve( block );
			}
		} );
	} );

	blocks.forEach( ( block ) => observer.observe( block ) );
} );

export const animationtext = function ( {
	block,
	startChar,
	endChar,
	startNumber,
	endNumber,
	delay,
	speed,
	locale,
	currentNumber,
} ) {
	const easeOutQuad = ( t ) => t * ( 2 - t );

	setTimeout( () => {
		const startTime = performance.now();

		const frame = () => {
			const now = performance.now();
			const elapsed = now - startTime;

			if ( elapsed < speed * 1000 ) {
				const progress = elapsed / ( speed * 1000 );
				currentNumber =
					startNumber +
					( endNumber - startNumber ) * easeOutQuad( progress );
				const roundedNumber = Math.round( currentNumber );
				block.textContent = `${ startChar }${ roundedNumber.toLocaleString(
					locale
				) }${ endChar }`;
				requestAnimationFrame( frame );
			} else {
				block.textContent = `${ startChar }${ endNumber.toLocaleString(
					locale
				) }${ endChar }`;
			}
		};

		requestAnimationFrame( frame );
	}, delay );
};
