
// Général
function refresh_general_content(){
    content_module.css("display", "none");
    content_general.empty();
    content_general.css("display", "flex");
}

// Module
function refresh_module_content(){
    content_general.css("display", "none");
    content_module.empty();
    content_module.css("display", "flex");
    if(selected_module === null){
        return;
    }

    create_input('nom_module', 'Nom du module', content_module, 'text', [$('#module-' + selected_module.getModuleID() + ' h1.module-title').text()]).on('input', function(){
        $('#module-' + selected_module.getModuleID() + ' h1.module-title').text($(this).val());
        editor_request_save();
    });

    create_input('largeur', 'Largeur du module', content_module, 'slider', [$('#module-' + selected_module.getModuleID()).attr("data-width"), 20, 100, '%']).on('input', function(){
        $('#module-' + selected_module.getModuleID()).css("width", parseInt($(this).val()) + '%');
        $('#module-' + selected_module.getModuleID()).attr('data-width', parseInt($(this).val()));
        editor_request_save();
    });
}