import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps({
        className: 'swiper-slide',
        style: { outline: '1px dotted grey' }
    });

    return (
        <div {...blockProps}>
            <InnerBlocks />
        </div>
    );
}