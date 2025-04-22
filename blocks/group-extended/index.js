import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { onScroll, animate, utils } from 'animejs';
import './style.css';

registerBlockType('bergallblocks/group-extended', {
    title: 'Group Extended',
    icon: 'admin-links',
    category: 'bergall',
    description: 'Group avec des options supplémentaires',
    attributes: {
        href: { type: 'string', default: '' },
        newTab: { type: 'boolean', default: false },
        animation: { type: 'string', default: 'none' },
        positionAbsolute: { type: "boolean", default: false },
        zIndex: { type: 'number', default: 0 },
        pos: { type: "object", default: { x: 0, y: 0 } }
    },
    example: {
        attributes: {
            href: 'https://example.com',
            newTab: true,
            animation: 'fadeInUp',
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: { content: 'Ceci est un aperçu du bloc Group Extended.' }
            }
        ]
    },
    supports: {
        color: { background: true, text: true },
        anchor: true,
        spacing: { margin: true, padding: true },
        border: { radius: true, color: true, style: true, width: true },
        align: ["wide", "full"],
        html: false,
    },
    edit: ({ attributes, setAttributes }) => {
        const { href, newTab, animation, positionAbsolute } = attributes;

        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <PanelBody title="Link Settings">
                        <URLInput
                            label="URL"
                            value={href}
                            onChange={(value) => setAttributes({ href: value })}
                            placeholder="https://example.com"
                        />
                        <ToggleControl
                            label="Open in new tab"
                            checked={newTab}
                            onChange={(value) => setAttributes({ newTab: value })}
                        />
                    </PanelBody>
                    <PanelBody title='Positions'>
                        <ToggleControl
                            label="absolue"
                            checked={positionAbsolute}
                            onChange={(value) => setAttributes({ positionAbsolute: value })}
                        />
                    </PanelBody>
                    <PanelBody title="Animation Settings">
                        <SelectControl
                            label="Entrance Animation"
                            value={animation}
                            options={[
                                { label: 'None', value: 'none' },
                                { label: 'Fade In', value: 'fadeIn' },
                                { label: 'Fade In from Bottom', value: 'fadeInUp' }
                            ]}
                            onChange={(value) => setAttributes({ animation: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div style={{ position: positionAbsolute ? "absolute" : "relative" }}>
                    <InnerBlocks />
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { href, newTab, animation, positionAbsolute } = attributes;

        const blockProps = useBlockProps.save({
            className: `animate-${animation} ${href ? 'has-link' : ''}`
        });

        const wrapperStyle = { position: positionAbsolute ? "absolute" : "relative" };

        const content = <InnerBlocks.Content />;

        return (
            <div {...blockProps} style={wrapperStyle}>
                {href ? (
                    <a
                        href={href}
                        target={newTab ? "_blank" : "_self"}
                        rel={newTab ? "noopener noreferrer" : undefined}
                    >
                        {content}
                    </a>
                ) : content}
            </div>
        );
    }
});

document.addEventListener("DOMContentLoaded", function () {


    utils.$('.wp-block-bergallblocks-group-extended').forEach(element => {

        if (!element.classList.contains("animate-fadeIn") && !element.classList.contains("animate-fadeInUp")) return;

        const isFadeUp = element.classList.contains("animate-fadeInUp");

        animate(element, {
            opacity: [0, 1],
            translateY: isFadeUp ? -100 : 0,
            display: "block",
            duration: 750,
            delay: 175,
            alternate: true,
            // loop: true,
            easing: 'easeOutQuad',
            autoplay: onScroll({
                target: element,
                container: document.window,
                axis: 'y',
                // sync: true,
                debug: false,
                enter: 'bottom 0%',
                leave: 'top 90%',
            })
        });
    });
});