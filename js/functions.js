let autocomplete_ajax_timeout = null;

function ajax(name, fichierPhp, data = {}){
    $.ajax({
        type: "POST",
        url: fichierPhp,
        data: data,
        success: function(response){
            on_ajax_response(name, JSON.parse(response));
        },
        error: function(){
            console.log("ajax error on " + name);
        }
    });
}

function show_loading(){
    if($('#loading').length){
        return;
    }

    const loading = $('<div id="loading"></div>');
    const content = $('<div class="content"></div>');
    loading.append(content);
    content.append($('<h1><span id="spantitre">N</span>Factory<span id="spantitre">Job</span></h1>'));
    content.append($('<span class="loader"><span class="loader-inner"></span></span>'));
   /* content.append($('<h3>Chargement <span id="bounce">.</span><span id="bounce">.</span><span id="bounce">.</span></h3>'));*/

    $('body').append(loading);
}

function hide_loading(){
    if($('#loading').length){
        $('#loading').fadeOut('fast', function(){
            $('#loading').remove();
        })
    }
}

function create_form(formName, forUpload = false, action = ''){
    let form;
    if(forUpload){
        form = $('<form id="'+formName+'" action = "'+action+'" method = "POST" enctype="multipart/form-data"></form>');
    }
    else{
        form = $('<form id="'+formName+'" action = "'+action+'" method = "POST"></form>');
    }
    return form;
}

function checkboxgroup_has_element(input_id, value){
    let found = false;
    $('#checkboxgroup-' + input_id + ' .checkboxgroup-element').each(function(){
        const dataVal = $(this).attr('data-value');
        if(dataVal.toLowerCase() === value.toLowerCase()){
            found = true;
        }
    });
    return found;
}

function set_input_checkboxed(input, input_wrapper, field){
    if(input === undefined){
        return;
    }
    
    const add_btn = $('<button data-inputid="'+input.attr('id')+'" class="btn blue checkboxgroup-add"><i class="fa-solid fa-plus"></i></button>');
    field.append(add_btn);

    const div_filters = $('<div id="checkboxgroup-'+input.attr('id')+'" class="checkboxgroup"></div>');
    input_wrapper.append(div_filters);

    input.on('keypress',function(e) {
        if(e.which == 13) {
            request_add_checkboxgroup_element(input.attr('id'));
        }
    });

    add_btn.on('click',function() {
        request_add_checkboxgroup_element($(this).attr('data-inputid'));
    });
}

function request_add_checkboxgroup_element(input_id){
    const input = $('#' + input_id);
    let val = input.val();
    if(val.length > 0){
        if(!checkboxgroup_has_element(input_id, val)){

            // Champs autocomplete, on vérifie que la valeur est bien présente dans la liste
            if(input.hasClass("autocomplete-field")){
                let _items = get_good_autocomplete_data(input_id);
                let _found = false;
                for(let i=0;i<_items.length;i++){
                    if(_items[i] !== null && _items[i].getShowName().toLowerCase() === val.toLowerCase()){
                        val = _items[i].getShowName();
                        _found = true;
                        break;
                    }
                }

                if(!_found){
                    input_error(input_id, 'Veuillez renseigner une valeur parmi les valeurs proposées');
                    return;
                }
            }

            const checkgroup_element = $('<div class="checkboxgroup-element">'+val+'</div>');
            checkgroup_element.attr('data-value', val.replace('"', '\\"'));
            const i = $('<i class="fa-solid fa-trash"></i>').on('click', function(){
                $(this).parent().remove();
                if(PAGE_NAME === 'template-dashboard.php'){
                    refresh_dashboard();
                }
            });
            checkgroup_element.append(i);
            $('#checkboxgroup-'+input_id).append(checkgroup_element);
            input.val('');
            input_error(input_id, '');

            if(PAGE_NAME === 'template-dashboard.php'){
                refresh_dashboard();
            }
        }
        else{
            input_error(input_id, 'Cette donnée a déjà été ajoutée');
        }
    }
    else{
        input_error(input_id, 'Veuillez renseigner une valeur');
    }

    const autocomplete = $('#autocomplete-for-' + input_id);
    if(autocomplete.length){
        autocomplete.css('display', 'none');
    }
}

