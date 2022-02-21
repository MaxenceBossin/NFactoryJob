
let refreshDahboardTimeout = null;

function refresh_dashboard(){

    if(refreshDahboardTimeout !== null){
        clearTimeout(refreshDahboardTimeout);
    }

    refreshDahboardTimeout = setTimeout(function(){
        let data = {
            'competences': [],
            'postes': [],
            'typecontrat': [],
        };



        console.log(data);
    }, 800);
}

function generate_filters_form(){
    const parent = $('#dashboard .filters');

    create_input('postes', 'Postes', parent, 'autocomplete', [], '', '', true);
    create_input('typecontrat', 'Type de contrat', parent, 'autocomplete', [], '', '', true);
    create_input('typediplome', 'Type de diplôme', parent, 'autocomplete', []);
    create_input('hard-skills', 'Hard skills', parent, 'autocomplete', [], '', '', true);
    create_input('soft-skills', 'Soft skills', parent, 'autocomplete', [], '', '', true);
    create_input('langues', 'Langues', parent, 'autocomplete', [], '', '', true);
    create_input('dateajout', 'Ajouté il y a moins de', parent, 'slider', [30,0, 360], '', '', false, 'jours');
}