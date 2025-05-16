import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import "./style.css";

registerBlockType('bergallblocks/marquee', {
    title: 'Marquee (Défilement)',
    icon: 'slides',
    category: 'bergall',
    supports: {
        color: { background: true, text: true },
        spacing: { padding: true, margin: true },
        "align": ["wide", "full"],
        html: false,
        typography: { lineHeight: true },
    },
    example: {
        attributes: {
            speed: 10,
            link: '',
            direction: 'left',
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: { content: 'hello' }
            },
            {
                name: 'core/paragraph',
                attributes: { content: 'dolly' }
            },
            {
                name: 'core/paragraph',
                attributes: { content: 'world' }
            }
        ]
    },
    attributes: {
        speed: { type: 'number', default: 10 },
        link: { type: 'string', default: '' },
        direction: { type: 'boolean', default: false },
        gradianttransition: { type: 'boolean', default: false },
        rotation: { type: 'number', default: 0 }
    },
    edit: ({ attributes, setAttributes }) => {
        const { speed, link, gradianttransition, direction, rotation } = attributes;
        const blockProps = useBlockProps({
            className: 'marquee-container',
        });


        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du Marquee">
                        <RangeControl
                            label="Durée de la boucle en sec"
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={0}
                            max={60}
                        />
                        <ToggleControl
                            label="Direction"
                            checked={direction}
                            onChange={(value) => setAttributes({ direction: value })}
                        />
                        <ToggleControl
                            label="Activer/Désactiver le dégradé des bords"
                            checked={gradianttransition}
                            onChange={(value) => setAttributes({ gradianttransition: value })}
                        />
                        <RangeControl
                            label="Rotation"
                            value={rotation}
                            onChange={(value) => setAttributes({ rotation: value })}
                            min={-90}
                            max={90}
                        />
                        <URLInput
                            label="Lien (URL)"
                            value={link}
                            onChange={(value) => setAttributes({ link: value })}
                            placeholder="https://example.com"
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={`marquee-wrapper ${gradianttransition ? "fadeout-horizontal" : ''}`} style={{ overflow: 'scroll', transform: `rotate(${rotation}deg)` }} >
                    <div className="marquee-content" style={{ '--speed': `${speed}s`, "--direction": direction ? "forwards" : "reverse" }}>
                        <InnerBlocks allowedBlocks={['core/paragraph', 'core/group']} />
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { speed, link, direction, gradianttransition, rotation } = attributes;

        const content = (
            <div {...useBlockProps.save({ className: `marquee-container --view ` })}>
                <div className={`marquee-wrapper ${gradianttransition ? "fadeout-horizontal" : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
                    <div className="marquee-content" style={{ '--speed': `${speed}s`, '--direction': `${direction ? 'forwards' : 'reverse'}` }}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );

        return link ? <a href={link} target="_blank" rel="noopener noreferrer">{content}</a> : content;
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const marqueeContainer = document.querySelectorAll('.marquee-container');
    marqueeContainer.forEach(container => {
        const marqueeContent = container.querySelector('.marquee-content');

        if (marqueeContent) {
            const clonedContent = marqueeContent.cloneNode(true);
            clonedContent.querySelectorAll('p').forEach(p => {
                p.setAttribute('aria-hidden', 'true');
            });
            const clonedContentHTML = clonedContent.innerHTML;
            marqueeContent.innerHTML += clonedContentHTML;
        }
    });
}
)