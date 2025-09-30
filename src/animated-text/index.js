import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { customIcon } from './icon';

registerBlockType( metadata, {
	icon: customIcon,
	edit,
	save,
} );
