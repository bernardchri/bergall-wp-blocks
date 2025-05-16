import { registerBlockType } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton, PanelBody, TextControl, RangeControl, ToggleControl, } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import "./style.css";

registerBlockType('bergallblocks/circle-text', {
    title: 'Circle Text',
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
        rotation: { type: 'number', default: 0 },
        texte: { type: 'string', default: 'YOUR TEXT HERE' } // Assurez-vous que "texte" est défini
    },


    edit: ({ attributes, setAttributes }) => {
        // const { speed, link, gradianttransition, direction, rotation } = attributes;
        // const [text, setText] = useState('YOUR TEXT HERE'); // État local pour le texte

        // const blockProps = useBlockProps({
        //     className: 'circle-text-container',
        // });

        const blockProps = useBlockProps({
            className: `circle-text-container`,
        });
        

        const { speed,  direction, gradianttransition, rotation, texte } = attributes;

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du Marquee">
                        <TextControl
                            label="Texte du Cercle"
                            value={texte}
                            onChange={(value) => setAttributes( {texte: value})}
                        />
                        <RangeControl
                            label="Vitesse"
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={1}
                            max={20}
                        />
                        <ToggleControl
                            label="Direction"
                            checked={direction}
                            onChange={(value) => setAttributes({ direction: value })}
                        />
                        <ToggleControl
                            label="Transition de Gradient"
                            checked={gradianttransition}
                            onChange={(value) => setAttributes({ gradianttransition: value })}
                        />
                        <RangeControl
                            label="Rotation"
                            value={rotation}
                            onChange={(value) => setAttributes({ rotation: value })}
                            min={0}
                            max={360}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className={`circle-text-wrapper ${gradianttransition ? "fadeout-horizontal" : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>

                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path id="SunCatcherStudio" fill="none" stroke="#000000"
                                d="M 10, 50 A 40,40 0 1,1 90,50 A 40,40 0 1,1 10,50 Z" />
                            <text fontSize="10" fill="#000000" letterSpacing="2" fontFamily="sans-serif" fontWeight="bold">
                                <textPath href="#SunCatcherStudio" side="left" startOffset="5">{texte}</textPath>
                            </text>
                        </svg>
                    </div>
                </div>



            </div>
        );
    },
    save: ({ attributes }) => {
        const { speed, direction, gradianttransition, rotation, texte } = attributes;

        const blockProps = useBlockProps.save({
            className: `circle-text-container --view`,
        });

        const content = (
            <div {...useBlockProps.save({ className: `circle-text-container --view` })}>
                <div className={`circle-text-wrapper ${gradianttransition ? "fadeout-horizontal" : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
                    <div className="circle-text-content" style={{ '--speed': `${speed}s`, '--direction': `${direction ? 'forwards' : 'reverse'}` }}>
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path id="SunCatcherStudio" fill="none" stroke="#000000"
                                d="M 10, 50 A 40,40 0 1,1 90,50 A 40,40 0 1,1 10,50 Z" />
                            <text fontSize="10" fill="#000000" letterSpacing="1" fontFamily="sans-serif" fontWeight="bold">
                                <textPath href="#SunCatcherStudio" side="left" startOffset="5">{texte}</textPath>
                            </text>
                        </svg>
                    </div>
                </div>
            </div>
        );

        return content;
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const marqueeContainer = document.querySelectorAll('.circle-text-container');
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