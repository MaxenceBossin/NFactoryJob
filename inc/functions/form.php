<?php

function mailValidation($errors,$value,$key){
    if(!empty($value)){
        if (filter_var($value, FILTER_VALIDATE_EMAIL)==false) {
            $errors[$key]='Veuillez renseigner un email valide';
        }
    } else{
        $errors[$key]='Veuillez renseigner ce champ';
    }
    return $errors;
}

function cleanXss($key){
    return trim(strip_tags($_POST[$key]));
}

function viewError($errors,$key){
    if(!empty($errors[$key])) {
        echo $errors[$key];
    }
}

function recupInputValue($key){
    if (!empty($_POST[$key])) {
        echo $_POST[$key];
    }

}

function asset($file) {
    return get_template_directory_uri() . '/asset/' .$file;
}