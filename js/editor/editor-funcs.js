
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

function get_module_by_element(el){
    for(let i=0;i<modules_el.length;i++){
        if(modules_el[i] != null && modules_el[i].getModuleElement() === el){
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
        if(selected_module.getModuleElement().hasClass("selected")){
            selected_module.getModuleElement().removeClass("selected")
        }
        selected_module = null;
    }
}

function select_module(module_el){
    if(selected_module !== null){
        unselect_module();
    }
    if(module_el === null){
        return;
    }
    if(!module_el.getModuleElement().hasClass("selected")){
        module_el.getModuleElement().addClass("selected")
    }
}

function is_onglet_opened(){
    return onglet_opened;
}

function place_add_module(){
    if($('#add-module').length){
        $('#add-module').remove();
    }
    const add_module = $('<div id="add-module" class="module add"><i class="fa-solid fa-plus"></i></div>');
    add_module.on('click', function(){
        if(!$(this).hasClass('generated')){
            $(this).addClass('generated');
            generate_add_cv_module($(this));
            close_onglet();
        }
    });
    modules.append(add_module);
}

function generate_add_cv_module(parent){
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

        create_input('type_module', form, 'select', fItems);
        build_form(form, 'Ajouter', [parent], true);
        parent.append(form);
    });
}

function create_module(moduleName){
    const module = $('<div class="module"></div>');
    const module_title = $('<h1 class="module-title">'+moduleName+'</h1>');

    module.append(module_title);
    let _module = new Module(-1, moduleName, module);
    modules_el.push(_module);
    modules.append(module);
    return _module;
}