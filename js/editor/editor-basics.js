const onglet = $('#onglet_editor');
const content = $('#onglet_editor .content');
const btn_i = $('#btn-onglet i');
const modules = $('#cv .modules');

$( document ).ready(function() {
    open_onglet();
    place_add_module();
});

$('#btn-onglet').on('click', function(){
    if(is_onglet_opened()){
        close_onglet();
    }
    else{
        open_onglet();
    }
});