import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';

export function AnimateOnScrollControls({ attributes, setAttributes }) {
    const {
        initialScale,
        finalScale,
        zIndex,
        startX,
        startY,
        endX,
        endY,
        startRotate,
        endRotate,
        startOpacity,
        endOpacity,
        scrollEnterElement,
        scrollEnterViewport,
        scrollLeaveElement,
        scrollLeaveViewport,
        debug,
        previewState,
    } = attributes;

    // Détermine le style d'aperçu selon previewState
    let previewStyle = {};
    if (previewState === 'start') {
        previewStyle = {
            transform: `
                scale(${initialScale})
                translateX(${startX}px)
                translateY(${startY}px)
                rotate(${startRotate}deg)
            `,
            opacity: startOpacity,
            zIndex: zIndex,
        };
    } else if (previewState === 'end') {
        previewStyle = {
            transform: `
                scale(${finalScale})
                translateX(${endX}px)
                translateY(${endY}px)
                rotate(${endRotate}deg)
            `,
            opacity: endOpacity,
            zIndex: zIndex,
        };
    }

    return (
        <InspectorControls>
            <PanelBody title="Aperçu animation" initialOpen={true}>
                <SelectControl
                    label="État d'aperçu"
                    value={previewState}
                    options={[
                        { label: 'Début animation', value: 'start' },
                        { label: 'Fin animation', value: 'end' }
                    ]}
                    onChange={value => setAttributes({ previewState: value })}
                    help="Permet de visualiser l'état initial ou final de l'animation dans l'éditeur."
                />
                 <SelectControl
                    label="Afficher le mode debug en front"
                    value={debug ? 'true' : 'false'}
                    options={[
                        { label: 'Non', value: 'false' },
                        { label: 'Oui', value: 'true' }
                    ]}
                    onChange={value => setAttributes({ debug: value === 'true' })}
                />
            </PanelBody>
           

            <PanelBody title="Opacité" initialOpen={true}>
                <RangeControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Opacité de départ (%)"
                    value={startOpacity}
                    onChange={(value) => setAttributes({ startOpacity: Number(value) })}
                    min={0}
                    max={1}
                    step={.1}
                />
                <RangeControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Opacité de fin (%)"
                    value={endOpacity}
                    onChange={(value) => setAttributes({ endOpacity: Number(value) })}
                    min={0}
                    max={1}
                    step={.1}
                />
            </PanelBody>
            <PanelBody title="Position Animation" initialOpen={true}>
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Start X (px)"
                    type="number"
                    value={startX}
                    onChange={(value) => setAttributes({ startX: Number(value) })}
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Start Y (px)"
                    type="number"
                    value={startY}
                    onChange={(value) => setAttributes({ startY: Number(value) })}
                />
                <TextControl
                    label="End X (px)"
                    type="number"
                    value={endX}
                    onChange={(value) => setAttributes({ endX: Number(value) })}
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="End Y (px)"
                    type="number"
                    value={endY}
                    onChange={(value) => setAttributes({ endY: Number(value) })}
                />
            </PanelBody>
            <PanelBody title="Scale Settings">
                <RangeControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize

                    label="Initial Scale"
                    value={initialScale}
                    onChange={(value) => setAttributes({ initialScale: Number(value) })}
                    min={0}
                    max={10}
                    step={0.1}
                />
                <RangeControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Final Scale"
                    value={finalScale}
                    onChange={(value) => setAttributes({ finalScale: Number(value) })}
                    min={0}
                    max={10}
                    step={0.1}
                />
            </PanelBody>

            <PanelBody title="Rotation Animation" initialOpen={false}>
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Start Rotation (deg)"
                    type="number"
                    value={startRotate}
                    onChange={(value) => setAttributes({ startRotate: Number(value) })}
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="End Rotation (deg)"
                    type="number"
                    value={endRotate}
                    onChange={(value) => setAttributes({ endRotate: Number(value) })}
                />
            </PanelBody>
            <PanelBody title="Déclencheurs scroll" initialOpen={false}>
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Entrée (élément)"
                    value={scrollEnterElement}
                    onChange={(value) => setAttributes({ scrollEnterElement: value })}
                    help='Exemple : "bottom"'
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Entrée (viewport)"
                    value={scrollEnterViewport}
                    onChange={(value) => setAttributes({ scrollEnterViewport: value })}
                    help='Exemple : "top"'
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Sortie (élément)"
                    value={scrollLeaveElement}
                    onChange={(value) => setAttributes({ scrollLeaveElement: value })}
                    help='Exemple : "center"'
                />
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Sortie (viewport)"
                    value={scrollLeaveViewport}
                    onChange={(value) => setAttributes({ scrollLeaveViewport: value })}
                    help='Exemple : "center"'
                />
            </PanelBody>



        </InspectorControls>
    );
}