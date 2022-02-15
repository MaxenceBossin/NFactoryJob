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
function on_form_submit(formName, data){
    console.log('submit ' + formName);
    console.log(data);
}