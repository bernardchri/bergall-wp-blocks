import { registerBlockType } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton, PanelBody, PanelRow, TextControl, SelectControl, RangeControl, RadioControl, ToggleControl, } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls, URLInput } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import './style.css';
import './editor.css'; // <-- Ajout de la CSS pour l'éditeur

import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui'; // Importer jQuery UI

registerBlockType('animablocks/circle-text', {
    title: 'Circle Text',
    icon: 'slides',
    category: 'anima',
    apiVersion: 2,
    $schema: "https://schemas.wp.org/trunk/block.json",
    supports: {
        color: { background: true, text: true },
        spacing: { padding: true, margin: true },
        align: ["wide", "full", "center"],
        html: false,
        typography: { lineHeight: true },
    },

    // example: {
    //     attributes: {
    //         speed: 10,
    //         link: '',
    //         direction: 'left',
    //     },
    //     innerBlocks: [
    //         {
    //             name: 'core/paragraph',
    //             attributes: { content: 'hello' }
    //         },
    //         {
    //             name: 'core/paragraph',
    //             attributes: { content: 'dolly' }
    //         },
    //         {
    //             name: 'core/paragraph',
    //             attributes: { content: 'world' }
    //         }
    //     ]
    // },


    attributes: {
        top: { type: 'number', default: 200 },
        left: { type: 'number', default: 200 },
        topUnit: { type: 'string', default: 'px' },
        leftUnit: { type: 'string', default: 'px' },
        position: { type: 'string', default: 'static' },
        width: { type: 'number', default: 200 },
        speed: { type: 'number', default: 10 },
        link: { type: 'string', default: '' },
        direction: { type: 'boolean', default: false },
        rotation: { type: 'number', default: 0 },
        texte: { type: 'string', default: 'YOUR TEXT HERE' },
    },


    edit: ({ attributes, setAttributes }) => {
        const { position, top, left, topUnit, leftUnit, width, speed, direction, rotation, texte } = attributes;
        const blockProps = useBlockProps();

        // const { speed, link, gradianttransition, direction, rotation } = attributes;
        // const [text, setText] = useState('YOUR TEXT HERE'); // État local pour le texte
        // const blockProps = useBlockProps({
        //     className: 'circle-text-container',
        // });
        // const blockProps = useBlockProps({
        //     className: `circle-text-container`,
        // });
        // const blockProps = useBlockProps({
        //     className: 'circle-text-container',
        //     style: {
        //         backgroundColor: attributes.backgroundColor, // Assurez-vous que cela est défini dans vos attributs
        //     },
        // });


        useEffect(() => {
            if (position === 'absolute' || position === 'fixed') {
                $('.drag-handle').draggable({
                    drag: function (event, ui) {
                        setAttributes({ top: ui.position.top, left: ui.position.left });
                    }
                });
            }
        }, [position]);


        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du Circle Text">
                        <TextControl
                            label="Texte du Cercle"
                            value={texte}
                            onChange={(value) => setAttributes({ texte: value })}
                        />
                        <RangeControl
                            label="Vitesse"
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={1}
                            max={20}
                        />
                        <RangeControl
                            label="Largeur"
                            value={width}
                            onChange={(value) => setAttributes({ width: value })}
                            min={0}
                            max={500}
                        />
                        <RangeControl
                            label="Rotation"
                            value={rotation}
                            onChange={(value) => setAttributes({ rotation: value })}
                            min={0}
                            max={360}
                            default={5}
                        />
                        <ToggleControl
                            label="Direction"
                            checked={direction}
                            onChange={(value) => setAttributes({ direction: value })}
                        />

                    </PanelBody>

                    <PanelBody title="Positionnement">
                        <RadioControl
                            label="Type de position"
                            selected={position}

                            options={[
                                { label: 'Normale', value: 'static', default: 'static' },
                                { label: 'Absolue en coordonnées', value: 'absolute' },
                                { label: 'Fixée sur l\'écran en coordonnées', value: 'fixed' },
                            ]}
                            onChange={(value) => setAttributes({ position: value })}
                        />

                        {(position === 'absolute' || position === 'fixed') && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <TextControl
                                        label="Top"
                                        type="number"
                                        value={top}
                                        onChange={(value) => setAttributes({ top: value })}
                                        style={{ flex: 1 }}
                                    />
                                    <SelectControl
                                        label="Unité"
                                        value={topUnit}
                                        options={[
                                            { label: 'px', value: 'px' },
                                            { label: '%', value: '%' },
                                            { label: 'em', value: 'em' },
                                        ]}
                                        onChange={(value) => setAttributes({ topUnit: value })}
                                        style={{ width: '80px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <TextControl
                                        label="Top"
                                        type="number"
                                        value={left}
                                        onChange={(value) => setAttributes({ left: value })}
                                        style={{ flex: 1 }}
                                    />
                                    <SelectControl
                                        label="Unité"
                                        value={leftUnit}
                                        options={[
                                            { label: 'px', value: 'px' },
                                            { label: '%', value: '%' },
                                            { label: 'em', value: 'em' },
                                        ]}
                                        onChange={(value) => setAttributes({ leftUnit: value })}
                                        style={{ width: '80px' }}
                                    />
                                </div>
                            </>
                        )}

                    </PanelBody>
                </InspectorControls>


                {/* <div className={`circle-text-wrapper`} style={{ position: position, top: `${top}${topUnit}`, left: `${left}${leftUnit}` }}> */}

                <div className={`circle-text-wrapper`} style={{}}>
                    <svg className={`circle-text-svg`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ position, top: `${top}${topUnit}`, left: `${left}${leftUnit}`, width: width + 'px', transform: `rotate(${rotation}deg)`, '--speed': (50 / speed) + 's', '--direction': direction ? 'forwards' : 'reverse' }}>
                        <path id="SunCatcherStudio" fill="none" stroke="#000000"
                            d="M 10, 50 A 40,40 0 1,1 90,50 A 40,40 0 1,1 10,50 Z" />
                        <text fontSize="10" fill="#000000" letterSpacing="2" fontFamily="sans-serif" fontWeight="bold">
                            <textPath href="#SunCatcherStudio" side="left" startOffset="5">{texte}</textPath>
                        </text>
                    </svg>


                    {position === 'absolute' || position === 'fixed' ? (
                        <div className="drag-handle" style={{ position, top: `${top}${topUnit}`, left: `${left}${leftUnit}`, cursor: 'move', zIndex: 1000 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200">
                                <path fill="green" d="M100,200L60,160h19V40H60L100,0l40,40H121V160h19zM0,100L40,60v19H160V60L200,100L160,140V121H40v19z" />
                            </svg>
                        </div>
                    ) : null}


                </div>

            </div >
        );
    },


    save: ({ attributes }) => {
        const { position, top, left, topUnit, leftUnit, width, speed, direction, rotation, texte } = attributes;

        const blockProps = useBlockProps.save({
            className: `circle-text-container --view`,
        });

        const content = (
            <div {...useBlockProps.save({ className: `circle-text-container --view` })}>

                <div className={`circle-text-wrapper`} style={{}}>
                    <svg className={`circle-text-svg`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ position, top: `${top}${topUnit}`, left: `${left}${leftUnit}`, width: width + 'px', transform: `rotate(${rotation}deg)`, '--speed': (50 / speed) + 's', '--direction': direction ? 'forwards' : 'reverse', }}>
                        <path id="SunCatcherStudio" fill="none" stroke="#000000"
                            d="M 10, 50 A 40,40 0 1,1 90,50 A 40,40 0 1,1 10,50 Z" />
                        <text fontSize="10" fill="#000000" letterSpacing="1" fontFamily="sans-serif" fontWeight="bold">
                            <textPath href="#SunCatcherStudio" side="left" startOffset="5">{texte}</textPath>
                        </text>
                    </svg>
                </div>
            </div>
        );

        return content;
    }

});


// document.addEventListener('DOMContentLoaded', () => {
//     const marqueeContainer = document.querySelectorAll('.circle-text-container');
//     marqueeContainer.forEach(container => {
//         const marqueeContent = container.querySelector('.marquee-content');

//         if (marqueeContent) {
//             const clonedContent = marqueeContent.cloneNode(true);
//             clonedContent.querySelectorAll('p').forEach(p => {
//                 p.setAttribute('aria-hidden', 'true');
//             });
//             const clonedContentHTML = clonedContent.innerHTML;
//             marqueeContent.innerHTML += clonedContentHTML;
//         }
//     });
// })