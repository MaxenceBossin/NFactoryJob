
let api_data = [];
let api_loaded = false;
let api_timeout = null;

function api_load_all(){
    show_loading();
    ajax('apiload_langues', SITE_URL + 'api/getLangues', {});
    ajax('apiload_softskills', SITE_URL + 'api/getSoftSkills', {});
    ajax('apiload_competences', SITE_URL + 'api/getCompetences', {});
    ajax('apiload_emplacement', SITE_URL + 'api/getEmplacement', {});
    ajax('apiload_loisir', SITE_URL + 'api/getLoisir', {});
    ajax('apiload_etablissement', SITE_URL + 'api/getEtablissement', {});
    ajax('apiload_typemetier', SITE_URL + 'api/getTypeMetier', {});
    ajax('apiload_typeetablissement', SITE_URL + 'api/getTypeEtablissement', {});
    ajax('apiload_contrat', SITE_URL + 'api/getTypeContrat', {});
}

function on_api_loaded(){
    if(api_timeout !== null){
        clearTimeout(api_timeout);
    }
    api_timeout = setTimeout(function(){
        api_loaded = true;

        if(PAGE_NAME === 'template-dashboard.php'){
            generate_filters_form();
        }
        else if(PAGE_NAME === 'template-editor.php'){
            open_onglet();
            close_save_notif();
            place_add_module();
        }

        hide_loading();
    }, 2500);
}