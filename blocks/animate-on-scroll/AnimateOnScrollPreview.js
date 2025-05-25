import { InnerBlocks } from '@wordpress/block-editor';

export function AnimateOnScrollPreview({ attributes, blockProps, root }) {
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
        <div
            {...blockProps}
            ref={root}
            className="animate-on-scroll"
            style={previewState === 'none' ? undefined : previewStyle}
        >
            <div className="int">
                <InnerBlocks />
            </div>
        </div>
    );
}