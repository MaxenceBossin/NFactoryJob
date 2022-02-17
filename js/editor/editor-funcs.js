
let onglet_opened = false;
let save_request = null;
let save_en_cours = false;

function open_onglet(ongletName = 'module'){
    onglet.css("right", "0vw");
    if(!onglet_opened){
        onglet_opened = true;
        btn_i.fadeOut('fast', function(){
            btn_i.attr('class', 'fa-solid fa-arrow-right');
            btn_i.fadeIn('fast');
        });
    }

    if(ongletName === 'module' && get_selected_module() == null){
        ongletName = 'general';
    }

    if(get_selected_menu_onglet() !== ongletName){
        if(ongletName === 'general'){
            if(!btn_onglet_general.hasClass('selected')){ btn_onglet_general.addClass('selected'); }
            if(btn_onglet_module.hasClass('selected')){ btn_onglet_module.removeClass('selected'); }
        }
        else if(ongletName === 'module'){
            if(btn_onglet_general.hasClass('selected')){ btn_onglet_general.removeClass('selected'); }
            if(!btn_onglet_module.hasClass('selected')){ btn_onglet_module.addClass('selected'); }
        }
    }

    refresh_onglets_menu();
}

function get_new_available_line_num(){
    let idx = 1;
    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] !== null && lines_el[i].getLineNum() >= idx){
            idx = lines_el[i].getLineNum() + 1;
        }
    }
    return idx;
}

function destroy_module(_module){
    if(_module === null){
        return;
    }

    if(selected_module !== null && selected_module.getModuleID() === _module.getModuleID()){
        unselect_module();
    }

    const _line = _module.getLine();
    if(_line !== null){
        _line.removeModule(_module);
    }

    const element = $('#module-' + _module.getModuleID());
    if(element !== undefined){
        element.remove();
    }
    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] !== null && modules_el[i].getModuleID() === _module.getModuleID()){
            modules_el.splice(i, 1);
            break;
        }
    }

    place_add_module();
    refresh_onglets_menu();
}

function destroy_section(_section){
    if(_section === null){
        return;
    }
    const _sectionElement = _section.getDOMElement();
    const _modules = _section.getModules();
    if(_modules !== null && _modules.length > 0){
        for(let i=0;i<_modules.length;i++){
            if(_modules[i] !== null){
                destroy_module(_modules[i]);
            }
        }
    }

    if(_sectionElement !== undefined){
        _sectionElement.remove();
    }

    if(selected_line !== null && selected_line.getLineNum() === _section.getLineNum()){
        if(lines_el.length-1 >= 0) {
            for (let i = lines_el.length - 1; i >= 0; i--) {
                if (lines_el[i] !== null && lines_el[i].getLineNum() !== _section.getLineNum()) {
                    selected_line = lines_el[i];
                    break;
                }
            }
        }
        else{
            selected_line = create_line(2,1);
        }
    }

    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] !== null && lines_el[i].getLineNum() === _section.getLineNum()){
            lines_el.splice(i, 1);
            break;
        }
    }

    place_add_module();
    refresh_onglets_menu();
}

function get_line_by_num(_num){
    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] != null && lines_el[i].getLineNum() === _num){
            return lines_el[i];
        }
    }
    return null;
}

function get_module_by_ID(_id){
    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] != null && modules_el[i].getModuleID() === _id){
            return modules_el[i];
        }
    }
    return null;
}

function refresh_onglets_menu(){
    if(get_selected_module() === null){
        if(!btn_onglet_module.hasClass('disabled')){ btn_onglet_module.addClass('disabled'); }
    }
    else{
        if(btn_onglet_module.hasClass('disabled')){ btn_onglet_module.removeClass('disabled'); }
    }

    if(btn_onglet_module.hasClass("selected")){
        refresh_module_content();
    }
    else{
        refresh_general_content();
    }
}

function get_selected_module(){
    return selected_module;
}

function get_selected_menu_onglet(){
    if(btn_onglet_general.hasClass('selected')){
        return 'general';
    }
    return 'module';
}

function close_onglet(){
    onglet.css("right", "-35vw");
    onglet_opened = false;
    btn_i.fadeOut('fast', function(){
        btn_i.attr('class', 'fa-solid fa-arrow-left');
        btn_i.fadeIn('fast');
    });
}

function unselect_module(){
    if(selected_module !== null){
        if($('#module-' + selected_module.getModuleID()).hasClass("selected")){
            $('#module-' + selected_module.getModuleID()).removeClass("selected")
        }
        selected_module = null;
    }
}

function select_module(module_el){
    if(module_el === selected_module){
        return;
    }
    if(selected_module !== null){
        unselect_module();
    }
    if(module_el === null){
        return;
    }
    if(!$('#module-' + module_el.getModuleID()).hasClass("selected")){
        $('#module-' + module_el.getModuleID()).addClass("selected");
    }
    selected_module = module_el;
}

function is_onglet_opened(){
    return onglet_opened;
}

function place_add_module(){
    if($('#add-module').length){
        $('#add-module').remove();
    }
    if($('#add-line').length){
        $('#add-line').remove();
    }

    const add_module = $('<div id="add-module" class="module add"><h1 class="add-block-title">Ajouter un module</h1><i class="fa-solid fa-plus"></i></div>');
    add_module.on('click', function(){
        if(!$(this).hasClass('generated')){
            $(this).addClass('generated');
            generate_add_cv_module($(this));
            close_onglet();
        }
    });

    let _line = get_selected_line();
    if(_line === null || _line.countModules() + 1 > _line.getMaxModules()){
        _line = create_line(2);
        _line.getDOMElement().append(add_module);
    }
    else{
        _line.getDOMElement().append(add_module);
    }

    const add_line = $('<section id="add-line" class="module-line"><div class="module add"><h1 class="add-block-title">Ajouter une section</h1><i class="fa-solid fa-plus"></i></div></section>');
    add_line.on('click', function(){

    });

    modules.append(add_line);
}

