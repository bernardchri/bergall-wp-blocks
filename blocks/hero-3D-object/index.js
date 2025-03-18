import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl } from '@wordpress/components';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect } from '@wordpress/element';

// Définir le chemin par défaut pour le fichier GLB
const defaultModelUrl = '/wp-content/plugins/bergall-wp-blocks/blocks/hero-3D-object/bague.glb';


const threeDisplay = () => {


    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    const modelUrl = container.getAttribute('data-model-url');
    if (!modelUrl) return;

    console.log("hello")
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    
    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    
    }
    animate()
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setSize(container.clientWidth, container.clientHeight);
    // container.appendChild(renderer.domElement);

    // const loader = new GLTFLoader();
    // loader.load(modelUrl, (gltf) => {
    //     scene.add(gltf.scene);
    // });
    // const light = new THREE.AmbientLight( 0x404040 ); // soft white light

    // scene.add( light )
    // camera.position.z = 5;

    // let mouseX = 0;
    // let mouseY = 0;

    // const handleMouseMove = (event) => {
    //     mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    // };

    // window.addEventListener('mousemove', handleMouseMove, false);

    // const animate = () => {
    //     requestAnimationFrame(animate);
    //     camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
    //     camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
    //     camera.lookAt(scene.position);
    //     renderer.render(scene, camera);
    // };
    function animate() {
        renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );
    // animate();


}



registerBlockType('bergallblocks/hero-3d', {
    title: 'Hero 3D',
    icon: 'universal-access-alt',
    category: 'bergall',
    attributes: {
        modelUrl: { type: 'string', default: defaultModelUrl },
        cameraSpeed: { type: 'number', default: 0.1 },
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();

        useEffect(() => {
            threeDisplay()


        }, [])

        const onSelectModel = (media) => {
            setAttributes({ modelUrl: media.url });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Model Settings">
                        <RangeControl
                            label="Camera Speed"
                            value={attributes.cameraSpeed}
                            onChange={(value) => setAttributes({ cameraSpeed: value })}
                            min={0.1}
                            max={2}
                            step={0.1}
                        />
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectModel}
                                type="model/gltf-binary"
                                value={attributes.modelUrl}
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary">
                                        {attributes.modelUrl ? 'Replace Model' : 'Upload Model'}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>
                <div id="three-canvas-container" style={{ width: '100%', height: '500px' }}></div>
            </div>
        );
    },
    save({ attributes }) {
        return <div id="three-canvas-container" data-model-url={attributes.modelUrl} style={{ width: '100%', height: '500px' }}></div>;
    },
});

// Three.js setup
document.addEventListener('DOMContentLoaded', () => {
    threeDisplay()
});
