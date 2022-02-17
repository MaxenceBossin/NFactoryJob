
// Général
function refresh_general_content(){
    content_module.css("display", "none");
    content_general.empty();
    content_general.css("display", "flex");

    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] != null){
            content_general.append($('<p>Ligne '+lines_el[i].getLineNum()+'</p>'));
        }
    }

    let _input;

    _input = create_input('back-color', 'Couleur de fond du CV', content_general, 'colorpicker', [CV.getColor()]);
    _input.on('input change', function(){
        CV.setColor($(this).val());
        CV.refresh();
        editor_request_save();
    });

    content_general.append($('<p>Profitez de toutes les fonctionnalités de l\'éditeur et d\'une personnalisation complète de votre CV en créant un compte gratuitement !</p>'));
    content_general.append($('<button class="btn blue" id="create-account">Créer un compte</button>'));

    content_general.append($('<button class="btn red" id="export-pdf">Exporter mon CV en PDF</button>'));
}

// Module
function refresh_module_content(){
    content_general.css("display", "none");
    content_module.empty();
    content_module.css("display", "flex");
    if(selected_module === null){
        return;
    }

    content_module.append($('<h1>'+selected_module.getModuleName()+'</h1>'));

    if(selected_module.getModuleName() === "Module personnalisé"){
        create_input('nom_module', 'Nom du module', content_module, 'text', [$('#module-' + selected_module.getModuleID() + ' h1.module-title').text()]).on('input', function(){
            const _module = get_selected_module();
            if(_module != null){
                _module.setModuleShownName($(this).val());
            }
            $('#module-' + selected_module.getModuleID() + ' h1.module-title').text($(this).val());
            editor_request_save();
        });
    }

    let _input;

    _input = create_input('back_module_' + selected_module.getModuleID(), 'Couleur de fond du module', content_module, 'colorpicker', [selected_module.getColor()]);
    _input.on('input change', function(){
        selected_module.setColor($(this).val());
        selected_module.refresh();
        editor_request_save();
    });

    create_input('largeur', 'Largeur du module', content_module, 'slider', [$('#module-' + selected_module.getModuleID()).attr("data-width"), 20, 100, '%']).on('input', function(){
        $('#module-' + selected_module.getModuleID()).css("width", parseInt($(this).val()) + '%');
        $('#module-' + selected_module.getModuleID()).attr('data-width', parseInt($(this).val()));
        editor_request_save();
    });
}