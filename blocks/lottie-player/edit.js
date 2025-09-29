import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, Button } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import lottie from 'lottie-web';

export default function Edit({ attributes, setAttributes }) {
    const container = useRef(null);

    useEffect(() => {
        if (container.current && attributes.src) {
            container.current.innerHTML = '';
            const anim = lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: attributes.loop,
                autoplay: attributes.autoplay,
                path: attributes.src
            });
            anim.setSpeed(attributes.speed);
            return () => anim.destroy();
        }
    }, [attributes]);

    return (
        <>
            <InspectorControls>
                <PanelBody title="Paramètres Lottie">
                    <ToggleControl
                        label="Lecture automatique"
                        checked={attributes.autoplay}
                        onChange={value => setAttributes({ autoplay: value })}
                    />
                    <ToggleControl
                        label="Boucle"
                        checked={attributes.loop}
                        onChange={value => setAttributes({ loop: value })}
                    />
                    <RangeControl
                        label="Vitesse de lecture"
                        value={attributes.speed}
                        onChange={value => setAttributes({ speed: value })}
                        min={0.1}
                        max={3}
                        step={0.1}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                {attributes.src ? (
                    <div ref={container} style={{ width: '100%', height: 'auto' }} />
                ) : (
                    <MediaUpload
                        onSelect={media => setAttributes({ src: media.url })}
                        allowedTypes={['application/json']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                Choisir un fichier Lottie (.json)
                            </Button>
                        )}
                    />
                )}
            </div>
        </>
    );
}