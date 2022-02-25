const dashboard_body = $('#dashboard #search-table tbody');

$( document ).ready(function() {
    show_loading();
    /*create_input('search', '', $('#dashboard .search'), 'autocomplete', [], 'Recherche...').on('input', function(){

    });*/

    api_load_all();
    refresh_dashboard();
});