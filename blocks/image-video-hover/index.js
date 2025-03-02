import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck , InspectorControls} from '@wordpress/block-editor';
import { ToggleControl, PanelBody, TextControl } from '@wordpress/components';
import './style.css';
import './editor.css';
import datablock from './block.json';

// import './render.js';

registerBlockType(datablock.name, {
    ...datablock,
    edit: ({ attributes, setAttributes }) => {
        const { imageUrl, videoUrl, autoPlayVideo } = attributes;

        const blockProps = useBlockProps();

        const onSelectImage = (media) => {
            setAttributes({ imageUrl: media.url });
        };

        const onSelectVideo = (media) => {
            setAttributes({ videoUrl: media.url });
        };

        return (
            <div {...blockProps}>
                <div
                    className="image-video-hover image-video-hover--editor"

                >
                    <img src={imageUrl} alt="Image" className="image-video-hover__image" />
                    <video className="image-video-hover__video" muted loop autoPlay controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <InspectorControls>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImage}
                        type="image"
                        value={imageUrl}
                        render={({ open }) => (
                            <button onClick={open}>Select Image</button>
                        )}
                    />
                     <TextControl
                        label="Image URL"
                        value={imageUrl}
                    />
                </MediaUploadCheck>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectVideo}
                        type="video"
                        value={videoUrl}
                        render={({ open }) => (
                            <button onClick={open}>Select Video</button>
                        )}
                    />
                      <TextControl
                        label="Video URL"
                        value={videoUrl}
                    />
                </MediaUploadCheck>
                  
                        
                    <PanelBody title="Video Settings">
                        <ToggleControl
                            label="Auto Play Video"
                            checked={autoPlayVideo}
                            onChange={(value) => setAttributes({ autoPlayVideo: value })}
                        />
                    </PanelBody>
                </InspectorControls>
               
            </div>
        );
    },
    save: ({ attributes }) => {
        const { imageUrl, videoUrl, autoPlayVideo } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div className="image-video-hover">
                    {videoUrl  && 
                        <video className={`image-video-hover__video ${autoPlayVideo && "is-visible"}`} muted loop autoPlay>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    <img src={imageUrl} alt="Image" className="image-video-hover__image" />
                </div>
            </div>
        );
    },
});

