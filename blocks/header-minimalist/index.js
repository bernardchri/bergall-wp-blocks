import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { createTimeline, stagger } from "animejs"
import './style.css';
import './editor.css'; // <-- Ajout de la CSS pour l'éditeur

const findMenuToDisplay = (data, id) => {
    let menu = data.find(menu => menu.id === parseFloat(id))
    return menu?.content?.rendered || '';
}

/** HEADER MINIMALISTES */
// 3 niveaux de menus
// - un menu de navigation principal toujours visible sur desktop
// - un menu burger secondaire plus complet
// - un menu burger tertiaire pour les réseaux sociaux  par exemple
// En version mobile, les trois menus sont superposés dans un menu burger avec une hierarchie de 3 niveaux
// Menu en sticky 

registerBlockType('bergallblocks/header-minimalist', {
    title: 'Header minimaliste',
    category: 'bergall',
    description: "un header minimaliste pour portfolio",
    apiVersion: 3,
    supports:
    {

        color: {
            background: true,
            text: true,
            link: true,
        },
        spacing: {
            margin: true,
            padding: true,
            blockGap: true
        }
    },
    attributes: {
        fixed: {
            type: 'boolean',
            default: true,
        },
        menus: {
            type: "array",
            default: []
        },
        menuPrimaire: {
            type: 'string',
            default: '',
        },
        menuSecondaire: {
            type: 'string',
            default: '',
        },
        menuTertiaire: {
            type: 'string',
            default: '',
        },
        menuPrimaireHtml: {
            type: 'string',
            default: '',
        },
        menuSecondaireHtml: {
            type: 'string',
            default: '',
        },
        menuTertiaireHtml: {
            type: 'string',
            default: '',
        },
        logo: {
            type: "object",
            default: [{
                url: "",
                alt: "",
                height: "",
                width: ""
            }]
        }

    },
    edit: ({ attributes, setAttributes }) => {
        const blocksProps = useBlockProps();
        const [allMenus, setAllMenus] = useState([]);
        const [menuOptions, setMenuOptions] = useState([{ value: '', label: "aucun" }]);
        const [openMenu, setOpenMenu] = useState(false);

        useEffect(() => {
            // Fetch menus from the REST API
            if (menuOptions.length == 1) {
                fetch('/wp-json/wp/v2/navigation/')
                    .then(response => response.json())
                    .then(data => {
                        // récupère les datas
                        setAllMenus(data);
                        // mappe les menus pour les options du select
                        let newDatasForMenu = data.map(menu => ({
                            value: menu.id,
                            label: menu.title.rendered,
                        }));
                        // fusionner deux tableaux
                        newDatasForMenu.push(...menuOptions)

                        setMenuOptions(newDatasForMenu);
                    })
                    .catch(error => console.error('Error fetching menus:', error));
            }

            return

        }, [allMenus, menuOptions]);

        useEffect(() => {
            setAttributes({
                menuPrimaireHtml: findMenuToDisplay(allMenus, attributes.menuPrimaire),
                menuSecondaireHtml: findMenuToDisplay(allMenus, attributes.menuSecondaire),
                menuTertiaireHtml: findMenuToDisplay(allMenus, attributes.menuTertiaire),
            });

        }, [attributes.menuPrimaire, attributes.menuSecondaire, attributes.menuTertiaire, allMenus]);

        return (
            <div {...blocksProps}>
                <InspectorControls>
                    <PanelBody title="options">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ logo: { ...attributes.logo, url: media.url } })}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} variant="primary">
                                    {attributes.logo?.url ? 'Modifier le logo' : 'Ajouter un logo'}
                                </Button>
                            )}
                        />
                        {attributes.logo?.url && (
                            <div>
                                <img src={attributes.logo.url} alt="Logo Preview" style={{ maxWidth: '100%' }} />
                                <Button
                                    onClick={() => setAttributes({ logo: { ...attributes.logo, url: '' } })}
                                    variant="secondary"
                                >
                                    Supprimer le logo
                                </Button>
                            </div>
                        )}
                        <SelectControl
                            label="Menu burger fixe"
                            value={attributes.fixed}
                            options={[
                                { value: false, label: 'non' },
                                { value: true, label: 'oui' },
                            ]}
                            onChange={(newValue) => setAttributes({ fixed: newValue })}
                        />
                        <SelectControl
                            label="Menu rapide (desktop) "
                            value={attributes.menuPrimaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuPrimaire: newValue })}
                        />
                        <SelectControl
                            label="Menu secondaire"
                            value={attributes.menuSecondaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuSecondaire: newValue })}
                        />
                        <SelectControl
                            label="Menu tertiaire"
                            value={attributes.menuTertiaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuTertiaire: newValue })}
                        />
                    </PanelBody>
                </InspectorControls>
                <header>
                    <div className='header-minimalist__barre'>
                        <div className="header-minimalist__logo">
                            {attributes.logo?.url && <img src={attributes.logo.url} alt="Site Logo" />}
                        </div>

                        <div className='header-minimalist__menu01'>
                            <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuPrimaire) }} />
                        </div>

                        <Button className='header-minimalist__button ButtonMenu' data-open={openMenu} aria-haspopup="false" aria-controls="menu" onClick={() => setOpenMenu(!openMenu)}>
                            <p>menu</p>
                            <div className='ButtonMenu__icon'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Button>
                    </div>
                    {
                        openMenu && <div className='header-minimalist__menuburger admin' role="menu"  >
                            <div className="header-minimalist__menuburgerwrapper">
                                <div className="header-minimalist__menu01">
                                    <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuPrimaire) }} />
                                </div>
                                <div className="header-minimalist__menu02">
                                    <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuSecondaire) }} />
                                </div>
                                <div className="header-minimalist__menu03">
                                    <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuTertiaire) }} />
                                </div>
                            </div>
                        </div>
                    }
                </header>
            </div>
        )
    },
    save: ({ attributes }) => {
        const blocksProps = useBlockProps.save();
        return (
            <header {...useBlockProps.save({ style: { position: attributes.fixed ? 'fixed' : undefined }, zIndex: 1000 })}>
                <div className="header-minimalist__barre">
                    <div className="header-minimalist__logo">
                        <a href='/'>
                            {attributes.logo?.url && <img src={attributes.logo.url} alt="Site Logo" />}
                        </a>
                    </div>
                    <div className="header-minimalist__menu01" data-display="true">
                        <ul className='menu' dangerouslySetInnerHTML={{ __html: attributes.menuPrimaireHtml }} />
                    </div>
                    <div className='header-minimalist__button ButtonMenu' data-open="false" aria-haspopup="false" aria-controls="menu">
                        <span className='entry-content'>menu</span>
                        <div className='ButtonMenu__icon'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className='header-minimalist__menuburger' data-open="false" role="menu"  >
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
        )
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const headerMinimalist = document.querySelectorAll('.wp-block-bergallblocks-header-minimalist');


    headerMinimalist.forEach(header => {
        // open menu
        const menuButton = header.querySelector('.header-minimalist__button');
        const menu = header.querySelector('.header-minimalist__menuburger');

        menuButton?.addEventListener('click', () => {

            menu.dataset.open = menu.dataset.open === 'true' ? 'false' : 'true';
            menuButton.dataset.open = menuButton.dataset.open === 'true' ? 'false' : 'true';

            // animation items menu
            const tl = createTimeline({ autoplay: false })
            tl.set('.wp-block-bergallblocks-header-minimalist .header-minimalist__menuburger  ul li a', { overflow: 'hidden' }).set('.wp-block-bergallblocks-header-minimalist .header-minimalist__menuburger  ul li a span', { opacity: 0 })

            if (menuButton.dataset.open) {

                tl.add('.wp-block-bergallblocks-header-minimalist .header-minimalist__menuburger  ul li a span', {
                    opacity: [0, 1],
                    y: [40, 0],
                    delay: stagger(50, { start: 150 }),
                    duration: 400
                })

                tl.play()


            } else {
                tl.restart().pause()
            }


        });

        // close menu
    })




});

