/*
 * Syntaxe possible pour la création d'un formulaire :
 *
 * const form = create_form('Nom du form');
 * create_input('Nom input', 'text', form,  ....);
 * create_input('Nom input 2', 'select', form,  ....);
 * build_form(form); ==> Ajoute le champs submit, l'événement (relié au on_form_submit ci-dessous) et les classes nécessaires
 *
 * ==> Exemple dans : js/editor/editor-funcs.js ==> function generate_add_module
 * ==> Les fonctions utilisées sont dans js/functions.js
 * ==> Quand un form est submit, la fonction on_form_submit (ci-dessous) est appelée
 */

// Quand un formulaire est submit
// => envoi de requêtes ajax très facilement avec ajax('nomRequete', 'fichier.php', data);
function on_form_submit(formName, form, data, secondary_infos){

    if(formName === 'editor_add_cv_module'){
        editor_add_cv_module(secondary_infos);
    }
}

function editor_add_cv_module(secondary_infos){
    secondary_infos[0].empty();
}