// Attention: 'values' est un array (utile pour les select par exemple)
function create_input(name, showName = '', parent = null, type = "text", values = [], placeholder = "", specific_ID = "", checkboxed_filters = false, added_paragraph = ''){
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
        input = $('<input class="autocomplete-field" type="text" />').on('input', function(){
            $(this).attr('data-fromautocompletion', '0');
            if($(this).val().length > 0){
                on_autocomplete_ajax($(this));
            }
            else{
                $('#autocomplete-for-' + $(this).attr('id')).css("display", "none");
            }
        });
        input.attr('placeholder', placeholder);
    }
    else if(type === 'colorpicker'){
        // évent géré dans editor-funcs.js => on_color_update
        if(values.length > 0){
            input = $('<input type="text" data-coloris value="'+values[0]+'" />');
        }
        else{
            input = $('<input type="text" data-coloris value="#FFFFFF" />');
        }
    }
    else if(type === "slider"){
        input = $('<input type="range" min="0" max="100" />').on('input', function(){
            let _name = $(this).attr('name');
            let _type = $(this).attr('data-type');
            if (typeof _type !== 'undefined' && _type !== false) {
                $('#slider-span-' + _name).text(parseInt($(this).val()) + '' + _type);
            }
            else{
                $('#slider-span-' + _name).text(parseInt($(this).val()));
            }

            if(PAGE_NAME === 'template-dashboard.php'){
                refresh_dashboard();
            }
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
    input.attr('id', _fID);

    const input_wrapper = $('<div class="input_wrapper"></div>');
    const field = $('<div class="field"></div>');

    if(showName.length > 0){
        const label = $('<label for="'+name+'">'+showName+'</label>');
        input_wrapper.append(label);
    }
    field.append(input);
    if(added_paragraph.length > 0){
        field.append($('<p>'+added_paragraph+'</p>'));
    }
    input_wrapper.append(field);
    const span_error = $('<span id="error-'+name+'" class="error"></span>');
    input_wrapper.append(span_error);

    if(type === "slider"){
        let _sliderSpanNam = 'slider-span-';
        _sliderSpanNam += _fID;
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
    else if(type === 'autocomplete'){
        input_wrapper.append($('<div id="autocomplete-for-' + _fID + '" class="autocomplete"></div>'));
    }

    if(checkboxed_filters && parent !== null){
        set_input_checkboxed(input, input_wrapper, field);
    }

    if(parent !== null){
        parent.append(input_wrapper);
    }

    if(type === 'checkbox'){
        if(values !== null && values.length > 0){
            input.prop('checked', values[0]);
        }
    }

    return input;
}

function set_selectinput_index(select, idx){
    select.prop('selectedIndex', idx);
}

function build_form(form, submitValue = 'Valider', secondary_infos = [], add_cancel_option = false, form_horizontal = false, add_event = true){
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

    if(add_event){
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
}

function on_autocomplete_ajax(input){
    if(autocomplete_ajax_timeout !== null){
        clearTimeout(autocomplete_ajax_timeout);
    }

    autocomplete_ajax_timeout = setTimeout(function(){
        const input_value = input.val();
        if(input_value.length > 0){
            const input_id = input.attr('id');
            on_ajax_get_autocomplete_data(input_id, get_good_autocomplete_data(input_id, input_value));
        }
    }, 300);
}

function on_ajax_get_autocomplete_data(input_id, data){
    const _input = $('#' + input_id);
    const _autocomplete = $('#autocomplete-for-' + input_id);
    if(_autocomplete !== undefined){
        _autocomplete.empty();
        if(data !== null && data.length > 0 && data[0] !== null && (data.length > 1 || data[0].getShowName() !== _input.val())){
            for(let i=0;i<data.length;i++){
                if(data[i] !== null && data[i].getShowName().length > 0){
                    const _autocomplete_item = $('<div data-autoitemid="'+data[i].getItemID()+'" data-inputid="'+input_id+'" class="autocomplete-item">'+data[i].getShowName()+'</div>').on('click', function(){
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