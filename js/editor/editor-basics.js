const onglet = $('#onglet_editor');
const content_general = $('#onglet_editor .content-general');
const content_module = $('#onglet_editor .content-module');
const btn_i = $('#btn-onglet i');
const modules = $('#cv .modules');
const btn_onglet_general = $('#onglet_editor #btn-onglet-general');
const btn_onglet_module = $('#onglet_editor #btn-onglet-module');
const save_notif = $('#save-notif');
const save_notif_text = $('#save-notif p');

let modules_el = [];
let lines_el = [];
let selected_module = null;
let LAST_MODULE_ID = 1;
let selected_line = null;

let drag_module = null;
let currentMousePos = { x: -1, y: -1 };
let lastDragMousePos = null;

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

$(document).on('mouseup', function(){
    if($('body').hasClass('noselect')){
        $('body').removeClass('noselect');
    }
    $('body').css("cursor", "default");

    if(drag_module !== null){
        drag_module.css("position", "relative");
        drag_module.css("top", "0");
        drag_module.css("left", "0");
        const _module = get_module_by_ID(parseInt(drag_module.attr('id').split('-')[1]));
        if(_module !== null){
            const _line = _module.getLine();
            if(_line !== null){

            }
        }
    }
    drag_module = null;
});