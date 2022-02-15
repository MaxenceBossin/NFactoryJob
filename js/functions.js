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

// Attention: 'values' est un array (utile pour les select)
function create_input(name, form = null, type = "text", values = [], placeholder = "", specific_ID = ""){

    let input;
    if(type === "slider"){
        input = $('<input type="slider" min="0" max="100" />');
        if(values.length > 0){
            input.attr('value', parseFloat(values[0]));
        }
        if(values.length >= 3){
            const min = parseFloat(values[1]);
            const max = parseFloat(values[2]);
            input.attr('min', min);
            input.attr('max', max);
        }
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

    input.name('name', name);
    if(specific_ID.length > 0){
        input.name('id', specific_ID);
    }
    else{
        input.name('id', name);
    }

    if(form != null){
        const label = $('<label for="'+name+'"></label>');
        form.append(label);
        const span_error = $('<span id="error-'+name+'" class="error"></span>');
        form.append(label);
        form.append(input);
        form.append(span_error);
    }

    return input;
}

function build_form(form, submitValue = 'Valider'){
    const submit = $('<input type="submit" value="'+submitValue+'" />');
    form.append(submit);
    form.on('submit', function(e){
        e.preventDefault();
        let data = {};
        $(this).find('input, select').each(function(){
            const _id = $(this).attr('id');
            data[_id] = $(this).value;
        });
        $(this).find('textarea').each(function(){
            const _id = $(this).attr('id');
            data[_id] = $(this).text();
        });
        on_form_submit($(this).attr('id'), data);
    });
}