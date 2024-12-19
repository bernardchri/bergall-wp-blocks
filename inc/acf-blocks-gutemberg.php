<?php



// BLOCKS ACF
function b_wp_blocks()
{
	register_block_type(BERGALL_WP_BLCOKS_PATH . '/src/slider');
	// register_block_type(BERGALL_WP_BLCOKS_PATH . '/src/theheader');

}

add_action('acf/init', 'b_wp_blocks');

