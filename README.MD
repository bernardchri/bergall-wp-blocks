# anima Blocks

Apporter des nouveaux blocs aux thèmes FSE pour les rendre plus interactifs et animés
- Préférence fait pour des petits blocs qui font très bien les choses plutôt que des blocs qui fassent tout afin de rester le plus simple possible dans l'utilisation

## Libraire
- **Animation au scroll** - à l'entrée dans la vue on déplace un blocs avec position avant, après, incrémentable suivant le scroll etc. Exemple un bloc s'agrandi quand on est dans la vue. Il tourne en fonction du scroll etc. Actuellement Scale on scroll le fait peut être faire en faire un plus complexe
- **Texte animé** : crée des animations de texte type gsap
- **Scale on scroll** : agrandissement du bloc en arrivant dans la vue
- **circle-text** : création d'un texte autour d'un texte
- **Slider image** : slider simple avec des images
- **Slider simple** : slider comprennat des **Slider simple item** pouvant contenir tout ce que l'on veut
- **Anima Separator** : séparateur de contenus avec des formes originales
- 


## Structure valide
block.json, index.js, edit.js, save.js … 

[X] animate-on-scroll
[X] animate-text
[] carroussel-text
[] circle-text
[X] container-parallax
[X] group-extended
[X] header **minimalist**
[] hero-3D-object
[] image-video-hover
[] lottie-player
[X] marquee
[X] number-increment-animation
[] separator
[] slider-image
[] slider-simple
[] slider-simple-item


## i18n
[X] animate-text

## Bugs
[] animate-text : au premier chargememnt ( ou ajout de nouveau élément) et lecture 
[] animate-text : déclancher l'animation sur le contenaire et pas dans chaque span crées 

[] group-parallax : voir fullwidth dans l'editeur
[] group-parallax : rajouter le debug dans les options attributes
[] group-parallax : avoir la possibilité de voir le rendu dans l'édition 


## Idées de blocs à faire

[] 3D viewer - import d'un gltf pour afficher dans le bloc. Possibilité de le faire tourner , agrandir? 
[] Bloc FAQs - optimisé pour les IA ( génération d'un json ? ou laisser Yoast s'en charger ?)
    [] Bloc question réponse
[] carroussel-text
[] icon lucide ? afficher / importer des icones "lucide" 
[] change-color-on-scroll
[] span 
[] FAQ
[] anima-lottie-embed ? 
[] button-block 



