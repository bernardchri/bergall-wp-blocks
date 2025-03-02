import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const { spans } = attributes;
    const [currentSpan, setCurrentSpan] = useState({ type: 'text', content: '' });

    const addSpan = () => {
        setAttributes({ spans: [...spans, currentSpan] });
        setCurrentSpan({ type: 'text', content: '' });
    };

    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Ajouter un Div', 'bergallblocks')}>
                    <select
                        value={currentSpan.type}
                        onChange={(e) => setCurrentSpan({ ...currentSpan, type: e.target.value })}
                    >
                        <option value="text">{__('Texte', 'bergallblocks')}</option>
                        <option value="image">{__('Image', 'bergallblocks')}</option>
                    </select>
                    {currentSpan.type === 'text' && (
                        <TextControl
                            value={currentSpan.content}
                            onChange={(content) => setCurrentSpan({ ...currentSpan, content })}
                            placeholder={__('Entrez du texte', 'bergallblocks')}
                        />
                    )}
                    {currentSpan.type === 'image' && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setCurrentSpan({ ...currentSpan, content: media.url })}
                                type="image"
                                value={currentSpan.content}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        {__('Sélectionner une image', 'bergallblocks')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                    <Button onClick={addSpan}>{__('Ajouter', 'bergallblocks')}</Button>
                </PanelBody>
            </InspectorControls>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {spans.map((span, index) => (
                    <span key={index} >
                        {span.type === 'text' ? span.content : <img src={span.content} alt="" style={{ maxWidth: '100%', height: 'auto' }} />}
                    </span>
                ))}
            </div>
        </div>
    );
}
