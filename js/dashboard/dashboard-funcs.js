function generate_filters_form(){
    const form = create_form('filters');

    create_input('competences', 'Compétences', form, 'autocomplete', [], '', '', true);

    build_form(form, 'Mettre à jour');
    $('#dashboard .filters').append(form);
}