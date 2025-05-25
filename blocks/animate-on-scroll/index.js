import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useRef } from '@wordpress/element';
import { AnimateOnScrollControls } from './AnimateOnScrollControls';
import { AnimateOnScrollPreview } from './AnimateOnScrollPreview';
import "./style.css";

registerBlockType('animablocks/animate-on-scroll', {
    title: 'Animation au scroll',
    description: 'composant qui crée une animation d’effet d’agrandissement au scroll dans la page',
    icon: 'editor-expand', // Utilisation de l'icône "expand" des Dashicons
    category: 'anima',

    supports: {
        html: false,
        align: true,
        alignWide: true,
    },
    attributes: {
        initialScale: {
            type: 'number',
            default: 0.8,
        },
        finalScale: {
            type: 'number',
            default: 1,
        },
        zIndex: {
            type: 'number',
            default: 10,
        },

        startX: {
            type: 'number',
            default: 0,
        },
        startY: {
            type: 'number',
            default: 0,
        },
        endX: {
            type: 'number',
            default: 0,
        },
        endY: {
            type: 'number',
            default: 0,
        },
        startRotate: {
            type: 'number',
            default: 0,
        },
        endRotate: {
            type: 'number',
            default: 0,
        },
        startOpacity: {
            type: 'number',
            default: 1,
        },
        endOpacity: {
            type: 'number',
            default: 1,
        },
        scrollEnterElement: {
            type: 'string',
            default: 'bottom',
        },
        scrollEnterViewport: {
            type: 'string',
            default: 'top',
        },
        scrollLeaveElement: {
            type: 'string',
            default: 'center',
        },
        scrollLeaveViewport: {
            type: 'string',
            default: 'center',
        },
        debug: {
            type: 'boolean',
            default: false,
        },
        previewState: {
            type: 'string',
            default: 'start', // 'none', 'start', 'end'
        },
    },
    edit: (props) => {
        const blockProps = useBlockProps();
        const root = useRef(null);

        return (
            <>
                <AnimateOnScrollControls {...props} />
                <AnimateOnScrollPreview {...props} blockProps={blockProps} root={root} />
            </>
        );
    },
    save: ({ attributes }) => {
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
        } = attributes;

        return (
            <div
                className="animate-on-scroll"
                data-initial-scale={initialScale}
                data-final-scale={finalScale}
                data-z-index={zIndex}
                data-start-x={startX}
                data-start-y={startY}
                data-end-x={endX}
                data-end-y={endY}
                data-start-rotate={startRotate}
                data-end-rotate={endRotate}
                data-start-opacity={startOpacity}
                data-end-opacity={endOpacity}
                data-scroll-enter-element={scrollEnterElement}
                data-scroll-enter-viewport={scrollEnterViewport}
                data-scroll-leave-element={scrollLeaveElement}
                data-scroll-leave-viewport={scrollLeaveViewport}
                data-debug={debug ? 'true' : 'false'}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});

import './frontend.js';