function on_color_update(el){

    if(el.attr('id').startsWith('back_module_')){
        let _data = el.attr('id').split('_');
        const _module = get_module_by_ID(parseInt(_data[2]));
        if(_module != null){
            _module.setColor(el.val());
            _module.refresh();
            editor_request_save();
        }
    }

    if(el.attr('id') === 'back-color'){
        CV.setColor(el.val());
        CV.refresh();
        editor_request_save();
    }
}

function generate_add_cv_module(parent){
    parent.find('.add-block-title').fadeOut('fast', function(){
        $(this).remove();
    });
    parent.find('i').fadeOut('fast', function(){
        $(this).remove();
        const form = create_form('editor_add_cv_module');

        // Nom du module - Unique?
        let items = [
            ['Compétences', true],
            ['Contact', true],
            ['Expériences personnelles', true],
            ['Expériences professionnelles', true],
            ['Formations', true],
            ['Icône (inactif)', false],
            ['Informations', true],
            ['Langues', true],
            ['Loisirs', true],
            ['Module personnalisé', false],
            ['Photo de profil (inactif)', false]
        ];
        let fItems = [];
        let found = false;
        items.forEach(function(item){
            found = false;
            modules_el.forEach(function(el){
                if(item[0] === el.getModuleName()){
                    found = true;
                }
            });
            if(!found || !item[1]){
                fItems.push(item[0]);
            }
        });

        create_input('type_module', 'Type de module', form, 'select', fItems);
        build_form(form, 'Ajouter', [parent], false);
        parent.append(form);
    });
}

function get_module_element_id(module_element){
    const splitted_module = module_element.attr('id').split('-');
    return parseInt(splitted_module[1]);
}

function get_selected_line(){
    return selected_line;
}

function create_line(maxModules, _num = -1){

    if(_num <= 0){
        _num = get_new_available_line_num();
    }

    const lineElement = $('<section id="line-'+_num+'" class="module-line"><span class="line-title">Section '+ _num +'</span></section>');
    modules.append(lineElement);
    let _line = new Line(_num, maxModules, lineElement);
    lines_el.push(_line);
    selected_line = _line;
    return _line;
}

function create_module(moduleID, moduleName, _width = 50){
    const module = $('<div id="module-'+moduleID+'" class="module"></div>').on('click', function() {
        const _module = get_module_by_ID(get_module_element_id($(this)));
        if (_module !== null) {
            select_module(_module);
            refresh_onglets_menu();
        }
    });

    let _module = new Module(moduleID, moduleName);
    modules_el.push(_module);

    let _line = get_selected_line();
    if(_line === null || _line.countModules() + 1 > _line.getMaxModules()){
        _line = create_line(2);
        _line.getDOMElement().append(module);
    }
    else{
        _line.getDOMElement().append(module);
    }
    _line.addModule(_module);
    _module.setLine(_line);
    _module.setWidth(_width);
    _module.refresh();
    return _module;
}

function close_save_notif(){
    if(save_request != null){
        clearTimeout(save_request);
    }

    save_request = setTimeout(function(){
        save_notif.css("bottom", "-100px");
    }, 1000);
}

function editor_request_save() {
    if (save_request != null) {
        clearTimeout(save_request);
    }
    save_en_cours = true;
    save_request = setTimeout(function () {
        save_request = setTimeout(function () {
            save_notif.css("bottom", "10px");
            save_notif_text.empty();
            save_notif_text.text('Sauvegarde en cours ...');
            save_request = setTimeout(function () {
                save_notif_text.text('Sauvegarde effectuée');
                const i = $('<i class="fa-solid fa-check"></i>');
                save_notif_text.append(i);
                i.fadeOut('fast');
                i.fadeIn('fast');
                save_en_cours = false;
                close_save_notif();
            }, 1000);
        }, 500);
    }, 1000);
}

function add_module_item_global(parent, showName, paramCategory, removable_form = false, _data = [], _type = 'autocomplete'){
    const add = $('<span class="add-item">+ '+showName+'</span>').on('click', function(){
        const _form = create_form('module_add_category_' + paramCategory);
        create_input(paramCategory, showName, _form, _type, _data);
        build_form(_form, 'Ajouter', [], removable_form);
        _form.insertBefore($(this));
        if (removable_form) {
            $(this).remove();
        }
    });
    parent.append(add);
}

function add_module_item_param(module, moduleItem, paramCategory, paramItem, paramName, showText, type = 'autocomplete', removable_form = false, _data = []){
    let _moduleData = module.getData();
    if(_moduleData.hasOwnProperty(paramCategory)) {
        if (!_moduleData[paramCategory].hasOwnProperty(paramItem) || !_moduleData[paramCategory][paramItem].hasOwnProperty(paramName) || _moduleData[paramCategory][paramItem][paramName].length === 0) {
            const add_param = $('<span class="add-item pad-1">+ ' + showText + '</span>').on('click', function () {
                const _form = create_form('module_item_add_' + paramCategory + '_' + paramName);
                create_input(paramName, showText, _form, type, _data);
                build_form(_form, 'Ajouter', [paramItem], removable_form);
                _form.insertBefore($(this));
                if (removable_form) {
                    $(this).remove();
                }
            });
            moduleItem.append(add_param);
        } else {
            moduleItem.append($('<p class="desc">' + _moduleData[paramCategory][paramItem][paramName] + '</p>'));
        }
    }
}