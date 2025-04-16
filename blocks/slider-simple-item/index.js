// new FSE wp-blocks

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

registerBlockType("bergall/slider-simple-item", {
    title: "Slider simple item",
    category: "bergall",
    icon: "image",
    description: "Un item de slide",
    supports: {
        align: true,
        spacing: {
            padding: true,
            margin: true
        },
        color: {
            text: true,
            background: true,
            gradients: true,
            link: true
        }
    },
    edit() {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}  className="swiper-slide"  style={{ outline: "1px dotted grey" }}>
                    <InnerBlocks />
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps} className="swiper-slide">
                    <InnerBlocks.Content />
            </div>
        );
    },
});
