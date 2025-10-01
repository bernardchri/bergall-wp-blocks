<?php
// This file is generated. Do not modify it manually.
return array(
	'animate-on-scroll' => array(
		'apiVersion' => 3,
		'name' => 'animablocks/animate-on-scroll',
		'title' => 'Animation au scroll',
		'description' => 'Composant qui crée une animation d’effet d’agrandissement au scroll dans la page',
		'icon' => 'editor-expand',
		'category' => 'anima',
		'supports' => array(
			'html' => false,
			'align' => true,
			'alignWide' => true
		),
		'attributes' => array(
			'initialScale' => array(
				'type' => 'number',
				'default' => 0.8
			),
			'finalScale' => array(
				'type' => 'number',
				'default' => 1
			),
			'zIndex' => array(
				'type' => 'number',
				'default' => 10
			),
			'startX' => array(
				'type' => 'number',
				'default' => 0
			),
			'startY' => array(
				'type' => 'number',
				'default' => 0
			),
			'endX' => array(
				'type' => 'number',
				'default' => 0
			),
			'endY' => array(
				'type' => 'number',
				'default' => 0
			),
			'startRotate' => array(
				'type' => 'number',
				'default' => 0
			),
			'endRotate' => array(
				'type' => 'number',
				'default' => 0
			),
			'startOpacity' => array(
				'type' => 'number',
				'default' => 1
			),
			'endOpacity' => array(
				'type' => 'number',
				'default' => 1
			),
			'scrollEnterElement' => array(
				'type' => 'string',
				'default' => 'bottom'
			),
			'scrollEnterViewport' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'scrollLeaveElement' => array(
				'type' => 'string',
				'default' => 'center-=20%'
			),
			'scrollLeaveViewport' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'debug' => array(
				'type' => 'boolean',
				'default' => false
			),
			'previewState' => array(
				'type' => 'string',
				'default' => 'start'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'animated-text' => array(
		'apiVersion' => 2,
		'name' => 'animablocks/animated-text',
		'title' => 'Texte animé',
		'category' => 'anima',
		'description' => 'Effets d\'entrée dynamiques pour vos titres et paragraphes.',
		'icon' => 'editor-textcolor',
		'attributes' => array(
			'duration' => array(
				'type' => 'number',
				'default' => 0.3
			),
			'stagger' => array(
				'type' => 'number',
				'default' => 0.08
			),
			'delay' => array(
				'type' => 'number',
				'default' => 0.3
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'lines'
			),
			'debug' => array(
				'type' => 'boolean',
				'default' => false
			),
			'startTranslateY' => array(
				'type' => 'number',
				'default' => 30
			),
			'startOpacity' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'html' => false
		),
		'example' => array(
			'attributes' => array(
				'duration' => 1,
				'stagger' => 0.1,
				'delay' => 0.1,
				'animationType' => 'chars'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Ceci est un aperçu du texte animé.'
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'carrousel-text' => array(
		'apiVersion' => 2,
		'name' => 'anima/carrousel-texte',
		'icon' => 'slides',
		'category' => 'anima',
		'description' => 'Un bloc avec animation de texte façon carroussel',
		'keywords' => array(
			'bloc',
			'personnalisé',
			'addon'
		),
		'version' => '1.0.0',
		'textdomain' => 'anima',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'container-parallax' => array(
		'apiVersion' => 2,
		'name' => 'animablocks/container-parallax',
		'title' => 'Parallax Container',
		'icon' => 'images-alt2',
		'category' => 'anima',
		'description' => 'Groupe avec effet parallax - idéal pour apporter de l’énergie à vos pages. Ajouter des blocs à l’intérieur.',
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => array(
				'wide',
				'full'
			),
			'customClassName' => true,
			'className' => true
		),
		'attributes' => array(
			'speed' => array(
				'type' => 'number',
				'default' => 50,
				'minimum' => -500,
				'maximum' => 500
			),
			'depth' => array(
				'type' => 'number',
				'default' => 0
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'none'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'group-extended' => array(
		'apiVersion' => 2,
		'name' => 'animablocks/group-extended',
		'title' => 'Group Etendus',
		'category' => 'anima',
		'icon' => 'admin-links',
		'description' => 'Groupe avec des options supplémentaires',
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'border' => array(
				'radius' => true,
				'color' => true,
				'style' => true,
				'width' => true
			)
		),
		'attributes' => array(
			'href' => array(
				'type' => 'string',
				'default' => ''
			),
			'newTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'animation' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'positionAbsolute' => array(
				'type' => 'boolean',
				'default' => false
			),
			'zIndex' => array(
				'type' => 'number',
				'default' => 0
			),
			'top' => array(
				'type' => 'string',
				'default' => ''
			),
			'left' => array(
				'type' => 'string',
				'default' => ''
			),
			'right' => array(
				'type' => 'string',
				'default' => ''
			),
			'bottom' => array(
				'type' => 'string',
				'default' => ''
			),
			'height' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => ''
			),
			'overflow' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'example' => array(
			'attributes' => array(
				'href' => 'https://example.com',
				'newTab' => true,
				'animation' => 'fadeInUp'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Ceci est un aperçu du bloc Group Extended.'
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'header-minimalist' => array(
		'apiVersion' => 3,
		'name' => 'animablocks/header-minimalist',
		'title' => 'Header minimaliste',
		'description' => 'Un header minimaliste pour portfolio avec logo et menus hiérarchisés',
		'version' => '0.2.0',
		'category' => 'anima',
		'icon' => 'menu',
		'keywords' => array(
			'header',
			'navigation',
			'menu',
			'burger'
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			)
		),
		'attributes' => array(
			'fixed' => array(
				'type' => 'boolean',
				'default' => true
			),
			'menus' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'menuPrimaire' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuSecondaire' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuTertiaire' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuPrimaireHtml' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuSecondaireHtml' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuTertiaireHtml' => array(
				'type' => 'string',
				'default' => ''
			),
			'logo' => array(
				'type' => 'object',
				'default' => array(
					'url' => '',
					'alt' => '',
					'height' => '',
					'width' => ''
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'marquee' => array(
		'apiVersion' => 2,
		'name' => 'animablocks/marquee',
		'title' => 'Bandeau défilant',
		'icon' => 'slides',
		'category' => 'anima',
		'description' => 'Un bloc de texte défilant avec options de vitesse, direction, rotation et dégradé.',
		'supports' => array(
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'lineHeight' => true
			)
		),
		'attributes' => array(
			'speed' => array(
				'type' => 'number',
				'default' => 10
			),
			'link' => array(
				'type' => 'string',
				'default' => ''
			),
			'direction' => array(
				'type' => 'boolean',
				'default' => false
			),
			'gradianttransition' => array(
				'type' => 'boolean',
				'default' => false
			),
			'rotation' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'example' => array(
			'attributes' => array(
				'speed' => 10,
				'link' => '',
				'direction' => 'left'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'hello'
					)
				),
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'dolly'
					)
				),
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'world'
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'number-increment-animation' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/number-increment-animation',
		'description' => 'animation d\'un texte à l\'arrivée dans la vue ',
		'title' => 'Animation d\'un nombre',
		'category' => 'anima',
		'icon' => 'chart-line',
		'supports' => array(
			'color' => array(
				'gradients' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			)
		),
		'attributes' => array(
			'startChar' => array(
				'type' => 'string',
				'default' => ''
			),
			'endChar' => array(
				'type' => 'string',
				'default' => ''
			),
			'startNumber' => array(
				'type' => 'number',
				'default' => 0
			),
			'endNumber' => array(
				'type' => 'number',
				'default' => 100
			),
			'delay' => array(
				'type' => 'number',
				'default' => 0
			),
			'increment' => array(
				'type' => 'number',
				'default' => 1
			),
			'speed' => array(
				'type' => 'number',
				'default' => 2
			),
			'locale' => array(
				'type' => 'string',
				'default' => 'en-US'
			)
		),
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'separator' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/separator',
		'title' => 'Anima Separator',
		'category' => 'anima',
		'icon' => 'minus',
		'description' => 'Bloc séparateur avec formes SVG personnalisables',
		'supports' => array(
			'alignWide' => true,
			'align' => array(
				'full',
				'center',
				'wide'
			),
			'html' => false,
			'color' => array(
				'text' => false,
				'background' => true
			)
		),
		'attributes' => array(
			'shape' => array(
				'type' => 'string',
				'default' => 'wave'
			),
			'shapeColor' => array(
				'type' => 'string',
				'default' => '#1248F4'
			),
			'flipX' => array(
				'type' => 'boolean',
				'default' => false
			),
			'flipY' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'slider-gallerie' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/slider-gallerie',
		'title' => 'Slider images simple fade',
		'keywords' => array(
			'gallerie',
			'slider',
			'images'
		),
		'category' => 'widgets',
		'icon' => 'images-alt',
		'description' => 'Carroussel d\'images avec navigation et pagination.',
		'supports' => array(
			'align' => true,
			'spacing' => array(
				'margin' => true
			)
		),
		'attributes' => array(
			'slides' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 1
			),
			'slidesPerViewMobile' => array(
				'type' => 'number',
				'default' => 1
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'slider-navigation' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/navigation-swiper',
		'title' => 'Navigation Swiper',
		'category' => 'anima',
		'icon' => 'controls-forward',
		'description' => 'Navigation (flèches + pagination) pour slider.',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'paginationDisplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'navigationDisplay' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js',
		'editorStyle' => 'file: ./index.css',
		'style' => 'file:./style-index.css'
	),
	'slider-simple' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/slider-simple',
		'title' => 'Slider simple',
		'category' => 'anima',
		'icon' => 'images-alt',
		'description' => 'Un slider simple avec navigation et pagination.',
		'supports' => array(
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			)
		),
		'attributes' => array(
			'slides' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'numberofslides' => array(
				'type' => 'number',
				'default' => 1
			),
			'numberofslidesMobile' => array(
				'type' => 'number',
				'default' => 1
			),
			'paginationDisplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'navigationDisplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'interval' => array(
				'type' => 'number',
				'default' => 5000
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file: ./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'slider-simple-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/slider-simple-item',
		'title' => 'Slider simple item',
		'category' => 'anima',
		'icon' => 'images-alt2',
		'description' => 'Un item de slide',
		'supports' => array(
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'test' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'animablocks/test',
		'version' => '0.1.0',
		'title' => 'Test',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'test',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
