
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

function get_new_available_module_id(){
    let idx = 1;
    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] !== null && modules_el[i].getModuleID() >= idx){
            idx = modules_el[i].getModuleID() + 1;
        }
    }
    return idx;
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

    const moduleBDDID = _module.getModuleBDDID();
    ajax('cv_destroy_module', SITE_URL + 'api/cvdeletemodule', {
        bddid: moduleBDDID
    });

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

function refresh_all_modules(){
    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] !== null){
            modules_el[i].refresh();
        }
    }
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
    onglet.css("right", "-" + onglet.css('width'));
    onglet_opened = false;
    btn_i.fadeOut('fast', function(){
        btn_i.attr('class', 'fa-solid fa-arrow-left');
        btn_i.fadeIn('fast');
    });
    content_module.empty();
    content_general.empty();
    content_general.css("display", "none");
    content_module.css("display", "none");
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

function place_add_module(deploy_last_module = false){
    $('.module.add').each(function(){
       $(this).remove();
    });
    if($('#add-line').length){
        $('#add-line').remove();
    }

    if(!$('.module-line').length){
        create_line();
    }

    let last_module = null;
    $('.module-line').each(function(){
        const line_id = parseInt($(this).attr('id').split('-')[1]);
        const line = get_line_by_num(line_id);
        if(line !== null && line.countModules() < Line.IDEAL_NB_MODULES && line.getDOMElement().attr('id') !== 'add-line'){
            const add_module = $('<div data-line="'+line_id+'" class="module add"><h1 class="add-block-title">Ajouter un module</h1><i class="fa-solid fa-plus"></i></div>');
            add_module.on('click', function(){
                if(!$(this).hasClass('generated')){
                    $(this).addClass('generated');
                    generate_add_cv_module($(this));
                }
            });

            $(this).append(add_module);
            last_module = add_module;
        }
    });

    if(deploy_last_module && last_module !== null){
        last_module.addClass('generated');
        generate_add_cv_module(last_module);
    }

    const last_line = get_last_line();
    if(last_line !== null && last_line.countModules() > 0){
        const add_line = $('<section id="add-line" class="module-line"></section>');
        const add_line_module = $('<div class="module add"><h1 class="add-block-title">Ajouter une section</h1><i class="fa-solid fa-plus"></i></div>');
        add_line.append(add_line_module);
        add_line_module.on('click', function(){
            create_line();
            place_add_module(true);
        });

        modules.append(add_line);
    }
}

