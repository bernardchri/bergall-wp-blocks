import { useBlockProps } from '@wordpress/block-editor';
import NavigationSwiper from './navigationSwiper';
import './style.scss';

export default function Edit( { attributes } ) {
	const { paginationDisplay, navigationDisplay } = attributes;

	return (
		<div { ...useBlockProps() }>
			<NavigationSwiper
				paginationDisplay={ paginationDisplay }
				navigationDisplay={ navigationDisplay }
			/>
		</div>
	);
}
