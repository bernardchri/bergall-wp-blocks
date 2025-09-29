import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import { customIcon } from '../../src/utils/icon';
import './editor.css';
import './frontend.js';
import metadata from './block.json';


registerBlockType(metadata, {
  icon: customIcon,
  edit: Edit,
  save: Save,
});