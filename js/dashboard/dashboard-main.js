const dashboard_body = $('#dashboard #search-table tbody');
let searchTimeout = null;

$( document ).ready(function() {
    show_loading();
    create_input('search', '', $('#dashboard .search'), 'autocomplete', [], 'Recherche...').on('input', function(){
        if(searchTimeout !== null){
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(function(){
            const val = $(this).val();
            //ajax
        }, 800);
    });

    api_load_all();
    refresh_dashboard();
});