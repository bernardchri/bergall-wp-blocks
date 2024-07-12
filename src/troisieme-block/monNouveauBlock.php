<?php
/**
 * Block Name: monNouveauBlock
 */

$title = get_field('title');
$intro = get_field('intro');

$class_name = "";
if (!empty($block['align'])) {
    $class_name .= ' align' . $block['align'];
}

// Votre code PHP ici
?>
<div class="monNouveauBlock is-layout-constrained <?php echo esc_attr($class_name); ?>">
    <div class="monNouveauBlock__wrapper alignwide">
            Nouveau bloc : monNouveauBlock
    </div>
</div>
