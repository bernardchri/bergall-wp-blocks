import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

registerBlockType('custom/span-block', {
    title: 'Custom Span',
    icon: 'editor-textcolor',
    category: 'text',
    parent: ['custom/heading-block'],
    attributes: {
        text: { type: 'string', default: 'Your Text Here' },
        backgroundImage: { type: 'string', default: '' },
        width: { type: 'number', default: null },
        height: { type: 'number', default: null }
    },
    edit: ({ attributes, setAttributes }) => {
        const { text, backgroundImage, width, height } = attributes;
        const hasBackground = !!backgroundImage;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Span Settings">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                            type="image"
                            render={({ open }) => (
                                <Button onClick={open} isPrimary>Choose Image</Button>
                            )}
                        />
                        {hasBackground && (
                            <>
                                <RangeControl
                                    label="Width"
                                    value={width || 200}
                                    onChange={(value) => setAttributes({ width: value })}
                                    min={50}
                                    max={800}
                                />
                                <RangeControl
                                    label="Height"
                                    value={height || 100}
                                    onChange={(value) => setAttributes({ height: value })}
                                    min={50}
                                    max={400}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                <div {...useBlockProps()} style={{
                    display: 'inline-block',
                    backgroundImage: hasBackground ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    width: hasBackground ? `${width}px` : 'auto',
                    height: hasBackground ? `${height}px` : 'auto',
                    textAlign: 'center',
                    padding: '5px'
                }}>
                    <RichText
                        value={text}
                        onChange={(newText) => setAttributes({ text: newText })}
                    />
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const { text, backgroundImage, width, height } = attributes;
        const hasBackground = !!backgroundImage;
        return (
            <span className="header_heading-span" style={{
                display: 'inline-flex',
                justifyItems: 'baseline',
                backgroundImage: hasBackground ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                width: hasBackground ? `${width}px` : 'auto',
                height: hasBackground ? `${height}px` : 'auto',
                textAlign: 'center',
                padding: '5px'
            }}>
                <RichText.Content value={text} />
            </span>
        );
    }
});

registerBlockType('custom/heading-block', {
    title: 'Custom Heading',
    icon: 'heading',
    category: 'text',
    supports: {
        align: true,
    },
    edit: () => {
        return (
            <div {...useBlockProps()}>
                <InnerBlocks allowedBlocks={['custom/span-block']} />
            </div>
        );
    },
    save: () => {
        return (
            <div className="header_heading">
                <InnerBlocks.Content />
            </div>
        );
    }
});
