import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import Swiper from 'swiper';
import { Navigation, Pagination } from "swiper/modules";
import { SliderNavigation } from '../../src/components/navigation-swiper';
import { useEffect, useRef } from '@wordpress/element';


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
        const refContainer = useRef(null);
        const { slides, numberofslides, numberofslidesMobile } = attributes;
        const blockProps = useBlockProps();

        useEffect(() => {
            sliderSimple(refContainer.current, { numberofslides, numberofslidesMobile });

        }, [slides, numberofslides, numberofslidesMobile]);

        return (
            <div {...blockProps} autoplay={attributes.autoplay} interval={attributes.interval} numberofslides={numberofslides} style={{ outline: "1px dotted grey", padding: "0.5rem" }} ref={refContainer}>
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
                    <div className="swiper-wrapper">
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


document.addEventListener('DOMContentLoaded', () => {

    const sliders = document.querySelectorAll('.wp-block-bergall-slider-simple');

    sliders.forEach((slider) => {
        sliderSimple(slider, {
            numberofslides: slider.dataset.numberofslides,
            numberofslidesMobile: slider.dataset.numberofslidesmobile
        });
    })
});



const sliderSimple = (sliders, attributes) => {

    // console.log('sliderSimple', sliders, attributes.numberofslides, attributes.numberofslidesMobile);
    // console.log(sliders.querySelector('.bergall-swiper-container'));


    const sliderswiper = new Swiper(sliders.querySelector('.bergall-swiper-container'), {
        slidesPerView: attributes.numberofslides,
        grabCursor: true,
        speed: 500,
        modules: [Navigation, Pagination],
        pagination: {
            el: sliders.querySelector('.swiper-pagination')
        },
        navigation: {
            nextEl: sliders.querySelector('.button-next'),
            prevEl: sliders.querySelector('.button-prev'),
        },
        breakpoints: {
            0: {
                slidesPerView: attributes.numberofslidesMobile,


            },
            768: {
                slidesPerView: attributes.numberofslides,
            },
        },
    });


}

