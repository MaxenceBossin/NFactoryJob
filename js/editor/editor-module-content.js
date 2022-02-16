function configure_module(module, width = 50){
    const module_element = $('#module-' + module.getModuleID());
    module.setWidth(width);
    module_element.attr('data-width', width);

    if(module.getModuleName() === 'Compétences'){
        const add_compet = $('<span class="add-item">+ Ajouter une compétence</span>').on('click', function(){
            const _form = create_form('atc-competence-form');
            create_input('atc-competence', 'Nom de la compétence', _form, 'autocomplete', []);
            build_form(_form, 'Ajouter', [], true);
            _form.insertBefore($(this));
        });
        module_element.append(add_compet);
    }

    else if(module.getModuleName() === 'Formations'){
        const add_formation = $('<span class="add-item">+ Ajouter une formation</span>').on('click', function(){
            const _form = create_form('atc-formation-form');
            create_input('atc-formation', 'Nom de la formation', _form, 'autocomplete', []);
            build_form(_form, 'Ajouter', [], true);
            _form.insertBefore($(this));
        });
        module_element.append(add_formation);
    }
}