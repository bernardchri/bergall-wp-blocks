<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<style>
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
<?php
$my_block_template = array(
    array(
        'core/paragraph',

        array()
    ),
);




$class_name = "";
if (!empty($block['align'])) {
    $class_name .= ' align' . $block['align'];
}

if (!empty($block['background'])) {
    $class_name .= ' align' . $block['align'];
}
?>
<div class="bwp_slider is-layout-constrained <?php echo esc_attr($class_name); ?>">
    Grand slider
    <!-- Slider main container -->
    <div class="swiper">
        <!-- Additional required wrapper -->
        <InnerBlocks template="<?php echo esc_attr(wp_json_encode($my_block_template)); ?>" class="swiper-wrapper" />
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
</div>
