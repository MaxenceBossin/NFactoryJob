
function on_ajax_response(name, json){
    if(name.startsWith('apiload_')){
        const key = name.split('_')[1];
        api_data[key] = json;
        on_api_loaded();
    }

    else if(name === 'all_icons'){
        icons = json;
        on_api_loaded();
    }

    else if(name === 'all_fonts'){
        fonts = json;
        on_api_loaded();
    }

    else if(name === 'dashboard_refresh'){
        dashboard_refresh(json);
    }

    else if(name === 'cv_save'){
        cv_save(json);
    }

    else if(name === 'cv_load'){
        cv_load(json);
    }
}

function cv_load(json){

    json.forEach(function(_m){

        const _mod = create_module(parseInt(_m.colone_module), _m.name_module, parseInt(_m.width_module), parseInt(_m.line_module));

        _mod.setBorderLeft(parseInt(_m.border_left_module));
        _mod.setBorderRight(parseInt(_m.border_right_module));
        _mod.setBorderTop(parseInt(_m.border_top_module));
        _mod.setBorderBottom(parseInt(_m.border_bottom_module));
        _mod.setBorderRadius(parseInt(_m.border_radius_module));
        _mod.setModuleID(parseInt(_m.colone_module));
        _mod.setColor(_m.color_module);
        _mod.setModuleBDDID(_m.id_module);
        const _updatedData = _m.data_module.replace(/\\/g, '');
        console.log(_updatedData);
        _mod.updateData(JSON.parse(_updatedData));
        _mod.setFontColor(_m.font_color_module);
        _mod.setFont(_m.font_module);
        load_font(_m.font_module);
        _mod.setIcon(_m.icon_module);
        _mod.setIconSize(parseInt(_m.icon_size_module));
        _mod.setIconRadius(parseInt(_m.icon_radius_module));
        _mod.setModeAffichage(parseInt(_m.modeAffichage_module));
        _mod.setModuleShownName(_m.show_name_module);
        _mod.setProfilePic(_m.profil_picture_module);
        _mod.setSeparatorColor(_m.separator_color_module);
        _mod.setSeparatorRadius(parseInt(_m.separator_radius_module));
        _mod.setSeparatorSize(parseInt(_m.separator_size_module));
        _mod.setShowTitle((_m.show_title_module === '1'));

        _mod.refresh();
    });
}

function cv_save(json){

    // recup id module aussi (colone)
    if(json.hasOwnProperty('idbdd')){
     //json.idbdd
    }

    // Ici dans le json je dois pouvoir récupérer les IDBDD que je n'ai pas et les associer à mes modules

    on_save_end();
}

function dashboard_refresh(json){
    dashboard_body.empty();

    for (const [key, value] of Object.entries(json)) {
        const item = $('<tr></tr>');
        item.append($('<td>'+value.intitule+'</td>'));
        const infos = $('<td></td>');
        if(value.hasOwnProperty('version') && value.version !== null){
            infos.append($('<p>Version <strong>'+value.version+'</strong></p>'));
        }
        if(value.hasOwnProperty('created_at')){
            let _date = new Date(value.created_at);
            infos.append($('<p>Créé le <strong>'+_date.toLocaleDateString("fr")+'</strong></p>'));
        }
        if(value.hasOwnProperty('modified_at')){
            let _date = new Date(value.modified_at);
            infos.append($('<p>Modifié le <strong>'+_date.toLocaleDateString("fr")+'</strong></p>'));
        }
        item.append(infos);
        item.on('click', function(){
            window.location.href = SITE_URL + '/editor?id=' + value.id_cv;
        });
        dashboard_body.append(item);
    }
}