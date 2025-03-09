import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import Swiper from 'swiper';
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import metadata from './block.json';


registerBlockType(metadata.name, {
    ...metadata,
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();

        const addImagesToSlide = (images) => {
            const newSlides = images.map((image) => ({
                image: image.url,
                alt: image.alt,
            }));
            setAttributes({
                slides: [
                    ...attributes.slides,
                    ...newSlides,
                ],
            });
        };

        const removeImageFromSlide = (index) => {
            const newSlides = attributes.slides.filter((_, i) => i !== index);
            setAttributes({ slides: newSlides });
        };

        useEffect(() => {
            const sliderswiper = new Swiper('.swiper-container', {
                slidesPerView: attributes.numberofslides,
                loop: attributes.autoplay,
                modules: [Navigation, Pagination],
                autoplay: attributes.autoplay ? { delay: attributes.interval } : false,
                grabCursor: true,
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                },
            });
        }, [attributes.slides, attributes.numberofslides, attributes.autoplay, attributes.interval]);

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Paramètres du slider">
                        <RangeControl
                            label="Nombre de slides visibles"
                            value={attributes.numberofslides}
                            onChange={(value) => setAttributes({ numberofslides: value })}
                            min={1}
                            max={10}
                            step={0.25}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="bergall-swiper-container">
                    <div className="swiper-wrapper">
                        {attributes.slides.map((slide, index) => (
                            <div key={index} className="swiper-slide">
                                <img src={slide.image} alt={slide.alt} />
                                <Button
                                    onClick={() => removeImageFromSlide(index)}
                                    isDestructive
                                >
                                    Supprimer
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="navigation">
                        <div className="button-prev">←</div>
                        <div className="button-next">→</div>
                    </div>
                </div>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={addImagesToSlide}
                        type="image"
                        multiple
                        value={attributes.slides.map((slide) => slide.image)}
                        render={({ open }) => (
                            <Button onClick={open}>Ajouter des images</Button>
                        )}
                    />
                </MediaUploadCheck>
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps} data-numberofslides={attributes.numberofslides} data-autoplay={attributes.autoplay} data-interval={attributes.interval}>
                <div className="bergall-swiper-container">
                    <div className="swiper-wrapper">
                        {attributes.slides.map((slide, index) => (
                            <div key={index} className="swiper-slide">
                                <img src={slide.image} alt={slide.alt} />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="navigation">
                        <div className="button-prev">←</div>
                        <div className="button-next">→</div>
                    </div>
                </div>
            </div>
        );
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.wp-block-bergall-slider-image');

    sliders.forEach((slider) => {
        const numberofslides = slider.dataset.numberofslides;

        const sliderswiper = new Swiper(slider.querySelector('.bergall-swiper-container'), {
            slidesPerView: numberofslides,
            grabCursor: true,
            modules: [Navigation],
            navigation: {
                nextEl: slider.querySelector('.button-next'),
                prevEl: slider.querySelector('.button-prev'),
            },
        });

    });
});