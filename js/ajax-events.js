
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

}

function cv_save(json){
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