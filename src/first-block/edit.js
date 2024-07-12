/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const blockProps = useBlockProps();
	// Simplify access to attributes
	const { description, mySetting, title } = attributes;

	// Toggle a setting when the user clicks the button
	const toggleSetting = () => setAttributes({ mySetting: !mySetting });

	return (
		<div {...blockProps}>

			<RichText
				{...blockProps}
				tagName="h2" // The tag here is the element output and editable in the admin
				value={attributes.title} // Any existing content, either from the database or an attribute default
				allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={(title) => setAttributes({ title })} // Store updated content as a block attribute
				placeholder={__('Titre...')} // Display this text before any content has been added by the user
			/>
			<RichText
				{...blockProps}
				tagName="p"
				value={attributes.description}
				onChange={(description) => setAttributes({ description })}
				placeholder={__('Ut sunt aliqua in aute excepteur irure laborum enim quis. Non veniam excepteur consectetur nostrud cupidatat. Duis enim aute aute do duis excepteur. Est anim deserunt sint minim tempor duis commodo ullamco. Proident eiusmod labore sint ex excepteur....')} // Display this text before any content has been added by the user
			/>

		</div>
	);
}
