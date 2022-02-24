const onglet = $('#onglet_editor');
const content_general = $('#onglet_editor .content-general');
const content_module = $('#onglet_editor .content-module');
const btn_i = $('#btn-onglet i');
let modules = $('#cv .modules');
const btn_onglet_general = $('#onglet_editor #btn-onglet-general');
const btn_onglet_module = $('#onglet_editor #btn-onglet-module');
const save_notif = $('#save-notif');
const save_notif_text = $('#save-notif p');
const quit_preview = $('#quit-preview');

let modules_el = [];
let lines_el = [];
let selected_module = null;

let drag_module = null;
let currentMousePos = { x: -1, y: -1 };
let lastDragMousePos = null;

let generating_pdf = false;
let preview_save = null;
let preview_mode = false;

let icons = [];
let fonts = [];

// Todo

$( document ).ready(function() {
    show_loading();
    ajax('all_icons', THEME_URL + 'ajax/editor/get_icons.php', {});
    ajax('all_fonts', THEME_URL + 'ajax/editor/get_google_fonts.php', {});
    api_load_all();
    ajax('cv_load', SITE_URL + 'api/cvLoad/?idcv=' + CV_ID, {});
});

btn_onglet_general.on('click', function(){
    open_onglet('general');
});

btn_onglet_module.on('click', function(){
    open_onglet('module');
});

$('#btn-onglet').on('click', function(){
    if(is_onglet_opened()){
        close_onglet();
    }
    else{
        open_onglet();
    }
});

$(document).on('mousemove', function(e){
    if(drag_module !== null){
        drag_module.css("position", 'fixed');
        drag_module.css("top", currentMousePos.y + "px");
        drag_module.css("left", (currentMousePos.x + 10) + "px");
    }

    currentMousePos.x = e.pageX;
    currentMousePos.y = e.pageY;
});

$(document).on('mousedown', function(e){
    if($(e.target).hasClass('draggable')){
        if(drag_module !== $(e.target).parent().parent()){
            lastDragMousePos = currentMousePos;
            if(!$('body').hasClass('noselect')){
                $('body').addClass('noselect');
            }
            $('body').css("cursor", "move");
            const width = $(e.target).parent().parent().css("width");
            const height = $(e.target).parent().parent().css("height");
            drag_module = $(e.target).parent().parent();
            drag_module.css("position", 'fixed');
            drag_module.css("width", width);
            drag_module.css("height", height);
            drag_module.css("z-index", "20");
        }
    }
});

$(document).on('mouseup', function(e){
    if($('body').hasClass('noselect')){
        $('body').removeClass('noselect');
    }
    $('body').css("cursor", "default");

    if(drag_module !== null){
        const over_element = $(e.target);

        if(over_element !== undefined && (over_element.hasClass('module') || over_element.hasClass('module-line'))){
            let _section = null;
            // Module
            if(over_element.hasClass('module') && over_element !== drag_module){
                if(over_element.hasClass('add')){
                    const _line = get_line_by_num(parseInt(over_element.parent().attr('id').split('-')[1]));
                    if(_line !== null){
                        _section = _line;
                    }
                }
                else{
                    const _module = get_module_by_ID(parseInt(over_element.attr('id').split('-')[1]));
                    if(_module !== null){
                        _section = _module.getLine();
                    }
                }
            }
            // Section
            if(_section === null && over_element.hasClass('module-line') && over_element.attr('id') !== 'add-line'){
                const _line = get_line_by_num(parseInt(over_element.attr('id').split('-')[1]));
                if(_line !== null){
                    _section = _line;
                }
            }

            if(_section !== null){
                const actualModule = get_module_by_ID(parseInt(drag_module.attr('id').split('-')[1]));
                if(actualModule !== null){
                    const actualModuleSection = actualModule.getLine();
                    if(actualModuleSection !== null){
                        actualModuleSection.removeModule(actualModule);
                        _section.addModule(actualModule);
                        actualModule.setLine(_section);
                        actualModule.setModuleID(get_new_available_module_id());
                        drag_module.appendTo($("#line-" + _section.getLineNum()));
                        refresh_onglets_menu();
                        place_add_module();
                        editor_request_save();
                    }
                }
            }
        }
        drag_module.css("z-index", "2");
        drag_module.css("position", "relative");
        drag_module.css("top", "0");
        drag_module.css("left", "0");
        const targettedModule = get_module_by_ID(parseInt(drag_module.attr('id').split('-')[1]));
        if(targettedModule !== null){
            drag_module.css("width", targettedModule.getLargeur() + '%');
            drag_module.css("height", 'auto');
        }
    }
    drag_module = null;
});

$('#quit-preview button').on('click', function(){
    if(preview_mode && preview_save !== null){
        const preview = $('#preview-infos');
        $('#preview-infos .content').empty();
        preview.css("display", "block");
        append_preview('Mise à jour de l\'éditeur');
        $('#cv .wrap_cv .modules').remove();
        $('#cv .wrap_cv').append(preview_save);
        setTimeout(function(){
            $('#save-notif').css("display", "block");
            $('#onglet_editor').css("display", "block");
            quit_preview.css("bottom", "-100px");
            append_preview('Mise à jour terminée', true);
            setTimeout(function(){
                previewMode = false;
                refresh_all_modules();
                modules = $('#cv .modules');
                place_add_module();
                generating_pdf = false;
                preview.fadeOut('fast', function(){
                    preview.css("display", "none");
                });
            }, 1000);
        }, 1500);
    }
})