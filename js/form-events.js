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
    else if(formName.startsWith('module_item_add_')){
        module_item_add(formName, form, data, secondary_infos);
    }
    else if(formName.startsWith('module_add_category_')){
        module_add_category(formName, form, data);
    }
}

function module_item_add(formName, form, data, secondary_infos){
    let _parts = formName.split('_');
    const _module = get_selected_module();
    if(_module != null){
        let _data = _module.getData();

        if(!_data.hasOwnProperty(_parts[3])){
            _data[_parts[3]] = {};
        }
        if(!_data[_parts[3]].hasOwnProperty(secondary_infos[0])) {
            _data[_parts[3]][secondary_infos[0]] = {};
        }
        _data[_parts[3]][secondary_infos[0]][_parts[4]] = data[_parts[4]];

        _module.updateData(_data);
    }
}

function module_add_category(formName, form, data){
    let _parts = formName.split('_');
    const _module = get_selected_module();
    if(_module !== null){
        const _data = _module.getData();

        if(!_data.hasOwnProperty(_parts[3])) {
            _data[_parts[3]] = {};
        }
        if(!_data[_parts[3]].hasOwnProperty(data[_parts[3]])) {
            _data[_parts[3]][data[_parts[3]]] = {};
        }

        _module.updateData(_data);
    }
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
    const _lineNum = parseInt(secondary_infos[0].attr('data-line'));
    secondary_infos[0].remove();
    select_module(create_module(get_new_available_module_id(), data.type_module, 50, _lineNum));
    place_add_module();
    editor_request_save();
}

/** Global **/

function form_error(form, field, error){
    const span_error = form.find('span#error-' + field);
    if(span_error !== undefined){
        span_error.text(error);
    }
}

function input_error(field, error){
    const span_error = $('span#error-' + field);
    if(span_error.length){
        span_error.text(error);
    }
}

$(document).on('click', function(e) {
    const element = $(e.target);
    if(element.length){
        if(!element.hasClass('input_wrapper') && !element.hasClass('autocomplete') && !element.hasClass('autocomplete-item')){
            $('.autocomplete').each(function(){
                $(this).css("display", "none");
            });
        }
    }
});