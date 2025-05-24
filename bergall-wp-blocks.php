<?php

/**
 * Plugin Name:       anima – Blocks
 * Description:       Blocks étendus pour thèmes FSE
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


// require_once ( anima_WP_BLOCKS_PATH . "/inc/acf-general-options.php");
// require_once ( anima_WP_BLOCKS_PATH . "/inc/acf-blocks-gutemberg.php");


function anima_wp_blocks_register_scripts()
{
    wp_enqueue_script(
        'my-custom-blocks-js',
        plugins_url('/build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );
}
add_action('enqueue_block_assets', 'anima_wp_blocks_register_scripts');


//css en mode backend
add_action('wp_enqueue_scripts', 'anima_enqueue_front_styles');
function anima_enqueue_front_styles() {
    wp_enqueue_style(
        'my-custom-blocks-css',
        plugins_url('/build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );
}

// css en mode front
add_action('enqueue_block_editor_assets', 'anima_enqueue_editor_styles');
function anima_enqueue_editor_styles() {
    wp_enqueue_style(
        'my-custom-blocks-index-css',
        plugins_url('/build/index.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );
}



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


// ENREGISTREMENT DES BLOCS
function animablocks_register_custom_blocks()
{
    // composants animations
    register_block_type(__DIR__ . '/blocks/animated-text');
    register_block_type(__DIR__ . '/blocks/image-video-hover');
    register_block_type(__DIR__ . '/blocks/slider-image');
    register_block_type(__DIR__ . '/blocks/slider-simple');
    register_block_type(__DIR__ . '/blocks/slider-simple-item');
    register_block_type(__DIR__ . '/blocks/marquee');
    register_block_type(__DIR__ . '/blocks/circle-text');
    register_block_type(__DIR__ . '/blocks/number-increment-animation');

    // // groups étendus
    register_block_type(__DIR__ . '/blocks/container-parallax');
    register_block_type(__DIR__ . '/blocks/group-extended');
    register_block_type(__DIR__ . '/blocks/animate-on-scroll');

    // headers
    register_block_type(__DIR__ . '/blocks/header-minimalist');

    // TODO en cours
    // register_block_type(__DIR__ . '/blocks/hero-3D-object');
    // register_block_type(__DIR__ . '/blocks/button-block');
    // register_block_type(__DIR__ . '/blocks/spans');
    // register_block_type(__DIR__ . '/blocks/change-color-on-scroll'); 

}
add_action('init', 'animablocks_register_custom_blocks');




/********************************/
// Save and load plugin specific ACF field groups via the /acf-json folder.
/********************************/

// // Save
// function anima_wp_blocks_update_field_group($group)
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
// add_action('acf/update_field_group', 'anima_wp_blocks_update_field_group', 1, 1);

// // Load - includes the /acf-json folder in this plugin to the places to look for ACF Local JSON files
// add_filter('acf/settings/load_json', function ($paths) {
//     $paths[] = dirname(__FILE__) . '/acf-json';
//     return $paths;
// });



// Ajout d'une rubrique de composants
function anima_wp_blocks_register_blocks_collections()
{
    wp_enqueue_script(
        'anima-wp-blocks-categories',
        plugins_url('src/utils/blocks-collection.js', __FILE__),
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(plugin_dir_path(__FILE__) . 'src/utils/blocks-collection.js')
    );
}
add_action('enqueue_block_editor_assets', 'anima_wp_blocks_register_blocks_collections');
