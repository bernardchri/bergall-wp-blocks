<?php

/**
 * Plugin Name:       Bergall Wp Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bergall-wp-blocks
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_bergall_wp_blocks_block_init()
{

	$blocks = array(
		'first-block',
		'second-block'
	);

	foreach ($blocks as $block) {
		register_block_type(__DIR__ . "/build/{$block}");
	}

	add_action('admin_enqueue_scripts', 'demo_blocks_script');
	
}
add_action('init', 'create_block_bergall_wp_blocks_block_init');



function demo_blocks_script()
{
	$handle = 'create-block-first-block-editor-script';
	$data = array('hello');

	wp_localize_script($handle, 'demoBlocksData', $data);
}
