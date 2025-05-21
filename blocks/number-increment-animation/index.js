/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, SelectControl } from '@wordpress/components';
import "./style.css"
/**
 * Register the block
 */
registerBlockType('animablocks/number-increment-animation', {
    title: 'Number Increment Animation',
    icon: 'chart-line',
    category: 'anima',
    "apiVersion": 2,
    "$schema": "https://schemas.wp.org/trunk/block.json",
    supports: {
        color: {
            gradients: true,
            text: true,
        },
        spacing: {
            padding: true,
            margin: true,
        },
        typography: {
            fontSize: true,
            lineHeight:true,
        },
    },
    attributes: {
        startChar: { type: 'string', default: '' },
        endChar: { type: 'string', default: '' },
        startNumber: { type: 'number', default: 0 },
        endNumber: { type: 'number', default: 100 },
        delay: { type: 'number', default: 0 },
        increment: { type: 'number', default: 1 },
        speed: { type: 'number', default: 2 },
        locale: { type: 'string', default: 'en-US' },
       
    },
    edit({ attributes, setAttributes }) {
        const { startChar, endChar, startNumber, endNumber, delay, increment, speed, locale } = attributes;
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Animation Settings">
                        <TextControl
                            label="Start Character"
                            value={startChar}
                            onChange={(val) => setAttributes({ startChar: val })}
                        />
                        <TextControl
                            label="End Character"
                            value={endChar}
                            onChange={(val) => setAttributes({ endChar: val })}
                        />
                        <TextControl
                            label="Start Number"
                            value={startNumber}
                            onChange={(val) => setAttributes({ startNumber: parseFloat(val) })}
                        />
                        <TextControl
                            label="End Number"
                            value={endNumber}
                            onChange={(val) => setAttributes({ endNumber: parseFloat(val) })}
                        />
                        <RangeControl
                            label="Delay (ms)"
                            value={delay}
                            onChange={(val) => setAttributes({ delay: val })}
                            min={0}
                                step={125}
                            max={5000}
                        />
                        <RangeControl
                            label="Increment"
                            value={increment}
                            onChange={(val) => setAttributes({ increment: val })}
                            min={1}
                            max={1000}
                            step={1}
                        />
                        <RangeControl
                            label="Speed (ms)"
                            value={speed}
                            onChange={(val) => setAttributes({ speed: val })}
                            step={0.150}
                            min={0.150}
                            max={10}
                        />
                        <SelectControl
                            label="Locale"
                            value={locale}
                            options={[
                                { label: 'English (US)', value: 'en-US' },
                                { label: 'French (FR)', value: 'fr-FR' },
                            ]}
                            onChange={(val) => setAttributes({ locale: val })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="number-animation-block">
                    {startChar}{endNumber.toLocaleString(locale)}{endChar}
                </div>
            </div>
        );
    },
    save({ attributes }) {
        const { startChar, endChar, startNumber, endNumber, delay, increment, speed, locale } = attributes;
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
            <div
                className="number-animation-block"
                data-start-char={startChar}
                data-end-char={endChar}
                data-start-number={startNumber}
                data-end-number={endNumber}
                data-delay={delay}
                data-increment={increment}
                data-speed={speed}
                data-locale={locale}
            >
                {startChar}{startNumber.toLocaleString(locale)}{endChar}
            </div>
            </div>
        );
    }
});

/**
 * Frontend script for the number animation
 */
document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelectorAll('.wp-block-animablocks-number-increment-animation > .number-animation-block');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const block = entry.target;
                const startChar = block.getAttribute('data-start-char') || '';
                const endChar = block.getAttribute('data-end-char') || '';
                const startNumber = parseFloat(block.getAttribute('data-start-number')) || 0;
                const endNumber = parseFloat(block.getAttribute('data-end-number')) || 100;
                const delay = parseInt(block.getAttribute('data-delay'), 10) || 0;
                const speed = parseFloat(block.getAttribute('data-speed')) || 1; // Total duration in seconds
                const locale = block.getAttribute('data-locale') || 'en-US';

                let currentNumber = startNumber;
                const totalSteps = Math.ceil((endNumber - startNumber));
                let currentStep = 0;

                const easeOutQuad = (t) => t * (2 - t);

                const animateNumber = () => {
                    currentStep++;
                    const easedStep = easeOutQuad(currentStep / totalSteps);
                    currentNumber = startNumber + (endNumber - startNumber) * easedStep;

                    if (currentStep <= totalSteps) {
                        // Round the number to the nearest integer
                        const roundedNumber = Math.round(currentNumber);
                        block.textContent = `${startChar}${roundedNumber.toLocaleString(locale)}${endChar}`;
                        requestAnimationFrame(animateNumber);
                    }
                };

                // Calculate the frame duration based on the total animation duration
                const frameDuration = (speed * 1000) / totalSteps;

                // Start the animation after the specified delay
                setTimeout(() => {
                    const frame = () => {
                        const now = performance.now();
                        const elapsed = now - startTime;

                        if (elapsed < speed * 1000) {
                            const progress = elapsed / (speed * 1000);
                            currentNumber = startNumber + (endNumber - startNumber) * easeOutQuad(progress);
                            const roundedNumber = Math.round(currentNumber);
                            block.textContent = `${startChar}${roundedNumber.toLocaleString(locale)}${endChar}`;
                            requestAnimationFrame(frame);
                        }
                    };

                    const startTime = performance.now();
                    requestAnimationFrame(frame);
                }, delay);

                // Stop observing the block once the animation starts
                observer.unobserve(block);
            }
        });
    });

    blocks.forEach(block => {
        observer.observe(block);
    });
});
