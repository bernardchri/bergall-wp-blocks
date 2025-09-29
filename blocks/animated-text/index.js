import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import { customIcon } from '../../src/utils/icon';
import './editor.css';
import './frontend.js';
import metadata from './block.json';


registerBlockType(metadata, {
  icon: customIcon,
  edit,
  save,
});