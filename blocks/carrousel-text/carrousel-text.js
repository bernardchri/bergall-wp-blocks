import { animate } from '@animavita/animate.js';

// Animation front
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.texte-carrousel').forEach(carrousel => {
        const wrapper = carrousel.querySelector('.texte-slide-wrapper');
        const slides = wrapper.querySelectorAll('.texte-slide');
        const duration = parseInt(carrousel.dataset.duration || 3000, 10);
        const slideCount = slides.length - 1; // last one is duplicate
        const slideHeight = slides[0].offsetHeight;
        let index = 0;

        if (slides.length > 1) {
            const firstSlideClone = slides[0].cloneNode(true);
            wrapper.appendChild(firstSlideClone);
        }

        // la hauteur de slide est égale à la hauteur du premier slide
        // Duplique le premier slide à la fin pour l'effet de boucle
        animate(wrapper, {
            height: `${slideHeight}px`,
            duration: 0 // Pas d'animation pour la hauteur initiale
        });


        if (!wrapper || slideCount < 1) return;

        setInterval(() => {
            index++;
            animate(wrapper, {
                translateY: -index * slideHeight,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    if (index === slideCount + 2) { // +2 because of the duplicate slide
                        animate(wrapper, {
                            translateY: 0,
                            duration: 0, // Pas d'animation pour le reset
                            easing: 'linear',
                            onComplete: () => {
                                index = -1; // Reset index
                            }
                        });

                    }

                }
            });
        }, duration);
    });
});