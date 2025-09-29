import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    return (
        <div
            {...useBlockProps.save({ className: 'anima-lottie-player' })}
            data-src={attributes.src}
            data-autoplay={attributes.autoplay}
            data-loop={attributes.loop}
            data-speed={attributes.speed}
        ></div>
    );
}