import { InnerBlocks, InspectorControls, URLInput, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import './style.css';

export default function Edit({ attributes, setAttributes }) {
    const { href, newTab, animation, positionAbsolute, top, left, right, bottom, width, height, zIndex, overflow } = attributes;

    const wrapperStyle = {
        position: positionAbsolute ? 'absolute' : 'relative',
        overflow: overflow === 'x' ? undefined : overflow === 'y' ? undefined : overflow || undefined,
        overflowX: overflow === 'x' ? 'auto' : undefined,
        overflowY: overflow === 'y' ? 'auto' : undefined,
        top: positionAbsolute && top ? top : undefined,
        left: positionAbsolute && left ? left : undefined,
        right: positionAbsolute && right ? right : undefined,
        bottom: positionAbsolute && bottom ? bottom : undefined,
        width: width || undefined,
        height: height || undefined,
        zIndex: positionAbsolute && zIndex ? zIndex : undefined
    };

    return (
        <div>
            <InspectorControls>
                <PanelBody title="Link Settings">
                    <URLInput
                        label="URL"
                        value={href}
                        onChange={value => setAttributes({ href: value })}
                        placeholder="https://example.com"
                    />
                    <ToggleControl
                        label="Open in new tab"
                        checked={newTab}
                        onChange={value => setAttributes({ newTab: value })}
                    />
                </PanelBody>

                <PanelBody title="Position">
                    <ToggleControl
                        label="Absolute"
                        checked={positionAbsolute}
                        onChange={value => setAttributes({ positionAbsolute: value })}
                    />
                    {positionAbsolute && (
                        <>
                            {['top','left','right','bottom'].map(pos => (
                                <div key={pos}>
                                    <label>{pos.charAt(0).toUpperCase() + pos.slice(1)}</label>
                                    <input
                                        type="text"
                                        value={attributes[pos]}
                                        placeholder="ex: 10px ou 5%"
                                        onChange={e => setAttributes({ [pos]: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label>zIndex</label>
                                <input
                                    type="number"
                                    value={zIndex}
                                    onChange={e => setAttributes({ zIndex: parseInt(e.target.value) || 0 })}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </>
                    )}
                    {['width','height'].map(size => (
                        <div key={size}>
                            <label>{size.charAt(0).toUpperCase() + size.slice(1)}</label>
                            <input
                                type="text"
                                value={attributes[size]}
                                placeholder="ex: 10px ou 5%"
                                onChange={e => setAttributes({ [size]: e.target.value })}
                                style={{ width: '40%' }}
                            />
                        </div>
                    ))}
                    <div>
                        <label>Overflow</label>
                        <select
                            value={overflow}
                            onChange={e => setAttributes({ overflow: e.target.value })}
                            style={{ width: '60%' }}
                        >
                            <option value="">auto</option>
                            <option value="visible">visible</option>
                            <option value="hidden">hidden</option>
                            <option value="scroll">scroll</option>
                            <option value="auto">auto</option>
                            <option value="clip">clip</option>
                            <option value="overlay">overlay</option>
                            <option value="x">overflow-x: auto</option>
                            <option value="y">overflow-y: auto</option>
                        </select>
                    </div>
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
                        onChange={value => setAttributes({ animation: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps({ style: wrapperStyle })}>
                <InnerBlocks />
            </div>
        </div>
    );
}