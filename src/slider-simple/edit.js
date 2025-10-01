import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import NavigationSwiper from '../slider-navigation/navigationSwiper';

import './editor.scss';


const SLIDER_TEMPLATE = [
	[
		'animablocks/slider-simple-item',
		{},
		[
			[
				'core/group',
				{ layout: { type: 'constrained' } },
				[
					['core/paragraph', {}, ['Slide 1']],
					[
						'core/paragraph',
						{},
						[
							'Culpa tempor adipisicing consequat incididunt minim. Consectetur reprehenderit velit pariatur nulla laboris officia sint voluptate eu labore pariatur Lorem voluptate non. Aute est voluptate adipisicing sunt elit adipisicing occaecat reprehenderit enim ad velit esse. Mollit culpa reprehenderit ipsum minim sit officia eiusmod in ullamco voluptate ut incididunt. Minim laborum elit quis voluptate. Qui aliquip reprehenderit veniam dolor sunt non est elit irure est officia.'
						]
					]
				]
			]
		]
	],
	[
		'animablocks/slider-simple-item',
		{},
		[
			[
				'core/group',
				{ layout: { type: 'constrained' } },
				[
					['core/paragraph', {}, ['Slide 2']],
					[
						'core/paragraph',
						{},
						[
							'Culpa tempor adipisicing consequat incididunt minim. Consectetur reprehenderit velit pariatur nulla laboris officia sint voluptate eu labore pariatur Lorem voluptate non. Aute est voluptate adipisicing sunt elit adipisicing occaecat reprehenderit enim ad velit esse. Mollit culpa reprehenderit ipsum minim sit officia eiusmod in ullamco voluptate ut incididunt. Minim laborum elit quis voluptate. Qui aliquip reprehenderit veniam dolor sunt non est elit irure est officia.'
						]
					]
				]
			]
		]
	]
];



export default function Edit({ attributes, setAttributes }) {
	// ref vers le container DOM du slider
	const sliderContainerRef = useRef(null);
	const { numberofslides, numberofslidesMobile } = attributes;



	return (
		<div {...useBlockProps({ className: '--editor' })}>
			<InspectorControls>
				<PanelBody title="Paramètres du slider">
					<RangeControl
						label="Nombre de slides visibles"
						value={numberofslides}
						onChange={(value) =>
							setAttributes({ numberofslides: value })
						}
						min={1}
						max={10}
						step={0.25}
					/>
					<RangeControl
						label="Nombre de slides visibles sur mobile"
						value={numberofslidesMobile}
						onChange={(value) =>
							setAttributes({ numberofslidesMobile: value })
						}
						min={1}
						max={5}
						step={0.25}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="swiper-container" ref={sliderContainerRef}>
				<div className="swiper-wrapper">
					<InnerBlocks
						allowedBlocks={['animablocks/slider-simple-item']}
						template={SLIDER_TEMPLATE}
					/>
				</div>
				<NavigationSwiper
					navigationDisplay={true}
					paginationDisplay={true}
				/>
			</div>
		</div>
	);
}
