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
    else if(formName === 'module_competence_form'){
        module_competence_form(form, data);
    }
    else if(formName === 'module_formation_form'){
        module_formation_form(form, data);
    }
}

function module_formation_form(form, data){
    const _module = get_selected_module();
    if(_module !== null){
        const _data = _module.getData();
        if(!_data.hasOwnProperty('formation')){
            _data['formation'] = [];
        }
        if(!_data['formation'].hasOwnProperty(data.formation)){
            _data['formation'][data.formation] = [];
        }
        _module.updateData(_data);
        $('<div data-info="'+data.formation+'" class="module-item"><p class="module-item-head-title">'+data.formation+'</p></div>').insertBefore(form);
        const desc = $('<span class="add-item pad-1">+ Ajouter une description</span>').on('click', function(){
            const _form = create_form('module_item_add_competence_desc');
            create_input('description', 'Description', _form, 'text', []);
            build_form(_form, 'Ajouter', []);
            _form.insertBefore($(this));
            $(this).remove();
        });
        desc.insertAfter(form);
        form.fadeOut('fast', function(){
            form.remove();
        });
    }
}

function module_competence_form(form, data){
    const _module = get_selected_module();
    if(_module !== null){
        const _data = _module.getData();
        if(!_data.hasOwnProperty('competence')){
            _data['competence'] = [];
        }
        if(_data['competence'][data.competence] === undefined){
            _data['competence'][data.competence] = [];
        }
        _module.updateData(_data);
        _module.refresh();
        form.fadeOut('fast', function(){
            form.remove();
        });
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
    secondary_infos[0].remove();
    select_module(create_module(LAST_MODULE_ID, data.type_module));
    LAST_MODULE_ID++;
    place_add_module();
    editor_request_save();
}

function form_error(form, field, error){
    const span_error = form.find('span#error-' + field);
    if(span_error !== null){
        span_error.text(error);
    }
}