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
        this.fontColor = "#000000";
        this.separatorColor = "#000000";
        this.data = [];

        this.show_title = true;
        this.separator_size = 0;
        this.separator_radius = 0;
        this.border_top = 0;
        this.border_bottom = 0;
        this.border_left = 0;
        this.border_right = 0;
        this.border_radius = 0;
        this.modeAffichage = 0;
        this.icon = '';
        this.font = '';
    }

    setSeparatorColor(col){
        this.separatorColor = col;
    }

    getSeparatorColor(){
        return this.separatorColor;
    }

    setShowTitle(status){
        this.show_title = status;
    }

    getShowTitle(){
        return this.show_title;
    }

    getFontColor(){
        return this.fontColor;
    }

    setFontColor(col){
        this.fontColor = col;
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

    setLargeur(_width){
        this.width = _width;
    }

    generate_onemodule_item(_content, field, showName, type = 'autocomplete'){
        if(!this.data.hasOwnProperty(field)) {
            add_module_item_global(_content, showName, field, false, [], type);
        }
        else{
            const moduleItem = $('<div class="module-item"></div>');
            const p = $('<p class="module-item-head-title">'+Object.keys(this.data[field])[0]+'</p>');
            moduleItem.append(p);
            if(this.font.length > 0){
                p.css("font-family", this.font);
            }
            _content.append(moduleItem);
        }
    }

    generate_form_input_item(_content, paramCategory, showName){
        const add = $('<span class="add-item">+ '+showName+'</span>').on('click', function(){
            const _form = create_form('module_add_category_' + paramCategory);
            create_input(paramCategory, showName, _form, 'autocomplete', []);
            build_form(_form, 'Ajouter', [], true);
            _form.insertBefore($(this));
        });
        _content.append(add);
    }

    getSeparatorSize(){
        return this.separator_size;
    }

    setSeparatorSize(size){
        this.separator_size = size;
    }

    getSeparatorRadius(){
        return this.separator_radius;
    }

    setSeparatorRadius(radius){
        this.separator_radius = radius;
    }

    getBorderTop(){
        return this.border_top;
    }

    getBorderBottom(){
        return this.border_bottom;
    }

    getBorderLeft(){
        return this.border_left;
    }

    getBorderRight(){
        return this.border_right;
    }

    setBorderTop(val){
        this.border_top = val;
    }

    setBorderBottom(val){
        this.border_bottom = val;
    }

    setBorderLeft(val){
        this.border_left = val;
    }

    setBorderRight(val){
        this.border_right = val;
    }

    getBorderRadius(){
        return this.border_radius;
    }

    setBorderRadius(radius){
        this.border_radius = radius;
    }

    setModeAffichage(mode){
        this.modeAffichage = mode;
    }

    getModeAffichage(){
        return this.modeAffichage;
    }

    setIcon(icon){
        this.icon = icon;
    }

    setFont(font){
        this.font = font;
    }

    refresh(){
        const content = $('#module-' + this.moduleID);
        content.empty();
        console.log(this.moduleName + ' : ');
        console.log(this.data);

        // Global
        const head = $('<div class="head"></div>');
        head.append($('<i class="fa-solid fa-arrows-up-down-left-right draggable"></i>'));

        if(this.icon.length > 0){
            const icon_element = $('<i class="'+this.icon+'"></i>');
            head.append(icon_element);
        }

        if(this.show_title){
            const module_title = $('<h1 class="module-title">'+this.moduleShownName+'</h1>');
            if(this.font.length > 0){
                module_title.css("font-family", this.font);
            }
            head.append(module_title);
        }

        content.append(head);

        if(this.separator_size > 0){
            const separator = $('<div class="module-head-separator"></div>');
            separator.css("width", "100%");
            separator.css("background-color", this.separatorColor);
            separator.css("border-radius", this.separator_radius);
            separator.css("height", this.separator_size + "px");
            content.append(separator);
        }

        content.css("width", this.width + '%');
        content.css("background-color", this.color);
        content.css("color", this.fontColor);
        if(this.border_top > 0 || this.border_bottom > 0 || this.border_left > 0 || this.border_right > 0){
            content.css("border-radius", this.border_radius + "px");
        }

        if(this.border_top > 0){
            content.css("border-top", this.border_top + "px solid");
        }
        if(this.border_bottom > 0){
            content.css("border-bottom", this.border_bottom + "px solid");
        }
        if(this.border_left > 0){
            content.css("border-left", this.border_left + "px solid");
        }
        if(this.border_right > 0){
            content.css("border-right", this.border_right + "px solid");
        }

        const module_items = $('<div class="modules-items"></div>');
        module_items.css("display", "flex");
        if(this.modeAffichage === 1){
            module_items.css("flex-flow", "row wrap");
            module_items.css("justify-content", "space-between");
        }
        else{
            module_items.css("flex-flow", "column nowrap");
        }

        // Modules Informations
        if(this.moduleName === 'Informations'){
            this.generate_onemodule_item(module_items, 'nomprenom', 'Ajouter un nom et prénom', 'text');
            this.generate_onemodule_item(module_items, 'adresse', 'Ajouter une adresse', 'text');
            this.generate_onemodule_item(module_items, 'contratrecherche', 'Ajouter un type de contrat recherché');
            this.generate_onemodule_item(module_items, 'posterecherche', 'Ajouter un poste recherché');
        }

        // Modules personnalisé
        else if(this.moduleName === 'Module personnalisé'){
            this.generate_onemodule_item(module_items, 'contenu', 'Ajouter un contenu', 'textarea');
        }

        // Module Contact
        else if(this.moduleName === 'Contact'){
            this.generate_onemodule_item(module_items, 'email', 'Ajouter une adresse mail', 'text');
            this.generate_onemodule_item(module_items, 'tel', 'Ajouter un numéro de téléphone', 'text');
            this.generate_onemodule_item(module_items, 'linkedin', 'Ajouter un lien LinkedIn', 'text');
            this.generate_onemodule_item(module_items, 'github', 'Ajouter un lien GitHub', 'text');
            this.generate_onemodule_item(module_items, 'portfolio', 'Ajouter un lien vers votre portfolio', 'text');
        }

        // Module Loisirs
        else if(this.moduleName === 'Loisirs') {
            if(this.data.hasOwnProperty('loisirs')){
                Object.keys(this.data['loisirs']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    const p = $('<p class="module-item-head-title">'+key+'</p>');
                    moduleItem.append(p);
                    if(this.font.length > 0){
                        p.css("font-family", this.font);
                    }
                    add_module_item_param(this, moduleItem, 'loisirs', key, 'description', 'Ajouter une description', 'text', false);
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'loisirs', 'Ajouter un loisir');
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
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'expro', 'Ajouter une expérience');
        }

        // Module Expériences perso
        else if(this.moduleName === 'Expériences personnelles') {
            if(this.data.hasOwnProperty('experso')){
                Object.keys(this.data['experso']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    const p = $('<p class="module-item-head-title">'+key+'</p>');
                    moduleItem.append(p);
                    if(this.font.length > 0){
                        p.css("font-family", this.font);
                    }
                    add_module_item_param(this, moduleItem, 'experso', key, 'description', 'Ajouter une description', 'text', false);
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'experso', 'Ajouter une expérience');
        }

        // Module Langues
        else if(this.moduleName === 'Langues') {
            if(this.data.hasOwnProperty('langues')){
                Object.keys(this.data['langues']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    const p = $('<p class="module-item-head-title">'+key+'</p>');
                    moduleItem.append(p);
                    if(this.font.length > 0){
                        p.css("font-family", this.font);
                    }
                    add_module_item_param(this, moduleItem, 'langues', key, 'niveau', 'Ajouter un niveau', 'text', false);
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'langues', 'Ajouter une langue');
        }

        // Module Compétences
        else if(this.moduleName === 'Compétences'){

            if(this.data.hasOwnProperty('competences')){
                Object.keys(this.data['competences']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    const p = $('<p class="module-item-head-title">'+key+'</p>');
                    moduleItem.append(p);
                    if(this.font.length > 0){
                        p.css("font-family", this.font);
                    }
                    add_module_item_param(this, moduleItem, 'competences', key, 'description', 'Ajouter une description', 'text', false);
                    add_module_item_param(this, moduleItem, 'competences', key, 'niveau', 'Ajouter un niveau', 'text', false);
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'competences', 'Ajouter une compétence');
        }

        // Module Formations
        else if(this.moduleName === 'Formations'){

            if(this.data.hasOwnProperty('formations')){
                Object.keys(this.data['formations']).forEach(key => {
                    const moduleItem = $('<div class="module-item"></div>');
                    const p = $('<p class="module-item-head-title">'+key+'</p>');
                    moduleItem.append(p);
                    if(this.font.length > 0){
                        p.css("font-family", this.font);
                    }
                    add_module_item_param(this, moduleItem, 'formations', key, 'description', 'Ajouter une description', 'text', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'secteur', 'Ajouter un secteur', 'autocomplete', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'niveau', 'Ajouter un niveau', 'autocomplete', false);
                    add_module_item_param(this, moduleItem, 'formations', key, 'etablissement', 'Ajouter un établissement', 'autocomplete', false);
                    module_items.append(moduleItem);
                });
            }

            this.generate_form_input_item(module_items, 'formations', 'Ajouter une formation');
        }

        content.append(module_items);
    }
}