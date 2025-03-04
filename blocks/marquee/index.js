import { getBlockContent, registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import "./style.css";


registerBlockType('bergallblocks/marquee', {
    title: 'Marquee (Défilement)',
    icon: 'slides',
    category: 'design',
    supports: {
        color: { background: true, text: true },
        spacing: { padding: true, margin: true, blockGap: true },
        "align": ["wide", "full"],
        html: false,
        typography: { lineHeight: true },
    },
    attributes: {
        speed: { type: 'number', default: 10 },
        link: { type: 'string', default: '' },
        
    },
    edit: ({ attributes, setAttributes }) => {
        const { speed, link } = attributes;
        const blockProps = useBlockProps({
            className: 'marquee-container',
        });


        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du Marquee">
                        <RangeControl
                            label="Vitesse du défilement"
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={2}
                            max={30}
                        />
                        <URLInput
                            label="Lien (URL)"
                            value={link}
                            onChange={(value) => setAttributes({ link: value })}
                            placeholder="https://example.com"
                        />
                    </PanelBody>
                </InspectorControls>
                  

                <div className="marquee-wrapper" style={{ overflow: scroll }}>
                    <div className="marquee-content" style={{ animationDuration: `${speed}s`,  gap : 'var(--wp--style--block-gap, 1rem)' }}>
                        <InnerBlocks allowedBlocks={['core/paragraph']} />
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { speed, link } = attributes;

        const content = (
            <div {...useBlockProps.save({ className: 'marquee-container --view' })}>
                <div className="marquee-wrapper">
                    <div className="marquee-content" style={{ '--speed': `${speed}s`, gap : 'var(--wp--style--block-gap, 1rem)' }}>
                        <InnerBlocks.Content />

                    </div>
                </div>
            </div>
        );

        return link ? <a href={link} target="_blank" rel="noopener noreferrer">{content}</a> : content;
    }
});