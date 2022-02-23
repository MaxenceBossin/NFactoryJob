<?php

$isRecruteur = is_recruteur();

if(!is_user_logged_in()){
    echo 'not logged';
}

if($isRecruteur){
    $cvs = rechercheCv([]);
    $cvAr = [];
    foreach($cvs as $cv){
        $cvAr[] = getCV($cv['id_cv']);
    }
    echo json_encode($cvAr);
}
else{
    $userid = get_current_user_id();
    echo json_encode(getCVFromUser($userid));
}