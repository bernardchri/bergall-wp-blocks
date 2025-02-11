<?php



// BLOCKS ACF
function b_wp_blocks()
{
	register_block_type(BERGALL_WP_BLOCKS_PATH . '/blocks/slider');
	// register_block_type(BERGALL_BLOCKS_DIR_PATH . '/blocks/theheader');

}

add_action('acf/init', 'b_wp_blocks');


