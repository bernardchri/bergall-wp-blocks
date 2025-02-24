import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button } from '@wordpress/components';
import './style.css';
import { customIcon } from '../../src/utils/icon';


registerBlockType('custom/animated-paragraph', {
    icon: customIcon,
    attributes: {
        duration: {
            type: 'number',
            default: 0.300,
        },
        stagger: {
            type: 'number',
            default: 0.08,
        },
        delay: {
            type: 'number',
            default: 0.500,
        },
    },
    edit({ attributes, setAttributes }) {
        const { duration, stagger, delay } = attributes;

        const resetDuration = () => setAttributes({ duration: 0.300 });
        const resetStagger = () => setAttributes({ stagger: 0.08 });
        const resetDelay = () => setAttributes({ delay: 0.500 });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Animation Settings">
                        <div style={{ paddingBottom: '30px'}}>
                            <RangeControl
                                label="Duration"
                                value={duration}
                                onChange={(value) => setAttributes({ duration: value })}
                                min={0.075}
                                max={5}
                                step={0.075}
                            />
                            <Button isSecondary onClick={resetDuration} style={{ width: '100%', display:'flex', justifyContent:'center' }}>
                                Reset
                            </Button>
                        </div>
                        <div style={{ paddingBottom: '30px'}}>
                            <RangeControl
                                label="Stagger"
                                value={stagger}
                                onChange={(value) => setAttributes({ stagger: value })}
                                min={0.01}
                                max={1}
                                step={0.01}
                            />
                            <Button isSecondary onClick={resetStagger}  style={{ width: '100%', display:'flex', justifyContent:'center' }}>
                                Reset
                            </Button>
                        </div>
                        <div style={{ paddingBottom: '30px'}}>
                            <RangeControl
                                label="Delay"
                                value={delay}
                                onChange={(value) => setAttributes({ delay: value })}
                                min={0}
                                max={2}
                                step={0.01}
                            />
                            <Button isSecondary onClick={resetDelay}  style={{ width: '100%', display:'flex', justifyContent:'center' }}>
                                Reset
                            </Button>
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div className="animated-paragraph">
                    <InnerBlocks
                        allowedBlocks={['core/paragraph', 'core/heading']}
                        template={[
                            ['core/heading', { placeholder: 'Type your heading here...' }]
                        ]}
                    />
                </div>
            </>
        );
    },
    save({ attributes }) {
        const { duration, stagger, delay } = attributes;

        return (
            <div className="animated-paragraph" data-duration={duration} data-stagger={stagger} data-delay={delay}>
                <InnerBlocks.Content />
            </div>
        );
    },
});