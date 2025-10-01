import Edit from './edit';
import save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'anima/slider-image', {
	edit: Edit,
	save: save,
} );
