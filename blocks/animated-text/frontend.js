import { animate, onScroll, utils } from 'animejs';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import metadata from './block.json';


document.addEventListener(
  'DOMContentLoaded',
  function () {
    if (utils.$('.animated-text')) {
      utils.$('.animated-text').forEach((paragraph) => {
        const animationType = paragraph.getAttribute('data-animation-type') || metadata.attributes.animationType.default;
        const splitResult = Splitting({ target: paragraph, by: animationType });
        const debug = (paragraph.getAttribute('data-debug') || metadata.attributes.debug.default) === 'true';
        const duration = parseFloat(paragraph.getAttribute('data-duration')) || metadata.attributes.duration.default;
        const stagger = parseFloat(paragraph.getAttribute('data-stagger')) || metadata.attributes.stagger.default;
        const delay = parseFloat(paragraph.getAttribute('data-delay')) || metadata.attributes.delay.default;

        splitResult[0][animationType].forEach((element, index) => {
          animate(element, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: duration * 1000,
            delay: delay * 1000 + stagger * 1000 * index,
            easing: 'easeOutBack',
            autoplay: onScroll({
              target: element,
              debug: debug,
              axis: 'y',
              enter: 'bottom 10%',
            }),
          });
        });
      });
    }
  },
  { passive: true }
);