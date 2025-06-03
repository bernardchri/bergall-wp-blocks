import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button, SelectControl } from '@wordpress/components';
import { customIcon } from '../../src/utils/icon';


registerBlockType('animablocks/animated-text', {
    title: "Texte animé",
    category: 'anima',
    description: "animation de texte titre ou paragraphe",
    icon: customIcon,
    attributes: {
        duration: {
            type: "number",
            default: 0.5
        },
        stagger: {
            type: "number",
            default: 0.1
        },
        delay: {
            type: "number",
            default: 0.5
        },
        animationType: {
            type: 'string',
            default: "lines"
        }
    },
    supports: {
        html: false
    },
    example: {
        attributes: {
            duration: 1,
            stagger: 0.1,
            delay: 0.1,
            animationType: "chars"
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: { content: 'Ceci est un aperçu du texte animé.' }
            }
        ]
    },

    edit({ attributes, setAttributes }) {
        const { duration, stagger, delay, animationType } = attributes;

        const resetDuration = () => setAttributes({ duration: 0.300 });
        const resetStagger = () => setAttributes({ stagger: 0.08 });
        const resetDelay = () => setAttributes({ delay: 1.500 });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Animation Settings">
                        <div style={{ paddingBottom: '30px' }}>
                            <RangeControl
                                label="Duration"
                                value={duration}
                                onChange={(value) => setAttributes({ duration: value })}
                                min={0.075}
                                max={5}
                                step={0.075}
                            />
                            <Button isSecondary onClick={resetDuration} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                Reset
                            </Button>
                        </div>
                        <div style={{ paddingBottom: '30px' }}>
                            <RangeControl
                                label="Stagger"
                                value={stagger}
                                onChange={(value) => setAttributes({ stagger: value })}
                                min={0.01}
                                max={1}
                                step={0.01}
                            />
                            <Button isSecondary onClick={resetStagger} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                Reset
                            </Button>
                        </div>
                        <div style={{ paddingBottom: '30px' }}>
                            <RangeControl
                                label="Delay"
                                value={delay}
                                onChange={(value) => setAttributes({ delay: value })}
                                min={0}
                                max={2}
                                step={0.01}
                            />
                            <Button isSecondary onClick={resetDelay} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                Reset
                            </Button>
                        </div>
                        <div style={{ paddingBottom: '30px' }}>
                            <SelectControl
                                label="Animation Type"
                                value={animationType}
                                options={[
                                    { label: 'Lines', value: 'lines' },
                                    { label: 'Words', value: 'words' },
                                    { label: 'Characters', value: 'chars' }
                                ]}
                                onChange={(value) => setAttributes({ animationType: value })}
                            />
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
        const { duration, stagger, delay, animationType } = attributes;

        return (
            <div className="animated-paragraph" data-duration={duration} data-stagger={stagger} data-delay={delay} data-animation-type={animationType}>
                <InnerBlocks.Content />
            </div>
        );
    },
});


import { animate, onScroll, utils } from "animejs"
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

document.addEventListener('DOMContentLoaded', function () {

    if (utils.$('.animated-paragraph')) {
        utils.$('.animated-paragraph').forEach((paragraph) => {
            const animationType = paragraph.getAttribute('data-animation-type') || 'lines';
            const splitResult = Splitting({ target: paragraph, by: animationType });

            // Récupérer les attributs de données
            const duration = parseFloat(paragraph.getAttribute('data-duration')) || 0.300;
            const stagger = parseFloat(paragraph.getAttribute('data-stagger')) || 0.08;
            const delay = parseFloat(paragraph.getAttribute('data-delay')) || 0.500;



            // Animation par ligne, mot ou caractère
            splitResult[0][animationType].forEach((element, index) => {
               
                animate(element, {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: duration * 1000,
                    delay: delay + (stagger * 1000) * index ,
                    easing: 'easeOutBack',
                    autoplay: onScroll({
                        target: element,
                        debug: false,
                        axis: 'y',
                        enter: 'bottom 10%',
                        // leave: 'top 20%',
                    //     // sync: true
                    })
                });
            });
        });
    }

}, { passive: true }); 