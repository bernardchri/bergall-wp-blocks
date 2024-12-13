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
<div class="b-monNouveauBlock is-layout-constrained <?php echo esc_attr($class_name); ?>">
    <div class="b-monNouveauBlock__wrapper alignwide">
            <h2> <?php echo $title ?></h2>
            <div><?php echo $intro ?></div>
    </div>
</div>
