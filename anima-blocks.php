<?php

/**
 * Plugin Name:       Anima – Blocks
 * Description:       Blocks étendus pour thèmes FSE avec animations et effets.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       anima-wp-blocks
 */


/**
 * Exit if accessed directly.
 */
if (!defined('ABSPATH')) {
    exit;
}


define('anima_WP_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('anima_WP_BLCOKS_URL', plugin_dir_url(__FILE__));



/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function anima_test_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'anima_test_block_init' );



// AJOUT D'UNE CATEGORIE DE BLOCS
function anima_new_category_blocks($cats)
{

    // create a new array element with anything as its index
    $new = array(
        'literallyanything' => array(
            'slug'  => 'anima',
            'title' => 'Anima blocks'
        )
    );
    // just decide here at what position your custom category should appear
    $position = 2; // 2 – After Text and Media, so technically it is a 3rd position
    $cats = array_slice($cats, 0, $position, true) + $new + array_slice($cats, $position, null, true);
    // reset array indexes
    $cats = array_values($cats);
    return $cats;
}
add_filter('block_categories_all', 'anima_new_category_blocks');


// Enqueue Swiper CSS globally for all blocks + Pagination + Navigation
// function anima_blocks_enqueue_assets() {
//     wp_enqueue_style(
//         'swiper-global',
//         plugin_dir_url(__FILE__) . 'src/css/swiper-global.css',
//         [],
//         '10.0.0'
//     );
//     wp_enqueue_style(
//         'swiper-navigation',
//         plugin_dir_url(__FILE__) . 'src/components/navigation-swiper/style.css',
//         [],
//         '10.0.0'
//     );
// }
// add_action('enqueue_block_assets', 'anima_blocks_enqueue_assets');

// ENREGISTREMENT DES BLOCS
function animablocks_register_custom_blocks()
{
    register_block_type(__DIR__ . '/blocks/animate-on-scroll');
    register_block_type(__DIR__ . '/blocks/animated-text');
    register_block_type(__DIR__ . '/blocks/container-parallax');
    // register_block_type(__DIR__ . '/blocks/number-increment-animation');
    register_block_type(__DIR__ . '/blocks/marquee');
    // register_block_type(__DIR__ . '/blocks/separator');
    // register_block_type(__DIR__ . '/blocks/group-extended'); 
    // register_block_type(__DIR__ . '/blocks/slider-image');
    // register_block_type(__DIR__ . '/blocks/slider-simple');
    // register_block_type(__DIR__ . '/blocks/slider-simple-item');
    // register_block_type(__DIR__ . '/blocks/lottie-player');
    register_block_type(__DIR__ . '/blocks/header-minimalist');
    
    // register_block_type(__DIR__ . '/blocks/test');
    
    // TODO en cours
      // register_block_type(__DIR__ . '/blocks/circle-text');
    // register_block_type(__DIR__ . '/blocks/image-video-hover');
    // register_block_type(__DIR__ . '/blocks/button-block');
    // register_block_type(__DIR__ . '/blocks/hero-3D-object');
    // register_block_type(__DIR__ . '/blocks/spans');
    // register_block_type(__DIR__ . '/blocks/change-color-on-scroll'); 
    // register_block_type(__DIR__ . '/blocks/carrousel-text'); // effet de texte qui defile verticalement

}
// add_action('init', 'animablocks_register_custom_blocks');


// Ajout d'une rubrique de composants
function anima_wp_blocks_register_blocks_collections()
{
    wp_enqueue_script(
        'anima-wp-blocks-categories',
        plugins_url('scripts/blocks-collection.js', __FILE__),
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(plugin_dir_path(__FILE__) . 'scripts/blocks-collection.js')
    );
}
add_action('enqueue_block_editor_assets', 'anima_wp_blocks_register_blocks_collections');


// Ajout du support pour les fichiers JSON dans les médias ( lottie, etc. )
add_filter('upload_mimes', function ($mimes) {
    $mimes['json'] = 'application/json';
    return $mimes;
});