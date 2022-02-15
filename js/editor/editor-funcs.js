
let onglet_opened = false;

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
        content_general.empty();
        content_module.empty();
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
        content_module.empty();
        if(selected_module !== null){
            content_module.append('<h1>'+selected_module.getModuleName()+'</h1>');
            let items = selected_module.getSection().countModules();
            if(items < 1){
                items = 1;
            }
            const maxWidth = 100 / items;
            const largeur_input = create_input('largeur', 'Largeur du module', null, 'slider', [maxWidth, 20, 100]);
            largeur_input.on('input', function(){
                $('#module-' + selected_module.getModuleID()).css("width", parseInt($(this).val()) + '%');
            });
            content_module.append(largeur_input);
        }
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
    open_onglet('module');
}

function is_onglet_opened(){
    return onglet_opened;
}

function place_add_module(){
    if($('#add-module').length){
        $('#add-module').remove();
    }
    if($('#add-section').length){
        $('#add-section').remove();
    }

    const add_module = $('<div id="add-module" class="module add"><h1 class="add-block-title">Ajouter un module</h1><i class="fa-solid fa-plus"></i></div>');
    add_module.on('click', function(){
        if(!$(this).hasClass('generated')){
            $(this).addClass('generated');
            generate_add_cv_module($(this));
            close_onglet();
        }
    });

    let _section = get_selected_section();
    if(_section === null || _section.countModules() + 1 > _section.getMaxModules()){
        _section = create_section(2);
        _section.getDOMElement().append(add_module);
    }
    else{
        _section.getDOMElement().append(add_module);
    }

    const add_section = $('<section id="add-section" class="module-section"><div class="module add"><h1 class="add-block-title">Ajouter une section</h1><i class="fa-solid fa-plus"></i></div></section>');
    add_section.on('click', function(){

    });

    modules.append(add_section);
}

function generate_add_cv_module(parent){
    parent.find('.add-block-title').fadeOut('fast', function(){
        $(this).remove();
    });
    parent.find('i').fadeOut('fast', function(){
        $(this).remove();
        const form = create_form('editor_add_cv_module');

        let items = ['Compétences', 'Formations', 'Module personnalisé'];
        let fItems = [];
        let found = false;
        items.forEach(function(item){
            found = false;
            modules_el.forEach(function(el){
                if(item === el.getModuleName()){
                    found = true;
                }
            });
            if(!found || item === 'Module personnalisé'){
                fItems.push(item);
            }
        });

        create_input('type_module', 'Type de module', form, 'select', fItems);
        build_form(form, 'Ajouter', [parent], true);
        parent.append(form);
    });
}

function get_module_element_id(module_element){
    const splitted_module = module_element.attr('id').split('-');
    return parseInt(splitted_module[1]);
}

function get_section_by_num(_num){
    for(let i=0;i<sections_el.length;i++){
        if(sections_el[i] != null && sections_el[i].getSectionNum() === _num){
            return sections_el[i];
        }
    }
    return null;
}

function get_selected_section(){
    return selected_section;
}

function create_section(maxModules, _num = -1){

    if(_num === -1){
        _num = LAST_SECTION_NUM;
    }

    const sectionElement = $('<section class="module-section"></section>');
    modules.append(sectionElement);
    let _section = new Section(_num, maxModules, sectionElement);
    if(_num + 1 > LAST_SECTION_NUM){
        LAST_SECTION_NUM = _num + 1;
    }
    sections_el.push(_section);
    selected_section = _section;
    return _section;
}

function create_module(moduleID, moduleName){
    const module = $('<div id="module-'+moduleID+'" class="module"></div>').on('click', function() {
        const _module = get_module_by_ID(get_module_element_id($(this)));
        if (_module !== null) {
            select_module(_module);
        }
    });
    const module_title = $('<h1 class="module-title">'+moduleName+'</h1>');

    module.append(module_title);
    let _module = new Module(moduleID, moduleName);
    modules_el.push(_module);

    let _section = get_selected_section();
    if(_section === null || _section.countModules() + 1 > _section.getMaxModules()){
        _section = create_section(2);
        _section.getDOMElement().append(module);
    }
    else{
        _section.getDOMElement().append(module);
    }
    _section.addModule(_module);
    _module.setSection(_section);
    return _module;
}