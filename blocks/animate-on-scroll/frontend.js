import { animate, onScroll } from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
        const initialScale = parseFloat(section.getAttribute('data-initial-scale')) || 0.8;
        const finalScale = parseFloat(section.getAttribute('data-final-scale')) || 1;
        const zIndex = parseInt(section.getAttribute('data-z-index'), 10) || 10;
        const startX = parseFloat(section.getAttribute('data-start-x')) || 0;
        const startY = parseFloat(section.getAttribute('data-start-y')) || 0;
        const endX = parseFloat(section.getAttribute('data-end-x')) || 0;
        const endY = parseFloat(section.getAttribute('data-end-y')) || 0;
        const startRotate = parseFloat(section.getAttribute('data-start-rotate')) || 0;
        const endRotate = parseFloat(section.getAttribute('data-end-rotate')) || 0;

        // Correction : startOpacity et endOpacity doivent être >= 0 et <= 1
        let startOpacity = section.getAttribute('data-start-opacity');
        let endOpacity = section.getAttribute('data-end-opacity');
        startOpacity = startOpacity !== null ? parseFloat(startOpacity) : 1;
        endOpacity = endOpacity !== null ? parseFloat(endOpacity) : 1;

        // Clamp les valeurs pour éviter NaN ou hors bornes
        startOpacity = isNaN(startOpacity) ? 1 : Math.max(0, Math.min(1, startOpacity));
        endOpacity = isNaN(endOpacity) ? 1 : Math.max(0, Math.min(1, endOpacity));

        // Récupérer les triggers personnalisés ou fallback sur les valeurs par défaut
        const scrollEnterElement = section.getAttribute('data-scroll-enter-element') || 'bottom';
        const scrollEnterViewport = section.getAttribute('data-scroll-enter-viewport') || 'top';
        const scrollLeaveElement = section.getAttribute('data-scroll-leave-element') || 'center';
        const scrollLeaveViewport = section.getAttribute('data-scroll-leave-viewport') || 'center';

        // Compose les valeurs pour anime.js v4 : "element viewport"
        const scrollEnter = `${scrollEnterElement} ${scrollEnterViewport}`;
        const scrollLeave = `${scrollLeaveElement} ${scrollLeaveViewport}`;

        const debug = section.getAttribute('data-debug') === 'true';

        const sections = Array.isArray(section) ? section : [section];
        sections.forEach(section => {
            if (!section) return;
            animate(section, {
                scale: [initialScale, finalScale],
                zIndex: zIndex,
                translateX: [startX, endX],
                translateY: [startY, endY],
                rotate: [startRotate, endRotate],
                opacity: [startOpacity, endOpacity],
                autoplay: onScroll({
                    target: section,
                    axis: 'y',
                    sync: true,
                    debug: debug,
                    enter: scrollEnter,
                    leave: scrollLeave
                }),
            });
        });



    });
});