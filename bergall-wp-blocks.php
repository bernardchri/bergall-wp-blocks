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
        'my-custom-blocks-editor-css',
        plugins_url('/src/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'src/editor.css')
    );

    wp_enqueue_style(
        'my-custom-blocks-css',
        plugins_url('/src/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'src/style.css')
    );
}
add_action('enqueue_block_editor_assets', 'bergall_wp_blocks_register_scripts');
add_action('enqueue_block_assets', 'bergall_wp_blocks_register_scripts');





function register_custom_blocks() {
    register_block_type(__DIR__ . '/blocks/animated-paragraph');
    // Enregistrez d'autres blocs ici si nécessaire
}
add_action('init', 'register_custom_blocks');


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
