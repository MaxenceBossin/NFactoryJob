const onglet = $('#onglet_editor');
const content_general = $('#onglet_editor .content-general');
const content_module = $('#onglet_editor .content-module');
const btn_i = $('#btn-onglet i');
let modules = $('#cv .modules');
const btn_onglet_general = $('#onglet_editor #btn-onglet-general');
const btn_onglet_module = $('#onglet_editor #btn-onglet-module');
const save_notif = $('#save-notif');
const save_notif_text = $('#save-notif p');

let modules_el = [];
let lines_el = [];
let selected_module = null;

let drag_module = null;
let currentMousePos = { x: -1, y: -1 };
let lastDragMousePos = null;

let generating_pdf = false;

// Todo

$( document ).ready(function() {
    open_onglet();
    close_save_notif();
    place_add_module();
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
            drag_module = $(e.target).parent().parent();
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
            if(over_element.hasClass('module-line') && over_element.attr('id') !== 'add-line'){
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
                        drag_module.appendTo($("#line-" + _section.getLineNum()));
                        refresh_onglets_menu();
                        place_add_module();
                    }
                }
            }
        }
        drag_module.css("position", "relative");
        drag_module.css("top", "0");
        drag_module.css("left", "0");
    }
    drag_module = null;
});