import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

registerBlockType('bergallblocks/container-parallax', {
    title: 'Parallax Container',
    icon: 'images-alt2',
    category: 'bergall',
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
                            min={10}
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

// Parallax effect script for frontend
document.addEventListener("DOMContentLoaded", function () {
    gsap.utils.toArray(".parallax-container").forEach(container => {
        const speed = (container.getAttribute("data-speed") || 50) * 10;
        const depth = container.getAttribute("data-depth") || 0;
        container.style.zIndex = depth;
        gsap.fromTo(
            container.querySelector(".parallax-content"),
            { y: speed },
            {
                ease: "none",
                y: -speed,
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    });
    ScrollTrigger.refresh(); // Force recalculation of positions
});
