
let refreshDahboardTimeout = null;

function refresh_dashboard(){

    if(refreshDahboardTimeout !== null){
        clearTimeout(refreshDahboardTimeout);
    }

    refreshDahboardTimeout = setTimeout(function(){

        let data = {
            'poste': $('#poste').val(),
            'emplacement': $('#emplacement').val(),
            'typecontrat': [],
            'typediplome': $('#typediplome').val(),
            'hardskills': [],
            'softskills': [],
            'langues': [],
            'dateajout': $('#dateajout').val()
        }

       /* data['competences'].push({'nom': 'PHP', 'niveau': 1});
        data['competences'].push({'nom': 'Java', 'niveau': 1});
        data['competences'].push({'nom': 'Javascript', 'niveau': 1});
        data['competences'].push({'nom': 'MySQL', 'niveau': 1});
        data['langues'].push({'nom': 'Anglais', 'niveau': 'B1'});
        data['langues'].push({'nom': 'Espagnol', 'niveau': 'A2'});*/


        //console.log(data);
    }, 800);
}

function generate_filters_form(){
    const parent = $('#dashboard .filters');

    let _items;
    _items = autocomplete_item_load_from_json(api_data.typemetier, 'libelle_type_metier', 'typemetier');
    create_input('typemetier', 'Poste', parent, 'autocomplete', _items).on('input', function(){ refresh_dashboard(); });
    _items = autocomplete_item_load_from_json(api_data.emplacement, 'ville', 'emplacement');
    create_input('emplacement', 'Emplacement', parent, 'autocomplete', _items).on('input', function(){ refresh_dashboard(); });
    _items = autocomplete_item_load_from_json(api_data.contrat, 'intitule_type_contrat', 'typecontrat');
    create_input('typecontrat', 'Type de contrat', parent, 'autocomplete', _items, '', '', true);
    /*_items = autocomplete_item_load_from_json(api_data., '', '');
    create_input('typediplome', 'Type de diplôme', parent, 'autocomplete', _items).on('input', function(){ refresh_dashboard(); });*/
    _items = autocomplete_item_load_from_json(api_data.competences, 'libelle', 'hard-skills');
    create_input('hard-skills', 'Hard skills', parent, 'autocomplete', _items, '', '', true);
    _items = autocomplete_item_load_from_json(api_data.softskills, 'libelle_softskill', 'soft-skills');
    create_input('soft-skills', 'Soft skills', parent, 'autocomplete', _items, '', '', true);
    _items = autocomplete_item_load_from_json(api_data.langues, 'libelle_langue', 'langues');
    create_input('langues', 'Langues', parent, 'autocomplete', _items, '', '', true);
    create_input('date', 'À partir du', parent, 'date', [Date.now()]);
}