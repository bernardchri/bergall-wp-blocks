import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save() {
    const blockProps = useBlockProps.save({
        className: 'swiper-slide'
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}