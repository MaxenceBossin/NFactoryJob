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
        editor_add_cv_module(form, data, secondary_infos);
    }
    else if(formName === 'module_data_form'){
        module_data_form(form, data);
    }
}

function module_data_form(form, data){
    console.log(data.largeur);
}

function editor_add_cv_module(form, data, secondary_infos){
    if(data.type_module.length === 0){
        form_error(form, 'type_module', 'Veuillez sélectionner un module');
        return;
    }
    if(secondary_infos.length === 0){
        form_error(form, 'type_module', 'Une erreur s\'est produite');
        return;
    }
    secondary_infos[0].remove();
    select_module(create_module(LAST_MODULE_ID, data.type_module));
    LAST_MODULE_ID++;
    place_add_module();
    open_onglet('module');
}

function form_error(form, field, error){
    const span_error = form.find('span#error-' + field);
    if(span_error !== null){
        span_error.text(error);
    }
}