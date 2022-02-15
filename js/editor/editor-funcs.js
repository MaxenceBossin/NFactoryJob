
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

function refresh_onglets_menu(){
    if(get_selected_module() === null){
        if(!btn_onglet_module.hasClass('disabled')){ btn_onglet_module.addClass('disabled'); }
    }
    else{
        if(btn_onglet_module.hasClass('disabled')){ btn_onglet_module.removeClass('disabled'); }
    }
}

function get_selected_module(){
    return null;
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
        }
    });
    modules.append(add_module);
}

function generate_add_cv_module(parent){
    parent.find('i').fadeOut('fast', function(){
        $(this).remove();
        const form = create_form('editor_add_cv_module');
        create_input('type_module', form, 'select', ['Compétences', 'Formations', 'Module personnalisé', '...']);
        build_form(form, 'Ajouter', [parent], true);
        parent.append(form);
    });
}