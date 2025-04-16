import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';


// header le logo, et lien dessus vers la home page
//

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
        menu01: {
            type: "string",
            default: "principal"
        },
        menu_hidden: {
            type: "string",
            default: "secondary"
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { sticky } = attributes;
        const blocksProps = useBlockProps();

        const [menus, setMenus] = useState([]);
        const [selectedMenu, setSelectedMenu] = useState('');
        const [menuToDisplay, setMenuToDisplay] = useState('');

        useEffect(() => {
            // Fetch menus from the REST API
            fetch('/wp-json/wp/v2/navigation/')
                .then(response => response.json())
                .then(data => {
                    // récupère les datas
                    setMenus(data);
                    console.log("-->", data.find(menu => menu.id === parseFloat(selectedMenu)))
                    // si selectMenu pas défini on prend par défaut le premier
                    !selectedMenu && setSelectedMenu(data[0].id)
                    // 
                    console.log(findMenuToDisplay(data, selectedMenu).content.rendered)
                    setMenuToDisplay(findMenuToDisplay(data, selectedMenu))

                })
                .catch(error => console.error('Error fetching menus:', error));
                

        }, [selectedMenu]);

        const findMenuToDisplay = (data, id) => {
            return data.find(menu => menu.id === parseFloat(id))
        }

        const menuOptions = menus.map(menu => ({
            value: menu.id,
            label: menu.slug,
        }));


        return (
            <div {...blocksProps}>
                <InspectorControls>
                    <PanelBody title="options">
                        <SelectControl
                            label="Menu visible"
                            value={selectedMenu}
                            options={menuOptions}
                            onChange={(newValue) => setSelectedMenu(newValue)}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className='wp-block-column'>
                    Header minimalist
                    <div className="logo">logo</div>
                    {menuToDisplay?.content?.rendered}
                    <div className='fast-links'>
                        <ul>
                            <li><a href='#'> lien 01</a></li>
                            <li><a href='#'> lien 02</a></li>
                        </ul>
                    </div>
                    <div className='menu-button'>menu |||</div>
                    <div className='menu'>menu deplie big</div>
                    sticky : {sticky ? "sticky !" : "pas sticky"}
                </div>
            </div>
        )
    },
    save: ({ attributes }) => {
        const blocksProps = useBlockProps.save();


        return (
            <div {...blocksProps}>
                Header minimalist
            </div>
        )
    }
});
