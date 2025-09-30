import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div
				className="number-animation-block"
				data-start-char={ startChar }
				data-end-char={ endChar }
				data-start-number={ startNumber }
				data-end-number={ endNumber }
				data-delay={ delay }
				data-increment={ increment }
				data-speed={ speed }
				data-locale={ locale }
			>
				{ startChar }
				{ startNumber.toLocaleString( locale ) }
				{ endChar }
			</div>
		</div>
	);
}
