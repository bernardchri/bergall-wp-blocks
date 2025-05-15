import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody, RangeControl, TextControl, SelectControl } from '@wordpress/components';
import "./style.css";

import { onScroll, animate, utils } from 'animejs';

const applyScrollAnimation = (initialScale, zIndex, start, end) => {
    
    utils.$('.scale-on-scroll').forEach(section => {
        console.log(section)
        animate(section, {
            scale: [initialScale, 1],
            zIndex: zIndex,
            autoplay: onScroll({
                target: section,
                axis: 'y',
                sync: true,
                debug: false,
                enter: "bottom top+=20%",
                leave: "center center"
            }),
        });
    });
};

registerBlockType('bergallblocks/scale-on-scroll', {
    title: 'Scale on Scroll',
    description : 'composant qui crée une animation d’effet d’agrandissement au scroll dans la page',
    icon: 'editor-expand', // Utilisation de l'icône "expand" des Dashicons
    category: 'bergall',
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
        zIndex: {
            type: 'number',
            default: 10,
        },
        scrollStartComponent: {
            type: 'string',
            default: 'top',
        },
        scrollStartView: {
            type: 'string',
            default: 'bottom',
        },
        scrollEndComponent: {
            type: 'string',
            default: 'center',
        },
        scrollEndView: {
            type: 'string',
            default: 'center',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const {
            initialScale,
            zIndex,
            scrollStartComponent,
            scrollStartView,
            scrollEndComponent,
            scrollEndView
        } = attributes;

        const scrollStart = `${scrollStartComponent} ${scrollStartView}`;
        const scrollEnd = `${scrollEndComponent} ${scrollEndView}`;

        useEffect(() => {
            applyScrollAnimation(initialScale, zIndex, scrollStart, scrollEnd);
            console.log(scrollStart)
        }, [initialScale, zIndex, scrollStart, scrollEnd]);

        const positionOptions = [
            { value: 'top', label: 'Top' },
            { value: 'right', label: 'Right' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Scale Settings">
                        <RangeControl
                            label="Initial Scale"
                            value={initialScale}
                            onChange={(value) => setAttributes({ initialScale: value })}
                            min={0.1}
                            max={1}
                            step={0.1}
                        />
                    </PanelBody>
                    <PanelBody title="Z-Index Settings">
                        <TextControl
                            label="Z-Index"
                            type="number"
                            value={zIndex}
                            onChange={(value) => setAttributes({ zIndex: Number(value) })}
                            min={1}
                            max={100}
                        />
                    </PanelBody>
                    <PanelBody title="Options supplémentaires" initialOpen={false}>
                        <SelectControl
                            label="Scroll Trigger Start (Component)"
                            value={scrollStartComponent}
                            options={positionOptions}
                            onChange={(value) => setAttributes({ scrollStartComponent: value })}
                        />
                        <SelectControl
                            label="Scroll Trigger Start (View)"
                            value={scrollStartView}
                            options={positionOptions}
                            onChange={(value) => setAttributes({ scrollStartView: value })}
                        />
                        <SelectControl
                            label="Scroll Trigger End (Component)"
                            value={scrollEndComponent}
                            options={positionOptions}
                            onChange={(value) => setAttributes({ scrollEndComponent: value })}
                        />
                        <SelectControl
                            label="Scroll Trigger End (View)"
                            value={scrollEndView}
                            options={positionOptions}
                            onChange={(value) => setAttributes({ scrollEndView: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="scale-on-scroll">
                    <InnerBlocks />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            initialScale,
            zIndex,
            scrollStartComponent,
            scrollStartView,
            scrollEndComponent,
            scrollEndView
        } = attributes;

        const scrollStart = `${scrollStartComponent} ${scrollStartView}`;
        const scrollEnd = `${scrollEndComponent} ${scrollEndView}`;

        return (
            <div
                className="scale-on-scroll"
                data-initial-scale={initialScale}
                data-z-index={zIndex}
                data-scroll-start={scrollStart}
                data-scroll-end={scrollEnd}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});

// Apply the scroll animation on the front-end
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scale-on-scroll').forEach((section) => {
        const initialScale = section.getAttribute('data-initial-scale') || 0.8;
        const zIndex = section.getAttribute('data-z-index') || 10;
        const scrollStart = section.getAttribute('data-scroll-start') || 'top bottom';
        const scrollEnd = section.getAttribute('data-scroll-end') || 'center center';
        applyScrollAnimation(parseFloat(initialScale), parseInt(zIndex, 10), scrollStart, scrollEnd);
    });
});
