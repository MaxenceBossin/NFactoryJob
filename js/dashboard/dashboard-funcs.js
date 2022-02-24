
let refreshDahboardTimeout = null;

function refresh_dashboard(){
    if (refreshDahboardTimeout !== null) {
        clearTimeout(refreshDahboardTimeout);
    }

    refreshDahboardTimeout = setTimeout(function () {

        let data = {};

        data = add_field(data, 'metiers', 'typemetier');
        data = add_field(data, 'emplacements', 'emplacement', false);
        data = add_field(data, 'contrats', 'typecontrat', false);
        //data = add_field(data, 'diplomes', 'typediplome', false);
        data = add_field(data, 'competences', 'hard-skills', false);
        data = add_field(data, 'softskills', 'soft-skills', false);
        data = add_field(data, 'langues', 'langues', false);
        data = add_field(data, 'dateReadyToWork', 'date');

        ajax('dashboard_refresh', SITE_URL + 'api/refreshDashboard', {
            data: JSON.stringify(data)
        });
    }, 500);

    if(!RECRUTEUR) {
        $('#dashboard .filters').css("display", "none");
        $('#dashboard .all-cv').css("width", "100%");
    }
}

function add_field(data, dataKey, fieldID, unique = true){
    if(unique){
        const poste = $('#' + fieldID).val();
        const poste_data = get_autocomplete_item_by_valname(poste);
        if(poste_data !== null){
            data[dataKey] = poste_data.getData();
        }
    }
    else{
        data[dataKey] = [];
        $('#checkboxgroup-' + fieldID + ' .checkboxgroup-element').each(function(){
            const _name = $(this).attr('data-value');
            const _autoItem = get_autocomplete_item_by_valname(_name);
            if(_autoItem !== null){
                data[dataKey].push(_autoItem.getData());
            }
        });
    }
    return data;
}

function generate_filters_form(){
    const parent = $('#dashboard .filters');
    parent.empty();

    let _items;
    _items = autocomplete_item_load_from_json(api_data.typemetier, 'libelle_type_metier', 'typemetier');
    create_input('typemetier', 'Poste', parent, 'autocomplete', _items).on('input', function(){ refresh_dashboard(); });
    _items = autocomplete_item_load_from_json(api_data.emplacement, 'ville', 'emplacement');
    create_input('emplacement', 'Emplacement', parent, 'autocomplete', _items, '', '', true);
    _items = autocomplete_item_load_from_json(api_data.contrat, 'intitule_type_contrat', 'typecontrat');
    create_input('typecontrat', 'Type de contrat', parent, 'autocomplete', _items, '', '', true);
    //_items = autocomplete_item_load_from_json(api_data.diplomes, '', '');
    //create_input('typediplome', 'Type de diplôme', parent, 'autocomplete', _items).on('input', function(){ refresh_dashboard(); });
    _items = autocomplete_item_load_from_json(api_data.competences, 'libelle', 'hard-skills');
    create_input('hard-skills', 'Hard skills', parent, 'autocomplete', _items, '', '', true);
    _items = autocomplete_item_load_from_json(api_data.softskills, 'libelle_softskill', 'soft-skills');
    create_input('soft-skills', 'Soft skills', parent, 'autocomplete', _items, '', '', true);
    _items = autocomplete_item_load_from_json(api_data.langues, 'libelle_langue', 'langues');
    create_input('langues', 'Langues', parent, 'autocomplete', _items, '', '', true);
    create_input('date', 'À partir du', parent, 'date', [Date.now()]);
}