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
        this.line = null;

        this.width = 50;
        this.color = "#FFFFFF";
        this.data = [];
        this.show_title = true;
    }

    setShowTitle(status){
        this.show_title = status;
    }

    getColor(){
        return this.color;
    }

    setColor(col){
        this.color = col;
    }

    getData(){
        return this.data;
    }

    updateData(data, refresh = true){
        this.data = data;
        if(refresh){
            this.refresh();
            editor_request_save();
        }
    }

    setLine(_line){
        this.line = _line;
    }

    getLine(){
        return this.line;
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

    getLargeur(){
        return this.width;
    }

    setWidth(_width){
        this.width = _width;
    }

    generate_onemodule_item(content, field, showName, type = 'autocomplete'){
        if(!this.data.hasOwnProperty(field)) {
            add_module_item_global(content, showName, field, false, [], type);
        }
        else{
            const moduleItem = $('<div class="module-item"></div>');
            moduleItem.append($('<p class="module-item-head-title">'+Object.keys(this.data[field])[0]+'</p>'));
            content.append(moduleItem);
        }
    }

    generate_form_input_item(content, paramCategory, showName){
        const add = $('<span class="add-item">+ '+showName+'</span>').on('click', function(){
            const _form = create_form('module_add_category_' + paramCategory);
            create_input(paramCategory, showName, _form, 'autocomplete', []);
            build_form(_form, 'Ajouter', [], true);
            _form.insertBefore($(this));
        });
        content.append(add);
    }

    refresh(){
        const content = $('#module-' + this.moduleID);
        content.empty();
        console.log(this.moduleName + ' : ');
        console.log(this.data);

        // Global
        const head = $('<div class="head"></div>');
        head.append($('<i class="fa-solid fa-arrows-up-down-left-right draggable"></i>'));
        if(this.show_title){
            const module_title = $('<h1 class="module-title">'+this.moduleShownName+'</h1>');
            head.append(module_title);
        }
        content.append(head);
        content.attr('data-width', this.width);
        content.css("width", this.width + '%');
        content.css("background-color", this.color);

        // Modules Informations
        if(this.moduleName === 'Informations'){
            this.generate_onemodule_item(content, 'nomprenom', 'Ajouter un nom et prénom', 'text');
            this.generate_onemodule_item(content, 'adresse', 'Ajouter une adresse', 'text');
            this.generate_onemodule_item(content, 'contratrecherche', 'Ajouter un type de contrat recherché');
            this.generate_onemodule_item(content, 'posterecherche', 'Ajouter un poste recherché');
        }

        // Modules personnalisé
        else if(this.moduleName === 'Module personnalisé'){
            this.generate_onemodule_item(content, 'contenu', 'Ajouter un contenu', 'textarea');
        }

        // Module Contact
        else if(this.moduleName === 'Contact'){
            this.generate_onemodule_item(content, 'email', 'Ajouter une adresse mail', 'text');
            this.generate_onemodule_item(content, 'tel', 'Ajouter un numéro de téléphone', 'text');
            this.generate_onemodule_item(content, 'linkedin', 'Ajouter un lien LinkedIn', 'text');
            this.generate_onemodule_item(content, 'github', 'Ajouter un lien GitHub', 'text');
            this.generate_onemodule_item(content, 'portfolio', 'Ajouter un lien vers votre portfolio', 'text');
        }

        // Module Loisirs
        else if(this.moduleName === 'Loisirs') {
            if(this.data.hasOwnProperty('loisirs')){
                Object.keys(this.data['loisirs']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'loisirs', key, 'description', 'Ajouter une description', 'text', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'loisirs', 'Ajouter un loisir');
        }

        // Module Expériences pro
        else if(this.moduleName === 'Expériences professionnelles') {
            if(this.data.hasOwnProperty('expro')){
                Object.keys(this.data['expro']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'expro', key, 'description', 'Ajouter une description', 'text', false);
                    add_module_item_param(this, moduleItem, 'expro', key, 'description', 'Ajouter un établissement', 'text', false);
                    add_module_item_param(this, moduleItem, 'expro', key, 'description', 'Ajouter une date de début', 'text', false);
                    add_module_item_param(this, moduleItem, 'expro', key, 'description', 'Ajouter une date de fin', 'text', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'expro', 'Ajouter une expérience');
        }

        // Module Expériences perso
        else if(this.moduleName === 'Expériences personnelles') {
            if(this.data.hasOwnProperty('experso')){
                Object.keys(this.data['experso']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'experso', key, 'description', 'Ajouter une description', 'text', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'experso', 'Ajouter une expérience');
        }

        // Module Langues
        else if(this.moduleName === 'Langues') {
            if(this.data.hasOwnProperty('langues')){
                Object.keys(this.data['langues']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'langues', key, 'niveau', 'Ajouter un niveau', 'text', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'langues', 'Ajouter une langue');
        }

        // Module Compétences
        else if(this.moduleName === 'Compétences'){

            if(this.data.hasOwnProperty('competences')){
                Object.keys(this.data['competences']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'competences', key, 'description', 'Ajouter une description', 'text', false);
                    add_module_item_param(this, moduleItem, 'competences', key, 'niveau', 'Ajouter un niveau', 'text', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'competences', 'Ajouter une compétence');
        }

        // Module Formations
        else if(this.moduleName === 'Formations'){

            if(this.data.hasOwnProperty('formations')){
                Object.keys(this.data['formations']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    moduleItem.append($('<p class="module-item-head-title">'+key+'</p>'));
                    add_module_item_param(this, moduleItem, 'formations', key, 'description', 'Ajouter une description', 'text', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'secteur', 'Ajouter un secteur', 'autocomplete', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'niveau', 'Ajouter un niveau', 'autocomplete', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'etablissement', 'Ajouter un établissement', 'autocomplete', false);
                    content.append(moduleItem);
                });
            }

            this.generate_form_input_item(content, 'formations', 'Ajouter une formation');
        }
    }
}