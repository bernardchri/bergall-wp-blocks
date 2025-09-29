import { useBlockProps, InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import metadata from './block.json';

export default function Edit({ attributes, setAttributes }) {
    const { speed, depth, alignment  } = attributes;

    return (
        <div {...useBlockProps({
            style: {
                position: 'relative',
                zIndex: depth
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
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        label="Parallax Speed"
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value })}
                        min={metadata.attributes.speed.minimum}
                        max={metadata.attributes.speed.maximum}
                    />
                    <RangeControl
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        label="Depth (Z-Index)"
                        value={depth}
                        onChange={(value) => setAttributes({ depth: value })}
                        min={-10}
                        max={10}
                    />
                  
                </PanelBody>
            </InspectorControls>
            <div className={`parallax-content`} style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
                textAlign: alignment
            }}>
                <InnerBlocks />
            </div>
        </div>
    );
}