
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



        console.log(data);
    }, 800);
}

function generate_filters_form(){
    const parent = $('#dashboard .filters');

    create_input('poste', 'Poste', parent, 'autocomplete', []).on('input', function(){ refresh_dashboard(); });
    create_input('emplacement', 'Emplacement', parent, 'autocomplete', []).on('input', function(){ refresh_dashboard(); });
    create_input('typecontrat', 'Type de contrat', parent, 'autocomplete', [], '', '', true);
    create_input('typediplome', 'Type de diplôme', parent, 'autocomplete', []).on('input', function(){ refresh_dashboard(); });
    create_input('hard-skills', 'Hard skills', parent, 'autocomplete', [], '', '', true);
    create_input('soft-skills', 'Soft skills', parent, 'autocomplete', [], '', '', true);
    create_input('langues', 'Langues', parent, 'autocomplete', [], '', '', true);
    create_input('date', 'À partir du', parent, 'date', [Date.now()]);
}