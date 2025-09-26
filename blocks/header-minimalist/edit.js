import { useEffect, useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl } from '@wordpress/components';

const findMenuToDisplay = (menus, id) => {
    const menu = menus.find(menu => menu.id === parseFloat(id));
    return menu?.content?.rendered || '';
};

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const [allMenus, setAllMenus] = useState([]);
    const [menuOptions, setMenuOptions] = useState([{ value: '', label: 'aucun' }]);
    const [openMenu, setOpenMenu] = useState(false);

    // Fetch menus from REST API
    useEffect(() => {
        if (menuOptions.length === 1) {
            fetch('/wp-json/wp/v2/navigation/')
                .then(res => res.json())
                .then(data => {
                    setAllMenus(data);

                    const options = [
                        ...data.map(menu => ({ value: menu.id, label: menu.title.rendered })),
                        ...menuOptions
                    ];
                    setMenuOptions(options);
                })
                .catch(err => console.error('Error fetching menus:', err));
        }
    }, [menuOptions]);

    // Update HTML of menus
    useEffect(() => {
        setAttributes({
            menuPrimaireHtml: findMenuToDisplay(allMenus, attributes.menuPrimaire),
            menuSecondaireHtml: findMenuToDisplay(allMenus, attributes.menuSecondaire),
            menuTertiaireHtml: findMenuToDisplay(allMenus, attributes.menuTertiaire),
        });
    }, [allMenus, attributes.menuPrimaire, attributes.menuSecondaire, attributes.menuTertiaire]);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Options">
                    <MediaUpload
                        onSelect={media => setAttributes({ logo: { ...attributes.logo, url: media.url } })}
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
                            <Button onClick={() => setAttributes({ logo: { ...attributes.logo, url: '' } })} variant="secondary">
                                Supprimer le logo
                            </Button>
                        </div>
                    )}

                    <SelectControl
                        label="Menu burger fixe"
                        value={attributes.fixed}
                        options={[
                            { value: false, label: 'non' },
                            { value: true, label: 'oui' }
                        ]}
                        onChange={val => setAttributes({ fixed: val })}
                    />
                    <SelectControl
                        label="Menu rapide (desktop)"
                        value={attributes.menuPrimaire}
                        options={menuOptions}
                        onChange={val => setAttributes({ menuPrimaire: val })}
                    />
                    <SelectControl
                        label="Menu secondaire"
                        value={attributes.menuSecondaire}
                        options={menuOptions}
                        onChange={val => setAttributes({ menuSecondaire: val })}
                    />
                    <SelectControl
                        label="Menu tertiaire"
                        value={attributes.menuTertiaire}
                        options={menuOptions}
                        onChange={val => setAttributes({ menuTertiaire: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <header>
                <div className="header-minimalist__barre">
                    <div className="header-minimalist__logo">
                        {attributes.logo?.url && <img src={attributes.logo.url} alt="Site Logo" />}
                    </div>

                    <div className="header-minimalist__menu01">
                        <ul dangerouslySetInnerHTML={{ __html: findMenuToDisplay(allMenus, attributes.menuPrimaire) }} />
                    </div>

                    <Button
                        className="header-minimalist__button ButtonMenu"
                        data-open={openMenu}
                        aria-haspopup="false"
                        aria-controls="menu"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <p>menu</p>
                        <div className="ButtonMenu__icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Button>
                </div>

                {openMenu && (
                    <div className="header-minimalist__menuburger admin" role="menu">
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
                )}
            </header>
        </div>
    );
}