import { useBlockProps } from '@wordpress/block-editor';
import NavigationSwiper from './navigationSwiper';
import './style.scss';
import '../slider-navigation/style.scss';

export default function save( { attributes } ) {
	const { paginationDisplay, navigationDisplay } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<NavigationSwiper
				paginationDisplay={ paginationDisplay }
				navigationDisplay={ navigationDisplay }
			/>
		</div>
	);
}
