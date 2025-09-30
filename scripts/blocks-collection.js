// Registering a block collection

wp.blocks.registerBlockVariation( 'core/group', {
	name: 'full-width-group',
	title: 'Full width group',
	attributes: {
		align: 'full',
	},
	isDefault: true,
} );

wp.blocks.registerBlockVariation( 'core/group', {
	name: 'newsletter',
	title: 'Newsletter',
	attributes: {
		templateLock: 'all',
		backgroundColor: 'tertiary',
		style: {
			spacing: {
				padding: 'var(--wp--preset--spacing--30)',
			},
		},
		borderRadius: '4px',
	},
	innerBlocks: [
		[ 'core/heading', { content: 'Subscribe to our Newsletter' } ],
		[
			'core/paragraph',
			{ content: 'Get a 10% discount on your first order.' },
		],
		[ 'core/button', { text: 'Subscribe' } ],
	],
} );
