let autocomplete_ajax_timeout = null;

function ajax(name, fichierPhp, data = {}){
    show_loading();
    $.ajax({
        type: "POST",
        url: "ajax/" + fichierPhp,
        data: data,
        success: function(response){
            on_ajax_response(name, JSON.parse(response));
            hide_loading();
        },
        error: function(){
            console.log("ajax error on " + name);
            hide_loading();
        }
    });
}

function show_loading(parent = null){

}

function hide_loading(){

}

function create_form(formName){
    const form = $('<form id="'+formName+'" action = "" method = "POST"></form>');
    return form;
}

function set_input_checkboxed(input, input_wrapper, field){
    if(input === undefined){
        return;
    }
    
    const add_btn = $('<button data-inputid="'+input.attr('id')+'" class="btn blue checkboxgroup-add">+</button>');
    field.append(add_btn);

    const div_filters = $('<div id="checkboxgroup-'+input.attr('id')+'" class="checkboxgroup"></div>');
    input_wrapper.append(div_filters);

    add_btn.on('click',function() {
        const input_id = $(this).attr('data-inputid');
        const checkboxgroup = $('#checkboxgroup-' + input_id);
        const input = $('#' + input_id);
        const val = input.val();
        if(val.length > 0){
            const checkgroup_element = $('<div class="checkboxgroup-element">'+val+'</div>');
            const i = $('<i class="fa-solid fa-trash"></i>').on('click', function(){
                $(this).parent().remove();
            });
            checkgroup_element.append(i);
            $('#checkboxgroup-'+input_id).append(checkgroup_element);
        }
        input.val('');
        const autocomplete = $('#autocomplete-for-' + input_id);
        if(autocomplete.length){
            autocomplete.css('display', 'none');
        }
    });
}

// Attention: 'values' est un array (utile pour les select par exemple)
function create_input(name, showName = '', parent = null, type = "text", values = [], placeholder = "", specific_ID = "", checkboxed_filters = false){
    if(name.length === 0){
        name = 'field';
    }

    if(type.length === 0){
        type = 'text';
    }

    let _fID = name;
    if(specific_ID.length > 0){
        _fID = specific_ID;
    }

    let input;
    if(type === "autocomplete"){
        input = $('<input type="text" />').on('input', function(){
            $(this).attr('data-fromautocompletion', '0');
            on_autocomplete_ajax(_fID, $(this).val());
        });
        input.attr('placeholder', placeholder);
    }
    else if(type === 'colorpicker'){
        if(values.length > 0){
            input = $('<input type="text" value="'+values[0]+'" />');
        }
        else{
            input = $('<input type="text" value="#FFFFFF" />');
        }
    }
    else if(type === "slider"){
        input = $('<input type="range" min="0" max="100" />').on('input', function(){
            let _name = $(this).attr('name');
            let _type = $(this).attr('data-type');
            $('#slider-span-' + _name).text(parseInt($(this).val()) + '' + _type);
        });
        if(values.length > 0){
            let _value = parseFloat(values[0]);
            input.attr('value', _value);
        }
        if(values.length >= 3){
            const min = parseFloat(values[1]);
            const max = parseFloat(values[2]);
            input.attr('min', min);
            input.attr('max', max);
        }
        if(values.length >= 4){
            input.attr('data-type', values[3]);
        }
        input.addClass('slider');
    }
    else if(type === "textarea"){
        input = $('<textarea></textarea>');
        if(values.length > 0){
            input.text(values[0]);
        }
        input.attr('placeholder', placeholder);
    }
    else if(type === "select"){
        input = $('<select></select>');
        const option_vide = $('<option></option>');
        input.append(option_vide);
        if(values.length > 0){
            for(let i=0;i<values.length;i++){
                const option = $('<option>'+values[i]+'</option>');
                input.append(option);
            }
        }
    }
    else{
        input = $('<input />');
        input.attr('type', type);
        if(values.length > 0){
            input.attr('value', values[0]);
        }
        input.attr('placeholder', placeholder);
    }

    input.attr('name', name);
    if(specific_ID.length > 0){
        input.attr('id', specific_ID);
    }
    else{
        input.attr('id', name);
    }

    const input_wrapper = $('<div class="input_wrapper"></div>');
    const field = $('<div class="field"></div>');

    if(showName.length > 0){
        const label = $('<label for="'+name+'">'+showName+'</label>');
        input_wrapper.append(label);
    }
    field.append(input);
    input_wrapper.append(field);
    const span_error = $('<span id="error-'+name+'" class="error"></span>');
    input_wrapper.append(span_error);

    if(type === "slider"){
        let _sliderSpanNam = 'slider-span-';
        if(specific_ID.length > 0){
            _sliderSpanNam += specific_ID;
        }
        else{
            _sliderSpanNam += name;
        }
        let _value = 0;
        if(values.length > 0){
            _value = parseInt(values[0]);
        }
        let _type = '';
        if(values.length >= 4){
            _type = values[3];
        }
        input_wrapper.append($('<span id="'+_sliderSpanNam+'">'+_value+_type+'</span>'));
    }
    else if(type === "colorpicker"){
        input_wrapper.append($('<div id="picker-'+_fID+'"></div>'));
        $('#picker-' + _fID).farbtastic($('#' +_fID));
    }
    else if(type === 'autocomplete'){
        input_wrapper.append($('<div id="autocomplete-for-' + _fID + '" class="autocomplete"></div>'));
    }

    if(checkboxed_filters && parent !== null){
        set_input_checkboxed(input, input_wrapper, field);
    }

    if(parent !== null){
        parent.append(input_wrapper);
    }

    return input;
}

