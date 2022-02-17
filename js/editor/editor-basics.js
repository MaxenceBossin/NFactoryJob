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
let LAST_LINE_NUM = 1;
let selected_line = null;

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