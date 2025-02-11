import gsap from 'gsap';
import SplitText from '../gsap/minified/utils/SplitText.min.js';

gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const paragraph = entry.target;
                const splitText = new SplitText(paragraph, { type: 'words' });

                gsap.from(splitText.words, {
                    duration: 0.8,
                    opacity: 0,
                    y: 20,
                    rotationX: 0,
                    ease: "back",
                    stagger: 0.08
                });


                observer.unobserve(paragraph);
            }
        });
    });

    document.querySelectorAll('.animated-paragraph').forEach((paragraph) => {
        observer.observe(paragraph);
    });
}, { passive: true });