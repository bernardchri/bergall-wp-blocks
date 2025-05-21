import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

// Parallax effect script for frontend
import { onScroll, animate } from 'animejs';



registerBlockType('animablocks/container-parallax', {
    title: 'Parallax Container',
    icon: 'images-alt2',
    description: 'group avec effet parrallax',
    category: 'anima',
    attributes: {
        speed: { type: 'number', default: 50 },
        depth: { type: 'number', default: 0 },
        alignment: { type: 'string', default: 'none' },
        fullWidth: { type: 'boolean', default: false }
    },
    edit: ({ attributes, setAttributes }) => {
        const { speed, depth, alignment, fullWidth } = attributes;

        return (
            <div {...useBlockProps({
                style: {
                    position: 'relative',
                    zIndex: depth,
                    width: fullWidth ? '100%' : 'auto',
                }
            })}>
                <BlockControls>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={(newAlign) => setAttributes({ alignment: newAlign })}
                    />
                </BlockControls>
                <InspectorControls>
                    <PanelBody title="Parallax Settings">
                        <RangeControl
                            label="Parallax Speed"
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={0}
                            max={100}
                        />
                        <RangeControl
                            label="Depth (Z-Index)"
                            value={depth}
                            onChange={(value) => setAttributes({ depth: value })}
                            min={-10}
                            max={10}
                        />
                        <ToggleControl
                            label="Full Width"
                            checked={fullWidth}
                            onChange={(value) => setAttributes({ fullWidth: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="parallax-content" style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    transformPerspective: 1000,
                    textAlign: alignment
                }}>
                    <InnerBlocks />
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { speed, depth, alignment, fullWidth } = attributes;
        return (
            <div className="parallax-container" data-speed={speed} data-depth={depth} style={{
                position: 'relative',
                zIndex: depth,
                maxWidth: fullWidth ? '100%' : 'auto',
                textAlign: alignment
            }}>
                <div className="parallax-content" style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    transformPerspective: 1000
                }}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    }
});



document.addEventListener("DOMContentLoaded", function () {
    
    document.querySelectorAll(".parallax-container").forEach(container => {
        const speed = (container.getAttribute("data-speed") || 50) * 10;
        const depth = container.getAttribute("data-depth") || 0;
        const content = container.querySelector(".parallax-content");

        container.style.zIndex = depth;


        animate(content, {
            translateY: [
                speed,   // Position initiale
                -speed   // Position finale
            ],
            autoplay: onScroll({
                target: content,
                container: document.window,
                axis: 'y',
                sync: true, // synchronisation avec le scroll
                debug: false,
                onUpdate: (value) => {
                    // optionnel : value est une valeur entre 0 et 1 représentant la progression
                    // console.log(value);
                }
            })
        });
    });
});