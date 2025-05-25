import { InnerBlocks, InspectorControls, URLInput, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { animate, onScroll, utils } from 'animejs';
import './style.css';

registerBlockType('animablocks/group-extended', {
    title: 'Group Extended',
    icon: 'admin-links',
    category: 'anima',
    description: 'Group avec des options supplémentaires',
    attributes: {
        href: { type: 'string', default: '' },
        newTab: { type: 'boolean', default: false },
        animation: { type: 'string', default: 'none' },
        positionAbsolute: { type: "boolean", default: false },
        zIndex: { type: 'number', default: 0 },
        pos: { type: "object", default: { x: 0, y: 0 } },
        top: { type: 'string', default: '' },
        left: { type: 'string', default: '' },
        right: { type: 'string', default: '' },
        bottom: { type: 'string', default: '' },
        height: { type: 'string', default: '' },
        width: { type: 'string', default: '' },
        overflow: { type: 'string', default: '' },
    },
    example: {
        attributes: {
            href: 'https://example.com',
            newTab: true,
            animation: 'fadeInUp',
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: { content: 'Ceci est un aperçu du bloc Group Extended.' }
            }
        ]
    },
    supports: {
        color: { background: true, text: true },
        anchor: true,
        spacing: { margin: true, padding: true },
        border: { radius: true, color: true, style: true, width: true },
        align: ["wide", "full"],
        html: false,
    },
    edit: ({ attributes, setAttributes }) => {
        const { href, newTab, animation, positionAbsolute, top, left, right, bottom, height, width, zIndex, overflow } = attributes;

        return (
            <div >
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
                    <PanelBody title='Positions'>
                        <ToggleControl
                            label="absolute"
                            checked={positionAbsolute}
                            onChange={(value) => setAttributes({ positionAbsolute: value })}
                        />
                        {positionAbsolute && (
                            <div styles={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: '1em' }}>
                                    <label>Top</label>
                                    <input
                                        type="text"
                                        value={top}
                                        placeholder="ex: 10px ou 5%"
                                        onChange={e => setAttributes({ top: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label>Left</label>
                                    <input
                                        type="text"
                                        value={left}
                                        placeholder="ex: 10px ou 5%"
                                        onChange={e => setAttributes({ left: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label>Right</label>
                                    <input
                                        type="text"
                                        value={right}
                                        placeholder="ex: 10px ou 5%"
                                        onChange={e => setAttributes({ right: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label>Bottom</label>
                                    <input
                                        type="text"
                                        value={bottom}
                                        placeholder="ex: 10px ou 5%"
                                        onChange={e => setAttributes({ bottom: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label>zIndex</label>
                                    <input
                                        type="text"
                                        value={zIndex}
                                        placeholder="-999 à 999"
                                        onChange={e => setAttributes({ zIndex: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                
                            </div>
                        )}
                        <div>
                            <label>height</label>
                            <input
                                type="text"
                                value={height}
                                placeholder="ex: 10px ou 5%"
                                onChange={e => setAttributes({ height: e.target.value })}
                                style={{ width: '40%' }}
                            />
                        </div>
                        <div>
                            <label>width</label>
                            <input
                                type="text"
                                value={width}
                                placeholder="ex: 10px ou 5%"
                                onChange={e => setAttributes({ width: e.target.value })}
                                style={{ width: '40%' }}
                            />
                        </div>
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
                            onChange={(value) => setAttributes({ animation: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    {...useBlockProps({
                        style: {
                            position: positionAbsolute ? "absolute" : "relative",
                            overflow: overflow === "x" ? undefined : overflow === "y" ? undefined : overflow || undefined,
                            overflowX: overflow === "x" ? "auto" : undefined,
                            overflowY: overflow === "y" ? "auto" : undefined,
                            width:  width ? width : "",
                            height:  height ? height : "",
                            zIndex: positionAbsolute && zIndex ? zIndex : undefined,
                            top: positionAbsolute && top ? top : undefined,
                            left: positionAbsolute && left ? left : undefined,
                            right: positionAbsolute && right ? right : undefined,
                            bottom: positionAbsolute && bottom ? bottom : undefined
                        }
                    })}>
                    <InnerBlocks />
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { href, newTab, animation, positionAbsolute, top, left, right, bottom, width, height, zIndex, overflow } = attributes;

        const blockProps = useBlockProps.save({
            className: `animate-${animation} ${href ? 'has-link' : ''}`
        });

        const wrapperStyle = {
            position: positionAbsolute ? "absolute" : "relative",
            overflow: overflow === "x" ? undefined : overflow === "y" ? undefined : overflow || undefined,
            overflowX: overflow === "x" ? "auto" : undefined,
            overflowY: overflow === "y" ? "auto" : undefined,
            top: positionAbsolute && top ? top : undefined,
            left: positionAbsolute && left ? left : undefined,
            right: positionAbsolute && right ? right : undefined,
            bottom: positionAbsolute && bottom ? bottom : undefined,
            width:  width ? width : undefined,
            height: height ? height : undefined,
            zIndex: positionAbsolute && zIndex ? zIndex : undefined
        };

        const content = <InnerBlocks.Content />;

        return (
            <div {...blockProps} style={wrapperStyle}>
                {href ? (
                    <a
                        href={href}
                        target={newTab ? "_blank" : "_self"}
                        rel={newTab ? "noopener noreferrer" : undefined}
                    >
                        {content}
                    </a>
                ) : content}
            </div>
        );
    }
});

document.addEventListener("DOMContentLoaded", function () {


    utils.$('.wp-block-animablocks-group-extended').forEach(element => {
        if (!element.classList.contains("animate-fadeIn") && !element.classList.contains("animate-fadeInUp")) return;
        const isFadeUp = element.classList.contains("animate-fadeInUp");
        animate(element, {
            opacity: [0, 1],
            translateY: [isFadeUp ? 75 : 0, 0],
            display: "block",
            duration: 750,
            delay: 300,
            alternate: true,
            // loop: true,
            easing: 'easeOutQuad',
            autoplay: onScroll({
                target: element,
                container: document.window,
                axis: 'y',
                // sync: true,
                debug: false,
                enter: 'bottom 0%',
                leave: 'top 90%',
            })
        });
    });
});