import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { duration, stagger, delay, animationType, debug } = attributes;

  const blockProps = useBlockProps.save({
    className: 'animated-text'
  });

  return (
    <div {...blockProps} data-duration={duration}
      data-stagger={stagger}
      data-delay={delay}
      data-animation-type={animationType}
      data-debug={debug}>

      <InnerBlocks.Content />
    </div>
  );
}