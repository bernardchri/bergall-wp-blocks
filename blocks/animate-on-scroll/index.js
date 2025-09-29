import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

import './style.css';
import './frontend.js';

registerBlockType(metadata, {
    edit: Edit,
    save: Save,
});