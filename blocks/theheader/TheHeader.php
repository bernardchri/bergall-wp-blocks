<?php
$informations = get_field('informations', 'options');

$phone_format = '';
if ($informations) {
    $phone_format = chunk_split($informations['phone'], 2, ' ');
}
$prescripteur = get_field('prescripteur', 'options');
$contact = get_field('contact', 'options');
$socialshare = get_field('socialshare', 'options');
?>

<header class="TheHeader">

    <!-- Header Desktop -->
    <div class="TheHeader__desktop is-layout-constrained" data-style="white">
        <div class="alignwide">
            <!-- surheader -->
            <div class="TheHeader__desktop__top">
                <?php
                if (!empty($prescripteur)) :
                    $title_prescripteur = $prescripteur['title'];
                    $link_prescripteur = $prescripteur['link'];
                ?>
                    <?php if (!empty($link_prescripteur)) : ?><a href="<?php echo $link_prescripteur['url'] ?>" class=""><?php endif; ?>
                        <i data-lucide="user-round" class="g-text-icon"></i>
                        <span><?php echo $title_prescripteur ?></span>
                        <?php if (!empty($link_prescripteur)) : ?></a><?php endif; ?>
                <?php endif; ?>

                <?php if (!empty($informations) && !empty($informations['phone'])) : ?>
                    <a class="TheHeader__desktop__phone TheHeader__phone" href="#">
                        <i data-lucide="phone" class="g-text-icon"></i>
                        <span data-number="<?php echo $informations['phone']; ?>"><?php echo $phone_format ?></span>
                    </a>
                <?php endif; ?>
            </div>
            <!-- header -->
            <div class="TheHeader__cartouche ">
                <div class="TheHeader__cartouche__wrapper">
                    <div>
                           
                            <!-- <img loading="lazy" src="< ?php echo (get_template_directory_uri()) . "/assets/img/logo-maisons-neho.svg" ?>" width="100" height="50" class="TheHeader__desktop__logo" alt="logo Maisons Ného" /> -->
                    </div>
                    <nav class="" id="menu-desktop">
                        <?php echo wp_nav_menu(array(
                            'theme_location'        => 'primary_menu',
                        )); ?>
                        <?php
                        if (!empty($contact['title'])) {
                            $linkUrl = !empty($contact['link']['url']) ? $contact['link']['url'] : "#";
                        ?>
                            <div class="wp-block-button is-style-important has-sm-font-size">
                                <a href="<?php echo $linkUrl; ?>" class="wp-block-button__link wp-element-button">
                                    <?php echo $contact['title']; ?>
                                </a>
                            </div>
                        <?php
                        }
                        ?>
                    </nav>

                </div>
            </div>
        </div>
    </div>

    <!-- menu mobile -->
    <div class="TheHeader__mobile" data-status="CLOSED">
        <div class="TheHeader__mobile__header">
            <div class="TheHeader__mobile__logo">
                <a href="<?php echo home_url() ?>">
                    <img loading="lazy" src="<?php echo (get_template_directory_uri()) . "/assets/img/logo-maisons-neho.svg" ?>" width="70" height="30" alt="logo maisons ného" />
                </a>
            </div>
            <?php if (!empty($informations) && !empty($informations['phone'])) : ?>
                <div class="TheHeader__mobile__phone">
                    <a class="TheHeader__phone" href="#">
                        <i data-lucide="phone" class="g-text-icon"></i>
                        <span data-number="<?php echo $informations['phone']; ?>"><?php echo $phone_format ?></span>
                    </a>
                </div>
            <?php endif; ?>
            <div class="TheHeader__mobile__button">
                <button class="TheHeader__toggle" aria-label="toggle menu">
                    <span class="TheHeader__toggle__opened">
                        <i data-lucide="menu" class=""></i>
                    </span>
                    <span class="TheHeader__toggle__closed">
                        <i data-lucide="x" class="text-bleu"></i>
                    </span>
                </button>
            </div>
        </div>
        <div class="TheHeader__mobile__menu">
            <div>
                <div class="TheHeader__mobile__top">
                    <?php if (!empty($contact['title'])) : ?>
                        <a href="<?php echo !empty($contact['link']['url']) ? $contact['link']['url']  : "#" ?>" class="cta">
                            <?php echo $contact['title'] ?>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($informations)  && !empty($informations['phone'])) : ?>
                        <a class="TheHeader__phone" href="#">
                            <i data-lucide="phone" class="g-text-icon"></i>
                            <span data-number="<?php echo $informations['phone']; ?>"><?php echo $phone_format ?></span>
                        </a>
                    <?php endif; ?>
                </div>
                <hr />
                <div class="">
                    <?php echo wp_nav_menu(array(
                        'theme_location'        => 'primary_menu',
                    )); ?>
                </div>
                <hr />
                <div class="menu">
                    <?php
                    if (!empty($prescripteur)) :
                        $title_prescripteur = $prescripteur['title'];
                        $link_prescripteur = $prescripteur['link'];
                    ?>
                        <?php if (!empty($link_prescripteur)) : ?><a href="<?php echo $link_prescripteur['url'] ?>" class="g-icon-text"><?php endif; ?>
                            <i data-lucide="user-round" class="g-text-icon"></i>
                            <span><?php echo $title_prescripteur ?></span>
                            <?php if (!empty($link_prescripteur)) : ?></a><?php endif; ?>
                    <?php endif; ?>
                </div>
                <hr />
                <div class="TheHeader__mobile__socialshare">
                    <?php
                    if (have_rows('socialshare', 'option')) : while (have_rows('socialshare', 'option')) : the_row(); ?>
                            <h3><?php echo get_sub_field('title') ?></h3>
                            <div class="links">
                                <?php
                                if (have_rows('links', 'option')) :
                                    while (have_rows('links', 'option')) :
                                        the_row();
                                        $link = get_sub_field('link');
                                        $icon = get_sub_field('icon');
                                        $title = get_sub_field('title');
                                ?>
                                        <li>
                                            <?php if (!empty($link)) : ?>
                                                <a href="<?php echo esc_url($link); ?>" class="g-icon-text">
                                                <?php endif; ?>
                                                <?php if (!empty($icon)) : ?>
                                                    <i data-lucide="<?php echo esc_attr($icon); ?>"></i>
                                                <?php endif; ?>
                                                <?php echo esc_html($title); ?>
                                                <?php if (!empty($link)) : ?>
                                                </a>
                                            <?php endif; ?>
                                        </li>
                                <?php
                                    endwhile;
                                endif;
                                ?>
                            </div>
                    <?php endwhile;
                    endif;
                    ?>

                </div>
            </div>
        </div>
    </div>
    </div>
</header>