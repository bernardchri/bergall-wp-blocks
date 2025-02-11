import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import './style.css';


registerBlockType('custom/animated-paragraph', {
    edit({ attributes, setAttributes }) {
        const { content } = attributes;

        return (
            <RichText
                tagName="p"
                value={content}
                onChange={(newContent) => setAttributes({ content: newContent })}
                placeholder="Type your paragraph here..."
            />
        );
    },
    save({ attributes }) {
        const { content } = attributes;
        return <p className="animated-paragraph">{content}</p>;
    },
});
