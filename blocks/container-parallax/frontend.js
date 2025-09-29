import { onScroll, animate } from 'animejs';
import metadata from './block.json';

document.addEventListener("DOMContentLoaded", function () {

    const parallaxContainers = document.querySelectorAll(".parallax-container");
    if (parallaxContainers.length === 0) return;

    parallaxContainers.forEach(container => {
        const speed = (container.getAttribute("data-speed") || metadata.attributes.speed.default) * 10;
        const depth = container.getAttribute("data-depth") || metadata.attributes.depth.default;
        const content = container.querySelector(".parallax-content");
        if (!content) return;
        
        container.style.zIndex = depth;
        
        animate(content, {
            translateY: [speed, -speed],
            autoplay: onScroll({
                axis: 'y',
                sync: true,
                debug: false,
                onUpdate: (value) => {
                    // Optionnel : progression du scroll
                    // console.log(value);
                }
            })
        });
    });
});