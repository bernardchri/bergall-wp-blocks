import gsap from 'gsap';
import SplitText from '../gsap/minified/utils/SplitText.min.js';

gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', function () {
   // Définir l'opacité à 0 pour tous les éléments avec la classe 'animated-paragraph'
   gsap.set('.animated-paragraph', { opacity: 0 });


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const paragraph = entry.target;
                const splitText = new SplitText(paragraph, { type: 'words' });
              

                // Récupérer les attributs de données
                const duration = parseFloat(paragraph.getAttribute('data-duration')) || 0.300;
                const stagger = parseFloat(paragraph.getAttribute('data-stagger')) || 0.08;
                const delay = parseFloat(paragraph.getAttribute('data-delay')) || 0.500;
                gsap.to('.animated-paragraph', { opacity: 1, duration: 1, delay: 0 });
                gsap.fromTo(splitText.words, 
                    { opacity: 0, y: 20 }, 
                    { duration: duration, opacity: 1, y: 0, ease: "back", stagger: stagger, delay: delay }
                );

                observer.unobserve(paragraph);
            }
        });
    });

    document.querySelectorAll('.animated-paragraph').forEach((paragraph) => {
        observer.observe(paragraph);
    });
}, { passive: true });