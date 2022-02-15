
let onglet_opened = false;

function open_onglet(){
    onglet.css("right", "0vw");
    onglet_opened = true;
    btn_i.fadeOut('fast', function(){
        btn_i.attr('class', 'fa-solid fa-arrow-right');
        btn_i.fadeIn('fast');
    });
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
            $(this).empty();
            $(this).addClass('generated');
            generate_add_cv_module($(this));
        }
    });
    modules.append(add_module);
}

function generate_add_cv_module(parent){
    const form = create_form('add_cv_module');

    form.append(parent);
}