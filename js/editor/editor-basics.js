const onglet = $('#onglet_editor');
const content_general = $('#onglet_editor .content-general');
const content_module = $('#onglet_editor .content-module');
const btn_i = $('#btn-onglet i');
const modules = $('#cv .modules');
const btn_onglet_general = $('#onglet_editor #btn-onglet-general');
const btn_onglet_module = $('#onglet_editor #btn-onglet-module');

let modules_el = [];
let sections_el = [];
let selected_module = null;
let LAST_MODULE_ID = 1;
let LAST_SECTION_NUM = 1;
let selected_section = null;

// Todo
// pouvoir mettre 1,2,3,4 modules max (par ligne)
// créer automatiquement les sections et répartir les modules dans les bonnes sections selon la taille de chaque module
// section => nowrap

$( document ).ready(function() {
    open_onglet();
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