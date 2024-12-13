<?php
// ENREGISTRER LES BLOCS PATTERNS
add_action( 'init', function() {
    $pattern_dir = plugin_dir_path( __FILE__ ) . 'patterns/';
    $pattern_files = glob( $pattern_dir . '*.html' );

    foreach ( $pattern_files as $file ) {
        $content = file_get_contents( $file );

        // Extraire les métadonnées depuis le commentaire HTML.
        if ( preg_match( '/<!--\s*(.+?)\s*-->/s', $content, $matches ) ) {
            $metadata = json_decode( '{' . preg_replace( '/(\w+):/', '"\1":', $matches[1] ) . '}', true );
            if ( isset( $metadata['title'] ) ) {
                register_block_pattern(
                    'bergall/' . sanitize_title( $metadata['title'] ),
                    array(
                        'title'       => $metadata['title'],
                        'description' => $metadata['description'] ?? '',
                        'content'     => $content,
                        'categories'  => $metadata['categories'] ?? array(),
                        'keywords'    => $metadata['keywords'] ?? array(),
                    )
                );
            }
        }
    }
});
