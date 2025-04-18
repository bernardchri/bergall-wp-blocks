import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, ToolbarButton } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { render, useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import './style.css';


const findMenuToDisplay = (data, id) => {
    let menu = data.find(menu => menu.id === parseFloat(id))
    return menu?.content?.rendered || '';
}

/** HEADER MINIMALISTES */
// 3 niveaux de menus
// - un menu de navigation principal toujours visible
// - un menu burger secondaire 
// - un menu burger tertiaire pour les réseaux sociaux 
// en version mobile, les trois menus sont superposés dans un menu burger avec une hierarchie de 3 niveaux
// Menu en sticky 

registerBlockType('bergalblocks/header-minimalist', {
    title: 'Header minimaliste',
    category: 'bergall',
    description: "un header minimaliste pour portfolio",
    apiVersion: 3,
    supports:
    {
        color: {
            background: true
        },
        spacing: {
            margin: true,
            padding: true,
            blockGap: true
        }
    },
    attributes: {
        sticky: {
            type: "boolean",
            default: false
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
    },
    edit: ({ attributes, setAttributes }) => {
        const { sticky } = attributes;
        const blocksProps = useBlockProps();

        const [allMenus, setAllMenus] = useState([]);
        const [menuOptions, setMenuOptions] = useState([]);
        const [openMenu, setOpenMenu] = useState(true);

        useEffect(() => {
            // Fetch menus from the REST API
            fetch('/wp-json/wp/v2/navigation/')
                .then(response => response.json())
                .then(data => {
                    // récupère les datas
                    setAllMenus(data);
                    // mappe les menus pour les options du select
                    setMenuOptions(allMenus.map(menu => ({
                        value: menu.id,
                        label: menu.slug,
                    })));
                })
                .catch(error => console.error('Error fetching menus:', error));
        }, [allMenus]);

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
                        <SelectControl
                            label="Menu visible"
                            value={attributes.menuPrimaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuPrimaire: newValue })}
                        />
                        <SelectControl
                            label="Menu secondaire burger"
                            value={attributes.menuSecondaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuSecondaire: newValue })}
                        />
                        <SelectControl
                            label="Menu tertiaire burger"
                            value={attributes.menuTertiaire}
                            options={menuOptions}
                            onChange={(newValue) => setAttributes({ menuTertiaire: newValue })}
                        />
                        {/* <SelectControl
                            label="Sticky"
                            value={sticky}
                            options={[
                                { label: 'Oui', value: true },
                                { label: 'Non', value: false },
                            ]}
                            onChange={(newValue) => setAttributes({ sticky: newValue === 'true' })}
                        /> */}

                    </PanelBody>
                </InspectorControls>
                <div className='wp-block-column'>
                    Header minimalist
                    {attributes.menuPrimaire}
                    <div className="logo">logo</div>
                    <div className='fast-links'>
                        <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuPrimaire) }} />
                    </div>

                    <Button className='menu-button' onClick={() => setOpenMenu(!openMenu)}>
                        {openMenu ? <div>menu X</div> : <div>menu |||</div>}
                    </Button>

                    {
                        openMenu && <div className='menu'>
                            <div>
                                Second menu
                                <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuSecondaire) }} />
                            </div>

                            <div>
                                troisieme menu
                                <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuTertiaire) }} />
                            </div>
                        </div>
                    }
                    {/* sticky : {sticky ? "sticky !" : "pas sticky"} */}
                </div>
            </div>
        )
    },
    save: ({ attributes }) => {
        const blocksProps = useBlockProps.save();
        console.log('blocksProps', blocksProps);
        // const [openMenu, setOpenMenu] = useState(false);
        console.log('attributes', attributes);

        return (
            <header {...blocksProps}>
                {/* <div className={`menu ${attributes.sticky ? 'sticky' : ''}`}>
                </div> */}

                <div className="header-minimalist__barre">
                    <div className="header-minimalist__logo">logo</div>
                    <div className="header-minimalist__menu01" data-display="true">
                        <ul className='menu' dangerouslySetInnerHTML={{ __html: attributes.menuPrimaireHtml }} />
                    </div>
                    <button className='header-minimalist__button' aria-haspopup="false" aria-controls="menu">menu</button>
                </div>

                <div className='header-minimalist__menuburger' data-open="false" role="menu" >
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
    const headerMinimalist = document.querySelectorAll('.wp-block-bergalblocks-header-minimalist');

    headerMinimalist.forEach(header => {

        // open menu
        const menuButton = header.querySelector('.header-minimalist__button');
        const menu = header.querySelector('.header-minimalist__menuburger');

        menuButton?.addEventListener('click', () => {
            menu.dataset.open = menu.dataset.open === 'true' ? 'false' : 'true';
            // this.aria.haspopup = menu.dataset.open === 'true' ? 'true' : 'false';
        });

        // close menu
    })


});

