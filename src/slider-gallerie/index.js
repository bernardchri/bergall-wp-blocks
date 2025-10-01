import edit from './edit';
import save from './save';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit,
	save,
} );
