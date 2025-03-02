import gsap from 'gsap';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

document.addEventListener('DOMContentLoaded', function () {
    // Définir l'opacité à 0 pour tous les éléments avec la classe 'animated-paragraph'

    if(document.querySelector('.animated-paragraph')){
        gsap.set('.animated-paragraph', { opacity: 0 });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const paragraph = entry.target;
                    const animationType = paragraph.getAttribute('data-animation-type') || 'lines';
                    const splitResult = Splitting({ target: paragraph, by: animationType });
                    // Récupérer les attributs de données
                    const duration = parseFloat(paragraph.getAttribute('data-duration')) || 0.300;
                    const stagger = parseFloat(paragraph.getAttribute('data-stagger')) || 0.08;
                    const delay = parseFloat(paragraph.getAttribute('data-delay')) || 0.500;
                    gsap.to('.animated-paragraph', { opacity: 1, duration: 1, delay: 0 });

                    // Animation par ligne, mot ou caractère avec GSAP
                    splitResult[0][animationType].forEach((element, index) => {
                        gsap.from(element, { opacity: 0, y: 20, duration: duration, delay: delay + index * stagger, ease: "back" });
                    });

                    observer.unobserve(paragraph);
                }
            });
        });

        document.querySelectorAll('.animated-paragraph').forEach((paragraph) => {
            observer.observe(paragraph);
        });
    }

}, { passive: true });