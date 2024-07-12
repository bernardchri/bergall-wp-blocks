#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dossier = '../src/'

// Récupérer le nom du block à partir de la commande
const blockName = process.argv[2];

// Vérifier si le nom du block a été fourni
if (!blockName) {
    console.error('Veuillez fournir le nom du block en argument.');
    process.exit(1);
}

// Créer le dossier du block
const blockDir = path.join(process.cwd(), dossier, blockName);
fs.mkdirSync(blockDir);

// Créer le fichier block.json
const blockJsonContent = {
    $schema: "https://schemas.wp.org/trunk/block.json",
    name: 'montheme/' +  blockName.toLowerCase(),
    title: blockName,
    description: '',
    category: 'common',
    icon: 'align-full-width',
    style: [`file:./${blockName}.css`],
    viewScriptModule: [`file:./${blockName}.js`],
    keywords: [blockName],
    acf: {
        mode: 'preview',
        renderTemplate: `${blockName}.php`
    },
    supports: {
        anchor: false,
        align: ["full", "wide"]
    }
};
fs.writeFileSync(path.join(blockDir, 'block.json'), JSON.stringify(blockJsonContent, null, 2));

// Créer le fichier [blockName].php
const phpContent = `<?php
/**
 * Block Name: ${blockName}
 */

$title = get_field('title');
$intro = get_field('intro');

$class_name = "";
if (!empty($block['align'])) {
    $class_name .= ' align' . $block['align'];
}

// Votre code PHP ici
?>
<div class="${blockName} is-layout-constrained <?php echo esc_attr($class_name); ?>">
    <div class="${blockName}__wrapper alignwide">
            Nouveau bloc : ${blockName}
    </div>
</div>
`;
fs.writeFileSync(path.join(blockDir, `${blockName}.php`), phpContent);

// Créer le fichier [blockName].js
const jsContent = `/**
 * Block Name: ${blockName}
 */

console.log("${blockName} => Chargement…")
`;
fs.writeFileSync(path.join(blockDir, `${blockName}.js`), jsContent);

// Créer le fichier [blockName].css
const cssContent = `/**
 * Block Name: ${blockName}
 */

.${blockName}{
    background-color: darkgray;
    padding: var(--wp--preset--spacing--10) var(--wp--preset--spacing--6);
}
.${blockName}__wrapper{
   outline : 1px solid;
}
`;
fs.writeFileSync(path.join(blockDir, `${blockName}.css`), cssContent);

console.log(`Le dossier "${blockName}" a été créé avec succès.`);
console.log(`register_block_type(MAISONS_NEHO_DIR_PATH . "/patterns/${blockName}");`)