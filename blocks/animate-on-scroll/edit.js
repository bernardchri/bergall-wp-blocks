import { useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { AnimateOnScrollControls } from './AnimateOnScrollControls';
import { AnimateOnScrollPreview } from './AnimateOnScrollPreview';

export default function Edit(props) {
  const blockProps = useBlockProps({
    className: 'animate-on-scroll animate-on-scroll-editor',
  });
  const root = useRef(null);

  return (
    <div {...blockProps} >
      <AnimateOnScrollControls {...props} />
      <AnimateOnScrollPreview {...props} blockProps={blockProps} root={root} />
    </div>
  );
}