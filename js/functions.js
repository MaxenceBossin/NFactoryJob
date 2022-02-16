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

function get_form(formName){
    return $('#' + formName);
}

// Attention: 'values' est un array (utile pour les select)
function create_input(name, showName = '', parent = null, type = "text", values = [], placeholder = "", specific_ID = ""){

    if(showName.length === 0){
        showName = name;
    }
    let input;
    if(type === "autocomplete"){
        input = $('<input type="text" />').on('input', function(){

        });
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

    if(parent != null){
        const label = $('<label for="'+name+'">'+showName+'</label>');
        parent.append(label);
        const span_error = $('<span id="error-'+name+'" class="error"></span>');
        parent.append(label);
        parent.append(input);

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
            parent.append($('<span id="'+_sliderSpanNam+'">'+_value+_type+'</span>'));
        }

        parent.append(span_error);
    }

    return input;
}

function build_form(form, submitValue = 'Valider', secondary_infos = [], add_cancel_option = false){
    const submit = $('<input type="submit" value="'+submitValue+'" />');
    form.append(submit);
    form.attr('style', 'opacity: 0;');
    form.animate({
        "opacity": "1"
    }, 300);

    if(add_cancel_option){
        const cancel_btn = $('<button data-form="'+form.attr('id')+'" class="btn red">Annuler</button>');
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