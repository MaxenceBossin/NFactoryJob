const onglet = $('#onglet_editor');
const content_general = $('#onglet_editor .content-general');
const content_module = $('#onglet_editor .content-module');
const btn_i = $('#btn-onglet i');
const modules = $('#cv .modules');
const btn_onglet_general = $('#onglet_editor #btn-onglet-general');
const btn_onglet_module = $('#onglet_editor #btn-onglet-module');

$( document ).ready(function() {
    open_onglet();
    place_add_module();
});

btn_onglet_general.on('click', function(){
    open_onglet('general');
});

btn_onglet_general.on('click', function(){
    open_onglet('general');
});

$('#btn-onglet').on('click', function(){
    if(is_onglet_opened()){
        close_onglet();
    }
    else{
        open_onglet();
    }
});