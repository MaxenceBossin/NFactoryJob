
function on_ajax_response(name, json){
    if(name.startsWith('apiload_')){
        const key = name.split('_')[1];
        api_data[key] = json;
        on_api_loaded();
    }

    if(name === 'all_icons'){
        icons = json;
        on_api_loaded();
    }

    if(name === 'all_fonts'){
        fonts = json;
        on_api_loaded();
    }
}