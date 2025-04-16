import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import gsap from 'gsap';
import './style.css'; // Assurez-vous d'importer le fichier CSS

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
        zIndex : {type :'number',default:0},
        pos : {
            type:"object", default : {x:0,y:0}
        }
    },
    example: {
        attributes: {
            href: 'https://example.com',
            newTab: true,
            animation: 'fade-in-bottom',
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: { content: 'Ceci est un aperçu du bloc Group Extended.' }
            }
        ]
    },
    supports: {
        color: {
            background: true,
            text: true
        },
        anchor: true,
        spacing: {
            margin: true,
            padding: true
        },
        border: {
            radius: true,
            color: true,
            style: true,
            width: true
        },
        "align": ["wide", "full"],
        "html": false,

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

        const blockProps = useBlockProps.save({ className: `animate-${animation} ${href ? 'has-link' : ''} ` });

        return <div {...blockProps}  style={{ position: positionAbsolute ? "absolute" : "relative" }}>
            {href ? (
                <a href={href} target={newTab ? "_blank" : "_self"} rel={newTab ? "noopener noreferrer" : undefined} {...blockProps}>
                    <InnerBlocks.Content />
                </a>
            ) : (
                <InnerBlocks.Content />
            )}
        </div>
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (!gsap) {
        return;
    }

    if (document.querySelector('.wp-block-bergallblocks-group-extended')) {
        gsap.utils.toArray(".animate-fadeIn, .animate-fadeInUp").forEach(element => {
            gsap.fromTo(element,
                { opacity: 0, y: element.classList.contains("animate-fadeInUp") ? 50 : 0, display: "block" },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    delay: 0.175,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

    }
});