function get_last_line(){
    let _line = null;
    let nb = -1;
    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] !== null && lines_el[i].getLineNum() > nb && lines_el[i].getDOMElement().attr('id') !== 'add-line'){
            _line = lines_el[i];
            nb = lines_el[i].getLineNum();
        }
    }
    return _line;
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
    else if(el.attr('id').startsWith('fontcolor_module_')){
        let _data = el.attr('id').split('_');
        const _module = get_module_by_ID(parseInt(_data[2]));
        if(_module != null){
            _module.setFontColor(el.val());
            _module.refresh();
            editor_request_save();
        }
    }
    else if(el.attr('id').startsWith('separator_module_')){
        let _data = el.attr('id').split('_');
        const _module = get_module_by_ID(parseInt(_data[2]));
        if(_module != null){
            _module.setSeparatorColor(el.val());
            _module.refresh();
            editor_request_save();
        }
    }
    else if(el.attr('id').startsWith('border_col_')){
        let _data = el.attr('id').split('_');
        const _module = get_module_by_ID(parseInt(_data[2]));
        if(_module != null){
            _module.setBordersColor(el.val());
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
            ['Icône', false],
            ['Informations', true],
            ['Langues', true],
            ['Loisirs', true],
            ['Module personnalisé', false],
            ['Image', false]
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

function create_line(_num = -1){
    if(_num <= 0){
        _num = get_new_available_line_num();
    }

    const lineElement = $('<section id="line-'+_num+'" class="module-line"><span class="line-title">Section '+ _num +'</span></section>');
    modules.append(lineElement);
    let _line = new Line(_num);
    lines_el.push(_line);
    place_add_module();
    return _line;
}

function create_module(moduleID, moduleName, _width = 50, _lineNum = -1, fromLoad = false){

    if(moduleName.length === 0){
        return;
    }

    if(_lineNum === -1 && get_last_line() !== null){
        _lineNum = get_last_line().getLineNum();
    }

    const module = $('<div id="module-'+moduleID+'" class="module"></div>');

    let _module = new Module(moduleID, moduleName);
    modules_el.push(_module);

    let _line = get_line_by_num(_lineNum);
    if(_line === null || (_line.countModules() + 1 > Line.IDEAL_NB_MODULES && !fromLoad)){
        if(fromLoad){
            _line = create_line(_lineNum);
        }
        else{
            _line = create_line();
        }
        _line.getDOMElement().append(module);
    }
    else{
        _line.getDOMElement().append(module);
    }
    _line.addModule(_module);
    _module.setLine(_line);
    _module.setLargeur(_width);
    _module.refresh();
    place_add_module();
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

    if(READONLY){
        return;
    }

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
                do_save();
            }, 300);
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
            const span = $('<span class="add-item pad-1">+ ' + showText + '</span>');
            span.unbind('click');
            span.on('click', function () {
                const _form = create_form('module_item_add_' + paramCategory + '_' + paramName);
                create_input(paramName, showText, _form, type, _data);
                build_form(_form, 'Ajouter', [paramItem], removable_form);
                _form.insertBefore($(this));
                if (removable_form) {
                    $(this).remove();
                }
            });
            moduleItem.append(span);
        } else {
            moduleItem.append($('<p class="desc">' + _moduleData[paramCategory][paramItem][paramName] + '</p>'));
        }
    }
}

function do_save(){

    if(READONLY){
        return;
    }

    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] !== null){

            ajax('cv_save_module', SITE_URL + 'api/cvSaveModule', {
                moduleid: modules_el[i].getModuleID(),
                name: modules_el[i].getModuleName(),
                showName: modules_el[i].getModuleShownName(),
                line: modules_el[i].getLine().getLineNum(),
                width: modules_el[i].getLargeur(),
                color: modules_el[i].getColor(),
                fontColor: modules_el[i].getFontColor(),
                separatorColor: modules_el[i].getSeparatorColor(),
                data: JSON.stringify(modules_el[i].getData()),
                showTitle: + modules_el[i].getShowTitle(),
                separatorSize: modules_el[i].getSeparatorSize(),
                separatorRadius: modules_el[i].getSeparatorRadius(),
                borderTop: modules_el[i].getBorderTop(),
                borderBottom: modules_el[i].getBorderBottom(),
                borderRight: modules_el[i].getBorderRight(),
                borderLeft: modules_el[i].getBorderLeft(),
                borderRadius: modules_el[i].getBorderRadius(),
                modeAffichage: modules_el[i].getModeAffichage(),
                icon: modules_el[i].getIcon(),
                font: modules_el[i].getFont(),
                profilePic: modules_el[i].getProfilePic(),
                iconSize: modules_el[i].getIconSize(),
                iconRadius: modules_el[i].getIconRadius(),
                bddid: modules_el[i].getModuleBDDID(),
                idcv: CV_ID
            });
        }
    }

    setTimeout(function(){
        ajax('cv_save', SITE_URL + 'api/cvSave', {
            title: CV.getTitle(),
            color: CV.getColor(),
            idcv : CV_ID
        });
    }, 1000);
}

function on_save_end(){
    save_notif_text.text('Sauvegarde effectuée');
    const i = $('<i class="fa-solid fa-check"></i>');
    save_notif_text.append(i);
    i.fadeOut('fast');
    i.fadeIn('fast');
    save_en_cours = false;
    close_save_notif();
}