import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { PanelBody, RangeControl, TextControl, SelectControl } from '@wordpress/components';
import "./style.css";

import { onScroll, animate, utils, createScope, createSpring, createDraggable } from 'animejs';


registerBlockType('animablocks/animate-on-scroll', {
    title: 'Animation au scroll',
    description: 'composant qui crée une animation d’effet d’agrandissement au scroll dans la page',
    icon: 'editor-expand', // Utilisation de l'icône "expand" des Dashicons
    category: 'anima',

    supports: {
        color: {
            background: true,
            text: true
        },
        html: false,
        align: true,
        alignWide: true,
    },
    attributes: {
        initialScale: {
            type: 'number',
            default: 0.8,
        },
        finalScale: {
            type: 'number',
            default: 1,
        },
        zIndex: {
            type: 'number',
            default: 10,
        },

        startX: {
            type: 'number',
            default: 0,
        },
        startY: {
            type: 'number',
            default: 0,
        },
        endX: {
            type: 'number',
            default: 0,
        },
        endY: {
            type: 'number',
            default: 0,
        },
        startRotate: {
            type: 'number',
            default: 0,
        },
        endRotate: {
            type: 'number',
            default: 0,
        },
        startOpacity: {
            type: 'number',
            default: 1,
        },
        endOpacity: {
            type: 'number',
            default: 1,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const {
            initialScale,
            finalScale,
            zIndex,
            startX,
            startY,
            endX,
            endY,
            startRotate,
            endRotate,
            startOpacity,
            endOpacity
        } = attributes;

        const blockProps = useBlockProps();

        const root = useRef(null);
        const scope = useRef(null);

        const [container] = utils.$('.editor-styles-wrapper.block-editor-writing-flow ');


        // Animation live dans l'éditeur (backoffice) sur le bloc courant
        // TODO: correction du contexte dans le backoffice
        useEffect(() => {
            scope.current = createScope({ root }).add(self => {
                animate('.int', {
                    scale: [initialScale, finalScale],
                    zIndex: zIndex,
                    translateX: [startX, endX],
                    translateY: [startY, endY],
                    rotate: [startRotate, endRotate],
                    opacity: [startOpacity, endOpacity],
                    autoplay: onScroll({
                        target: container,
                        axis: 'y',
                        sync: true,
                        debug: true,
                        enter: "bottom top",
                        leave: "center center"
                    }),
                });

            }
            );

            // Properly cleanup all anime.js instances declared inside the scope
            return () => scope.current.revert()
        }, [initialScale,
            finalScale,
            zIndex,
            startX,
            startY,
            endX,
            endY,
            startRotate,
            endRotate,
            startOpacity,
            endOpacity]);


        return (
            <>
                <InspectorControls>
                    <PanelBody title="Opacité" initialOpen={true}>
                        <RangeControl
                            label="Opacité de départ (%)"
                            value={startOpacity}
                            onChange={(value) => setAttributes({ startOpacity: Number(value) })}
                            min={0}
                            max={1}
                            step={.1}
                        />
                        <RangeControl
                            label="Opacité de fin (%)"
                            value={endOpacity}
                            onChange={(value) => setAttributes({ endOpacity: Number(value) })}
                            min={0}
                            max={1}
                            step={.1}
                        />
                    </PanelBody>
                    <PanelBody title="Position Animation" initialOpen={true}>
                        <TextControl
                            label="Start X (px)"
                            type="number"
                            value={startX}
                            onChange={(value) => setAttributes({ startX: Number(value) })}
                        />
                        <TextControl
                            label="Start Y (px)"
                            type="number"
                            value={startY}
                            onChange={(value) => setAttributes({ startY: Number(value) })}
                        />
                        <TextControl
                            label="End X (px)"
                            type="number"
                            value={endX}
                            onChange={(value) => setAttributes({ endX: Number(value) })}
                        />
                        <TextControl
                            label="End Y (px)"
                            type="number"
                            value={endY}
                            onChange={(value) => setAttributes({ endY: Number(value) })}
                        />
                    </PanelBody>
                    <PanelBody title="Scale Settings">
                        <RangeControl
                            label="Initial Scale"
                            value={initialScale}
                            onChange={(value) => setAttributes({ initialScale: Number(value) })}
                            min={0}
                            max={10}
                            step={0.1}
                        />
                        <RangeControl
                            label="Final Scale"
                            value={finalScale}
                            onChange={(value) => setAttributes({ finalScale: Number(value) })}
                            min={0}
                            max={10}
                            step={0.1}
                        />
                    </PanelBody>

                    <PanelBody title="Rotation Animation" initialOpen={false}>
                        <TextControl
                            label="Start Rotation (deg)"
                            type="number"
                            value={startRotate}
                            onChange={(value) => setAttributes({ startRotate: Number(value) })}
                        />
                        <TextControl
                            label="End Rotation (deg)"
                            type="number"
                            value={endRotate}
                            onChange={(value) => setAttributes({ endRotate: Number(value) })}
                        />
                    </PanelBody>

                </InspectorControls>
                <div
                    {...blockProps}
                    ref={root}
                    className="animate-on-scroll"
                >
                    <div className="int">
                        <InnerBlocks />
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            initialScale,
            finalScale,
            zIndex,
            startX,
            startY,
            endX,
            endY,
            startRotate,
            endRotate,
            startOpacity,
            endOpacity
        } = attributes;

        return (
            <div
                className="animate-on-scroll"
                data-initial-scale={initialScale}
                data-final-scale={finalScale}
                data-z-index={zIndex}
                data-start-x={startX}
                data-start-y={startY}
                data-end-x={endX}
                data-end-y={endY}
                data-start-rotate={startRotate}
                data-end-rotate={endRotate}
                data-start-opacity={startOpacity}
                data-end-opacity={endOpacity}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});

// Apply the scroll animation on the front-end
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
        const initialScale = parseFloat(section.getAttribute('data-initial-scale')) || 0.8;
        const finalScale = parseFloat(section.getAttribute('data-final-scale')) || 1;
        const zIndex = parseInt(section.getAttribute('data-z-index'), 10) || 10;
        const startX = parseFloat(section.getAttribute('data-start-x')) || 0;
        const startY = parseFloat(section.getAttribute('data-start-y')) || 0;
        const endX = parseFloat(section.getAttribute('data-end-x')) || 0;
        const endY = parseFloat(section.getAttribute('data-end-y')) || 0;
        const startRotate = parseFloat(section.getAttribute('data-start-rotate')) || 0;
        const endRotate = parseFloat(section.getAttribute('data-end-rotate')) || 0;

        // Correction : startOpacity et endOpacity doivent être >= 0 et <= 1
        let startOpacity = section.getAttribute('data-start-opacity');
        let endOpacity = section.getAttribute('data-end-opacity');
        startOpacity = startOpacity !== null ? parseFloat(startOpacity) : 1;
        endOpacity = endOpacity !== null ? parseFloat(endOpacity) : 1;

        // Clamp les valeurs pour éviter NaN ou hors bornes
        startOpacity = isNaN(startOpacity) ? 1 : Math.max(0, Math.min(1, startOpacity));
        endOpacity = isNaN(endOpacity) ? 1 : Math.max(0, Math.min(1, endOpacity));

        const sections = Array.isArray(section) ? section : [section];
        sections.forEach(section => {
            if (!section) return;
            animate(section, {
                scale: [initialScale, finalScale],
                zIndex: zIndex,
                translateX: [startX, endX],
                translateY: [startY, endY],
                rotate: [startRotate, endRotate],
                opacity: [startOpacity, endOpacity],
                autoplay: onScroll({
                    target: section,
                    axis: 'y',
                    sync: true,
                    debug: false,
                    enter: "bottom top=-20%",
                    leave: "center center"
                }),
            });
        });



    });
});
