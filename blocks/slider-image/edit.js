import { useBlockProps, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import NavigationSwiper from '../../src/components/navigation-swiper';

export default function Edit({ attributes, setAttributes }) {
  const { slides, slidesPerView, slidesPerViewMobile } = attributes;
  const blockProps = useBlockProps();

  const onSelectImages = (images) => {
    const updatedSlides = images.map(img => ({ id: img.id, url: img.url, alt: img.alt }));
    setAttributes({ slides: updatedSlides });
  };

  // ref vers le container DOM du slider
  const sliderContainerRef = useRef(null);
  // ref vers l’instance Swiper
  const swiperRef = useRef(null);

  useEffect(() => {
    if (slides.length > 0 && sliderContainerRef.current && !swiperRef.current) {
      swiperRef.current = new Swiper(sliderContainerRef.current, {
        modules: [Navigation, Pagination],
        simulateTouch: false,
        spaceBetween: 10,
        slidesPerView: 1,
        navigation: {
          nextEl: sliderContainerRef.current.querySelector('.button-next'),
          prevEl: sliderContainerRef.current.querySelector('.button-prev'),
        },
        pagination: {
          el: sliderContainerRef.current.querySelector('.pagination'),
          clickable: false,
        },
      });
    }
  }, [slides]);

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Paramètres du slider">
          <MediaPlaceholder
            onSelect={onSelectImages}
            allowedTypes={['image']}
            multiple
            gallery
            labels={{
              title: 'Ajouter des images',
              instructions: 'Sélectionnez ou téléversez des images pour le slider.'
            }}
          />
          <p>Slides par défaut : {slidesPerView}</p>
          <p>Slides mobile : {slidesPerViewMobile}</p>
        </PanelBody>
      </InspectorControls>

      <div className="anima-slider-image" ref={sliderContainerRef}>
        {slides.length > 0 ? (
          <>
            <div className="swiper-wrapper">
              {slides.map(slide => (
                <div key={slide.id} className="swiper-slide">
                  <img src={slide.url} alt={slide.alt} />
                </div>
              ))}
            </div>
            {/* Boutons pour tester la navigation dans l'éditeur */}
            <NavigationSwiper paginationDisplay={true} navigationDisplay={true} />
          </>
        ) : (
          <p>Aucune image sélectionnée.</p>
        )}
      </div>
    </div>
  );
}