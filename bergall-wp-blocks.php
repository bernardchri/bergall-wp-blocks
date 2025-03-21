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


define('BERGALL_WP_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('BERGALL_WP_BLCOKS_URL', plugin_dir_url(__FILE__));


// require_once ( BERGALL_WP_BLOCKS_PATH . "/inc/acf-general-options.php");
// require_once ( BERGALL_WP_BLOCKS_PATH . "/inc/acf-blocks-gutemberg.php");



function bergall_wp_blocks_register_scripts()
{
    wp_enqueue_script(
        'my-custom-blocks-js',
        plugins_url('/build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    wp_enqueue_style(
        'my-custom-blocks-index-css',
        plugins_url('/build/index.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    wp_enqueue_style(
        'my-custom-blocks-css',
        plugins_url('/build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );
}
add_action('enqueue_block_editor_assets', 'bergall_wp_blocks_register_scripts');
add_action('enqueue_block_assets', 'bergall_wp_blocks_register_scripts');




// AJOUT D'UNE CATEGORIE DE BLOCS

function bergall_new_category_blocks( $cats ) {

	// create a new array element with anything as its index
	$new = array(
		'literallyanything' => array(
			'slug'  => 'bergall',
			'title' => 'Blocks by Bergall'
		)
	);
	// just decide here at what position your custom category should appear
	$position = 2; // 2 – After Text and Media, so technically it is a 3rd position
	$cats = array_slice( $cats, 0, $position, true ) + $new + array_slice( $cats, $position, null, true );
	// reset array indexes
	$cats = array_values( $cats );
	return $cats;

}
add_filter( 'block_categories_all', 'bergall_new_category_blocks' );


// ENREGISTREMENT DES BLOCS
function bergallblocks_register_custom_blocks() {
    // composants animations
    register_block_type(__DIR__ . '/blocks/animated-text');
    register_block_type(__DIR__ . '/blocks/image-video-hover');
    register_block_type(__DIR__ . '/blocks/slider-image');
    register_block_type(__DIR__ . '/blocks/marquee');
    register_block_type(__DIR__ . '/blocks/number-increment-animation');
    register_block_type(__DIR__ . '/blocks/change-color-on-scroll');
    
    // groups étendus
    register_block_type(__DIR__ . '/blocks/container-parallax');
    register_block_type(__DIR__ . '/blocks/group-extended');
    register_block_type(__DIR__ . '/blocks/scale-on-scroll');

    // TODO en cours
    // register_block_type(__DIR__ . '/blocks/hero-3D-object');
    // register_block_type(__DIR__ . '/blocks/button-block');
    // register_block_type(__DIR__ . '/blocks/spans');

    
}
add_action('init', 'bergallblocks_register_custom_blocks');




/********************************/
// Save and load plugin specific ACF field groups via the /acf-json folder.
/********************************/

// // Save
// function bergall_wp_blocks_update_field_group($group)
// {
//     // list of field groups that should be saved to my-plugin/acf-json

//     // ICI : ajouter les noms des champs dans du dossier acf-json
//     $groups = array('group_6671a2757c269');

//     if (in_array($group['key'], $groups)) {
//         add_filter('acf/settings/save_json', function () {
//             return dirname(__FILE__) . '/acf-json';
//         });
//     }
// }
// add_action('acf/update_field_group', 'bergall_wp_blocks_update_field_group', 1, 1);

// // Load - includes the /acf-json folder in this plugin to the places to look for ACF Local JSON files
// add_filter('acf/settings/load_json', function ($paths) {
//     $paths[] = dirname(__FILE__) . '/acf-json';
//     return $paths;
// });





// Ajout d'une rubrique de composants
function bergall_wp_blocks_register_blocks_collections() {
    wp_enqueue_script(
        'bergall-wp-blocks-categories',
        plugins_url('src/utils/blocks-collection.js', __FILE__),
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(plugin_dir_path(__FILE__) . 'src/utils/blocks-collection.js')
    );
}
add_action('enqueue_block_editor_assets', 'bergall_wp_blocks_register_blocks_collections');

