import { useBlockProps } from '@wordpress/block-editor';
import { createTimeline, stagger } from 'animejs';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        style: { position: attributes.fixed ? 'fixed' : undefined, zIndex: 1000 }
    });

    return (
        <header {...blockProps} className="wp-block-animablocks-header-minimalist">
            <div className="header-minimalist__barre">
                <div className="header-minimalist__logo">
                    <a href="/">
                        {attributes.logo?.url && <img src={attributes.logo.url} alt="Site Logo" />}
                    </a>
                </div>
                <div className="header-minimalist__menu01" data-display="true">
                    <ul className="menu" dangerouslySetInnerHTML={{ __html: attributes.menuPrimaireHtml }} />
                </div>
                <div className="header-minimalist__button ButtonMenu" data-open="false" aria-haspopup="false" aria-controls="menu">
                    <span className="entry-content">menu</span>
                    <div className="ButtonMenu__icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="header-minimalist__menuburger" data-open="false" role="menu">
                <div className="header-minimalist__menuburgerwrapper">
                    <div className="header-minimalist__menu01">
                        <ul dangerouslySetInnerHTML={{ __html: attributes.menuPrimaireHtml }} />
                    </div>
                    <div className="header-minimalist__menu02">
                        <ul dangerouslySetInnerHTML={{ __html: attributes.menuSecondaireHtml }} />
                    </div>
                    <div className="header-minimalist__menu03">
                        <ul dangerouslySetInnerHTML={{ __html: attributes.menuTertiaireHtml }} />
                    </div>
                </div>
            </div>
        </header>
    );
}

// Front-end menu script
document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.wp-block-animablocks-header-minimalist');

    headers.forEach(header => {
        const menuButton = header.querySelector('.header-minimalist__button');
        const menu = header.querySelector('.header-minimalist__menuburger');

        menuButton?.addEventListener('click', () => {
            const isOpen = menu.dataset.open === 'true';
            menu.dataset.open = !isOpen;
            menuButton.dataset.open = !isOpen;

            const tl = createTimeline({ autoplay: false });
            tl.set('.wp-block-animablocks-header-minimalist .header-minimalist__menuburger ul li a', { overflow: 'hidden' })
              .set('.wp-block-animablocks-header-minimalist .header-minimalist__menuburger ul li a span', { opacity: 0 });

            if (!isOpen) {
                tl.add('.wp-block-animablocks-header-minimalist .header-minimalist__menuburger ul li a span', {
                    opacity: [0, 1],
                    y: [40, 0],
                    delay: stagger(50, { start: 150 }),
                    duration: 400
                });
                tl.play();
            } else {
                tl.restart().pause();
            }
        });
    });
});