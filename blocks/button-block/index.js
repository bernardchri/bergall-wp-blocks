import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';

registerBlockType('custom/button-block', {
    title: 'Custom Button',
    icon: 'button',
    category: 'bergall',
    attributes: {
        text: { type: 'string', default: 'Click me' },
        backgroundColor: { type: 'string', default: '#0073aa' },
        hoverColor: { type: 'string', default: '#005177' },
        textColor: { type: 'string', default: '#ffffff' },
        icon: { type: 'string', default: 'heart' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { text, backgroundColor, hoverColor, textColor, icon } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Button Settings">
                        <p>Background Color</p>
                        <ColorPalette
                            value={backgroundColor}
                            onChange={(color) => setAttributes({ backgroundColor: color })}
                        />
                        <p>Hover Color</p>
                        <ColorPalette
                            value={hoverColor}
                            onChange={(color) => setAttributes({ hoverColor: color })}
                        />
                        <p>Text Color</p>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                        <p>Icon</p>
                        <SelectControl
                            value={icon}
                            options={[
                                { label: 'Heart', value: 'heart' },
                                { label: 'Star', value: 'star-filled' },
                                { label: 'Check', value: 'yes' },
                                { label: 'Arrow', value: 'arrow-right' },
                            ]}
                            onChange={(value) => setAttributes({ icon: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...useBlockProps()}>
                    <button
                        style={{
                            backgroundColor,
                            color: textColor,
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background-color 0.3s ease-in-out'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = hoverColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = backgroundColor}
                    >
                        <Dashicon icon={icon} />
                        <RichText
                            value={text}
                            onChange={(newText) => setAttributes({ text: newText })}
                        />
                    </button>
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const { text, backgroundColor, hoverColor, textColor, icon } = attributes;
        return (
            <button
                className="custom-button"
                style={{
                    backgroundColor,
                    color: textColor,
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = backgroundColor}
            >
                <Dashicon icon={icon} />
                <RichText.Content value={text} />
            </button>
        );
    }
});
