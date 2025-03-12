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
        animation: { type: 'string', default: 'none' }
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
        const { href, newTab, animation } = attributes;

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
                <InnerBlocks />
            </div>
        );
    },
    save: ({ attributes }) => {
        const { href, newTab, animation } = attributes;
        const blockProps = useBlockProps.save({ className: `animate-${animation} ${href ? 'has-link' : ''}` });

        return href ? (
            <a href={href} target={newTab ? "_blank" : "_self"} rel={newTab ? "noopener noreferrer" : undefined} {...blockProps}>
                <InnerBlocks.Content />
            </a>
        ) : (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
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