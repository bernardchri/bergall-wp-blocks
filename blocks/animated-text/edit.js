import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button, SelectControl } from '@wordpress/components';
import { animate } from 'animejs';
import { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import metadata from './block.json';
import { __ as _i18n } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { duration, stagger, delay, animationType, debug } = attributes;
    const blockProps = useBlockProps({
        className: 'animated-text animated-text-editor'
    });

    const resetDuration = () => setAttributes({ duration: metadata.attributes.duration.default });
    const resetStagger = () => setAttributes({ stagger: metadata.attributes.stagger.default });
    const resetDelay = () => setAttributes({ delay: metadata.attributes.delay.default });

    const refcontainer = useRef(null);
    const originalHTML = useRef(null);

    useEffect(() => {
        if (refcontainer.current && !originalHTML.current) {
            // On sauvegarde le HTML original
            originalHTML.current = refcontainer.current.innerHTML;
        }
    }, []);

    const playAnimation = () => {
        const blockEl = refcontainer.current;
        if (!blockEl) return;

        // 1️⃣ Reset du contenu original pour éviter les spans imbriqués
        if (originalHTML.current) {
            blockEl.innerHTML = originalHTML.current;
        }

        // 2️⃣ Splitting
        const paragraph = blockEl.children;
        if (!paragraph) return;

        const splitResult = Splitting({ target: paragraph, by: animationType });

        // 3️⃣ Animation
        setTimeout(() => {
            splitResult[0][animationType].forEach((element, index) => {
                animate(element, {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: duration * 1000,
                    delay: delay * 1000 + stagger * 1000 * index,
                    easing: 'easeOutBack',
                });
            });
        }, 50); // Petit délai pour s'assurer que le DOM est mis à jour

    };

    return (
        < div  {...blockProps}>
            <InspectorControls>
                <PanelBody title="Animation Settings">
                    <div>
                        <p>{metadata.description}</p>
                    </div>
                    <div style={{ padding: '1rem 0' }}>
                        <Button isPrimary onClick={playAnimation} style={{ width: '100%' }}>
                            ▶ Lecture
                        </Button>
                    </div>
                    <div style={{ padding: '.5rem 0' }}>
                        <SelectControl
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                            label={_i18n('Type d’animation')}
                            value={animationType}
                            options={[
                                { label: _i18n('Lignes'), value: 'lines' },
                                { label: _i18n('Mots'), value: 'words' },
                                { label: _i18n('Caractères'), value: 'chars' },
                            ]}
                            onChange={(value) => setAttributes({ animationType: value })}
                        />
                    </div>

                    <div style={{ padding: '.5rem 0' }}>
                        <RangeControl
                            label={_i18n('Durée (secondes)')}
                            value={duration}
                            onChange={(value) => setAttributes({ duration: value })}
                            min={0.075}
                            max={5}
                            step={0.075}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                        <Button isSecondary onClick={resetDuration} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            Reset
                        </Button>
                    </div>
                    <div style={{ padding: '.5rem 0' }}>
                        <RangeControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label={_i18n('Décalage (secondes)')}
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
                    <div style={{ padding: '.5rem 0' }}>
                        <RangeControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label={_i18n('Délai (secondes)')}
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

                    <div style={{}}>
                        <p>{_i18n('Options de débogage en front')}</p>
                        <SelectControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label={_i18n('Debug')}
                            value={debug ? 'true' : 'false'}
                            options={[
                                { label: _i18n('Off'), value: 'false' },
                                { label: _i18n('On'), value: 'true' },
                            ]}
                            onChange={(value) => setAttributes({ debug: value === 'true' })}
                        />
                    </div>

                </PanelBody>
            </InspectorControls>

            <div ref={refcontainer} >
                <InnerBlocks
                    allowedBlocks={['core/paragraph', 'core/heading']}
                    template={[['core/heading', { placeholder: 'Type your heading here...' }]]}
                />
            </div>
        </div>
    );
}