function build_form(form, submitValue = 'Valider', secondary_infos = [], add_cancel_option = false, form_horizontal = false){
    const submit = $('<input type="submit" value="'+submitValue+'" />');
    form.append(submit);
    form.attr('style', 'opacity: 0;');
    form.animate({
        "opacity": "1"
    }, 300);

    if(form_horizontal){
        form.css("flex-flow", "row nowrap");
    }

    if(add_cancel_option){
        const cancel_btn = $('<span data-form="'+form.attr('id')+'" class="btn red">Annuler</span>');
        cancel_btn.on('click', function(){
            const associated_form = $(this).attr('data-form');
            $('#' + associated_form).fadeOut('slow', function(){
                $('#' + associated_form).remove();
            });
        });
        form.append(cancel_btn);
    }

    form.on('submit', function(_e){
        _e.preventDefault();
        let data = {};
        $(this).find('input:not([type=submit]), select').each(function(){
            const _id = $(this).attr('id');
            data[_id] = $(this).val();
        });
        $(this).find('textarea').each(function(){
            const _id = $(this).attr('id');
            data[_id] = $(this).text();
        });
        on_form_submit($(this).attr('id'), $(this), data, secondary_infos);
    });
}

function on_autocomplete_ajax(input_id, input_value){
    if(autocomplete_ajax_timeout !== null){
        clearTimeout(autocomplete_ajax_timeout);
    }

    autocomplete_ajax_timeout = setTimeout(function(){
        on_valid_autocomplete_ajax_request(input_id, input_value);
    }, 500);
}

function on_valid_autocomplete_ajax_request(input_id, input_value){
    console.log('ajax for ' + input_id);

    if(input_id === ''){

    }

    on_ajax_get_autocomplete_data(input_id, ['Donnée 1', 'Donnée 2', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3', 'Donnée 3']); // temporaire, plutot utiliser ajax(...);
}

function on_ajax_get_autocomplete_data(input_id, data){
    const _input = $('#' + input_id);
    const _autocomplete = $('#autocomplete-for-' + input_id);
    if(_autocomplete !== undefined){
        _autocomplete.empty();
        if(data !== null && (data.length > 1 || (data.length > 0 && data[0] !== _input.val()))){
            for(let i=0;i<data.length;i++){
                if(data[i].length > 0){
                    const _autocomplete_item = $('<div data-inputid="'+input_id+'" class="autocomplete-item">'+data[i]+'</div>').on('click', function(){
                        const input_id_data = $(this).attr('data-inputid');
                        const _input_target = $('#' + input_id);
                        const _autocomplete_target = $('#autocomplete-for-' + input_id_data);
                        _input_target.val($(this).text());
                        _input_target.attr('data-fromautocompletion', '1');
                        _autocomplete_target.css("display", "none");
                    });
                    _autocomplete.append(_autocomplete_item);
                }
            }
            _autocomplete.css('display', 'flex');
        }
        else{
            _autocomplete.css('display', 'none');
        }
    }
}

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
}