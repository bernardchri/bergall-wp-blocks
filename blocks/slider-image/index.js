// blocks FSE
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaPlaceholder, useBlockProps } from '@wordpress/block-editor';
import Swiper from "swiper";
import { PanelBody } from '@wordpress/components';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { SliderNavigation } from '../../src/components/navigation-swiper';
import "./style.css";
import { useEffect } from '@wordpress/element';


const sliderImage = () => {
    const sliders = document.querySelectorAll('.bb-slider-image');
    sliders.forEach((slider) => {
        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            effect: "fade",
            autoHeight: true,
            modules: [Navigation, Pagination, EffectFade],
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: slider.querySelector('.swiper-pagination')
            },
            navigation: {
                nextEl: slider.querySelector('.button-next'),
                prevEl: slider.querySelector('.button-prev'),
            },

        });
    });
}

registerBlockType("anima/slider-image", {
    title: "Slider images",
    category: "anima",
    icon: "images-alt",
    description: "Carroussel Un slider d'images simple avec navigation et pagination.",
    supports: {
        align: true,
        spacing: {
            margin: true
        },
    },
    attributes:
    {
        "slides": {
            "type": "array",
            "default": []
        }
    },
    edit({ attributes, setAttributes }) {

        const { slides } = attributes;
        const blockProps = useBlockProps();

        const onSelectImages = (images) => {
            const updatedSlides = images.map((image) => ({
                id: image.id,
                url: image.url,
                alt: image.alt,
            }));
            setAttributes({ slides: updatedSlides });
        };


        useEffect(() => {
            sliderImage();
        }
            , [slides]);

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du slider">
                        <MediaPlaceholder
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            multiple
                            gallery
                            labels={{ title: 'Ajouter des images', instructions: 'Sélectionnez ou téléversez des images pour le slider.' }}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className='bb-slider-image'>
                    {slides.length > 0 ? (
                        <div className='swiper-wrapper'>
                            {slides.map((slide) => (
                                <div key={slide.id} className='swiper-slide'>
                                    <img src={slide.url} alt={slide.alt} />
                                </div>
                            ))}

                        </div>
                    ) : (
                        <p>Aucune image sélectionnée.</p>
                    )}
                    <SliderNavigation />
                </div>
            </div>
        );
    },
    save({ attributes }) {
        const { slides } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                {slides.length > 0 ? (
                    <div className='bb-slider-image'>
                        <div className='swiper-wrapper'>
                            {slides.map((slide) => (
                                <div className='swiper-slide' key={slide.id}>
                                    <img src={slide.url} alt={slide.alt} />
                                </div>
                            ))}
                        </div>
                        <SliderNavigation />
                    </div>
                ) : (
                    <p>Aucune image sélectionnée.</p>
                )}
            </div>
        );
    }
});


document.addEventListener("DOMContentLoaded", function () {
    sliderImage();
}
);
//
