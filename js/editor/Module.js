class Module{
    constructor(moduleID, moduleName, moduleShownName = '') {
        this.moduleID = moduleID;
        this.moduleName = moduleName;
        if(moduleShownName.length === 0){
            this.moduleShownName = moduleName;
        }
        else{
            this.moduleShownName = moduleShownName;
        }
        this.section = null;

        this.width = 50;
        this.data = [];
    }

    getData(){
        return this.data;
    }

    updateData(data){
        this.data = data;
    }

    setSection(section){
        this.section = section;
    }

    getSection(){
        return this.section;
    }

    getModuleID(){
        return this.moduleID;
    }

    setModuleShownName(_name){
        this.moduleShownName = _name;
    }

    getModuleName(){
        return this.moduleName;
    }

    getModuleShownName(){
        return this.moduleShownName;
    }

    getWidth(){
        return this.width;
    }

    setWidth(_width){
        this.width = _width;
    }

    refresh(){
        const content = $('#module-' + this.moduleID);
        content.empty();

        if(this.getModuleName() === 'Compétences'){
            const add_compet = $('<span class="add-item">+ Ajouter une compétence</span>').on('click', function(){
                const _form = create_form('module_competence_form');
                create_input('competence', 'Nom de la compétence', _form, 'autocomplete', []);
                build_form(_form, 'Ajouter', [], true);
                _form.insertBefore($(this));
            });
            content.append(add_compet);
        }

        else if(this.getModuleName() === 'Formations'){
            const add_formation = $('<span class="add-item">+ Ajouter une formation</span>').on('click', function(){
                const _form = create_form('module_formation_form');
                create_input('formation', 'Nom de la formation', _form, 'autocomplete', []);
                build_form(_form, 'Ajouter', [], true);
                _form.insertBefore($(this));
            });
            content.append(add_formation);
        }

        /*$('<div data-info="'+data.competence+'" class="module-item"><p class="module-item-head-title">'+data.competence+'</p></div>').insertBefore(form);
        const desc = $('<span class="add-item pad-1">+ Ajouter une description</span>').on('click', function(){
            const _form = create_form('module_formation_add_desc_form');
            create_input('description', 'Description', _form, 'text', []);
            build_form(_form, 'Ajouter', []);
            _form.insertBefore($(this));
            $(this).remove();
        });
        desc.insertAfter(form);*/
    }
}