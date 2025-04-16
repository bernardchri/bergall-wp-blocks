import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useLayoutEffect } from '@wordpress/element';
import Swiper from 'swiper';
import { Navigation, Pagination } from "swiper/modules";
import "./style.css";
import "swiper/css";

registerBlockType("bergall/slider-simple", {
    title: "Slider simple",
    category: "bergall",
    icon: "images-alt",
    description: "Un slider simple avec navigation et pagination.",
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

    attributes:
    {
        "slides": {
            "type": "array",
            "default": []
        },
        "numberofslides": {
            "type": "number",
            "default": 1
        },
        "numberofslidesMobile": {
            "type": "number",
            "default": 1
        },
        "paginationDisplay": {
            "type": "boolean",
            "default": true
        },
        "navigationDisplay": {
            "type": "boolean",
            "default": true
        },
    },
    edit({ attributes, setAttributes }) {

        const { slides, numberofslides, numberofslidesMobile } = attributes;
        const blockProps = useBlockProps();

        return (
            <div {...blockProps} autoplay={attributes.autoplay} interval={attributes.interval} numberofslides={numberofslides} style={{ outline: "1px dotted grey", padding: "0.5rem" }}>
                <InspectorControls>
                    <PanelBody title="Paramètres du slider">
                        <RangeControl
                            label="Nombre de slides visibles"
                            value={numberofslides}
                            onChange={(value) => setAttributes({ numberofslides: value })}
                            min={1}
                            max={10}
                            step={0.25}
                        />
                        <RangeControl
                            label="Nombre de slides visibles sur mobile"
                            value={numberofslidesMobile}
                            onChange={(value) => setAttributes({ numberofslidesMobile: value })}
                            min={1}
                            max={5}
                            step={0.25}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="bergall-swiper-container" >
                    <div className="swiper-wrapper"  >
                        <InnerBlocks allowedBlocks={['bergall/slider-simple-item']} />
                    </div>
                    <SliderNavigation />
                </div>
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} data-numberofslides={attributes.numberofslides} data-numberofslidesMobile={attributes.numberofslidesMobile} data-autoplay={attributes.autoplay} data-interval={attributes.interval}>
                <div className="bergall-swiper-container">
                    <div className="swiper-wrapper" >
                        <InnerBlocks.Content />
                    </div>
                    <SliderNavigation />
                </div>
            </div>
        );
    },
});



function SliderNavigation(paginationDisplay, navigationDisplay) {
    return (
        // 
        <div className="swiper-bottom">
            {paginationDisplay && <div className="swiper-pagination"></div>}
            {navigationDisplay && <div className="navigation">
                <div className="button-prev">←</div>
                <div className="button-next">→</div>
            </div>}

        </div>
    );
}


document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.wp-block-bergall-slider-simple');
    sliders.forEach((slider) => {
        const numberofslides = slider.dataset.numberofslides;
        const numberofslidesMobile = slider.dataset.numberofslidesmobile;
        const sliderswiper = new Swiper(slider.querySelector('.bergall-swiper-container'), {
            slidesPerView: numberofslides,
            grabCursor: true,
            speed: 500,
            modules: [Navigation, Pagination],
            pagination: {
                el: slider.querySelector('.swiper-pagination')
            },
            navigation: {
                nextEl: slider.querySelector('.button-next'),
                prevEl: slider.querySelector('.button-prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: numberofslidesMobile,


                },
                768: {
                    slidesPerView: numberofslides,
                },
            },

        });

    });

});
