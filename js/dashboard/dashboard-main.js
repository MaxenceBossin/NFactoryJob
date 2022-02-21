const dashboard_body = $('#dashboard #search-table tbody');
let searchTimeout = null;

$( document ).ready(function() {
    create_input('search', '', $('#dashboard .search'), 'autocomplete', [], 'Recherche...').on('input', function(){
        if(searchTimeout !== null){
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(function(){
            const val = $(this).val();
            //ajax
        }, 800);
    });

    generate_filters_form();
    refresh_dashboard();
});