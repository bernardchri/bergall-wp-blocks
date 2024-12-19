<?php

/**
 * Plugin Name:       Bergall – Blocks
 * Description:       Blocks étendus pour thèmes FSE
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bergall-wp-blocks
 */


/**
 * Exit if accessed directly.
 */
if (!defined('ABSPATH')) {
    exit;
}


define( 'BERGALL_WP_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'BERGALL_WP_BLCOKS_URL', plugin_dir_url( __FILE__ ) );


require_once ( BERGALL_WP_BLOCKS_PATH . "/inc/acf-general-options.php");
require_once ( BERGALL_WP_BLOCKS_PATH . "/inc/acf-blocks-gutemberg.php");







// function b_wp_blocks()
// {
// 	register_block_type(BERGALL_BLOCKS_DIR_PATH . '/blocks/slider');
// 	register_block_type(BERGALL_BLOCKS_DIR_PATH . '/blocks/theheader');

// }

// add_action('acf/init', 'b_wp_blocks');






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
