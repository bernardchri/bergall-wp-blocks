<?php

/**
 * Plugin Name:       Bergall Wp Blocks
 * Description:       Blocks étendus pour thèmes FSE
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
	);

	foreach ($blocks as $block) {
		register_block_type(__DIR__ . "/build/{$block}");
	}

}
add_action('init', 'create_block_bergall_wp_blocks_block_init');




// BLOCKS ACF
function b_wp_blocks_MyACFProBlocks()
{
	$blocks = array(
		'slider'
	);

	foreach ($blocks as $block) {
		register_block_type(__DIR__ . "/src/{$block}");
	}

	// register_block_type(get_template_directory() . "/patterns/monNouveauBlock");
}

add_action('acf/init', 'b_wp_blocks_MyACFProBlocks');




/********************************/
// Save and load plugin specific ACF field groups via the /acf-json folder.
/********************************/

// Save
// function my_plugin_update_field_group($group)
// {
// 	// list of field groups that should be saved to my-plugin/acf-json

// 	// ICI : ajouter les noms des champs dans du dossier acf-json
// 	$groups = array('group_6671a2757c269');

// 	if (in_array($group['key'], $groups)) {
// 		add_filter('acf/settings/save_json', function () {
// 			return dirname(__FILE__) . '/acf-json';
// 		});
// 	}
// }
// add_action('acf/update_field_group', 'my_plugin_update_field_group', 1, 1);

// // Load - includes the /acf-json folder in this plugin to the places to look for ACF Local JSON files
// add_filter('acf/settings/load_json', function ($paths) {
// 	$paths[] = dirname(__FILE__) . '/acf-json';
// 	return $paths;
// });






// ENregistrement d'un pattern 
// register_block_pattern(
//     'wpdocs-my-plugin/bergall-my-awesome-pattern',
//     array(
//         'title'       => __( 'Two buttons', 'wpdocs-my-plugin' ),
//         'description' => _x( 'Two horizontal buttons, the left button is filled in, and the right button is outlined.', 'Block pattern description', 'wpdocs-my-plugin' ),
// 		'categories' => 'bergall',
//         'content'     => "<!-- wp:buttons {\"align\":\"center\"} -->\n<div class=\"wp-block-buttons aligncenter\"><!-- wp:button {\"backgroundColor\":\"very-dark-gray\",\"borderRadius\":0} -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link has-background has-very-dark-gray-background-color no-border-radius\">" . esc_html__( 'Button One', 'wpdocs-my-plugin' ) . "</a></div>\n<!-- /wp:button -->\n\n<!-- wp:button {\"textColor\":\"very-dark-gray\",\"borderRadius\":0,\"className\":\"is-style-outline\"} -->\n<div class=\"wp-block-button is-style-outline\"><a class=\"wp-block-button__link has-text-color has-very-dark-gray-color no-border-radius\">" . esc_html__( 'Button Two', 'wpdocs-my-plugin' ) . "</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons -->",
//     )
// );