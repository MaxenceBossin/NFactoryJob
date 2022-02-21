<?php

require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');
// appel des apis URL 
// -> 

if(get_the_title() === 'getLangues'){
    echo(json_encode(getLangues(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getSoftSkills'){
    echo(json_encode(getSoftSkills(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getCompetences'){
    echo(json_encode(getCompetences(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getEmplacement'){
    echo(json_encode(getEmplacement(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getLoisir'){
    echo(json_encode(getLoisir(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getEtablissement'){
    echo(json_encode(getEtablissement(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getTypeMetier'){
    echo(json_encode(getTypeMetier(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getTypeEtablisement'){
    echo(json_encode(getTypeEtablisement(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}elseif(get_the_title() === 'getTypeContrat'){
    echo(json_encode(getTypeContrat(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
} 
// Partie Recherche recruteur getFromCV il faut ajouter ' ?id=1'  lors l'appel de ces apis
elseif(get_the_title() === 'getCvFromUser'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getCvFromUser($_GET['id']));}
elseif(get_the_title() === 'getLocationWhereCVCanWorkFromCV'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getLocationWhereCVCanWorkFromCV($_GET['id']));}
elseif(get_the_title() === 'getRecreationFromCV'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getRecreationFromCV($_GET['id']));}
elseif(get_the_title() === 'getSkillLangageFromCv'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getSkillLangageFromCv($_GET['id']));}
elseif(get_the_title() === 'getSoftSkillFromCv'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getSoftSkillFromCv($_GET['id']));}
elseif(get_the_title() === 'getCompetenceFromCv'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getCompetenceFromCv($_GET['id']));}
elseif(get_the_title() === 'getDiplomeFromCv'){
    $idCV = (!empty($_GET['id'])) ? $_GET['id'] : '';
    echo arrayJson(getDiplomeFromCv($_GET['id']));
}
// partie recruteur recherche CV by Catégorie
// rajouter ?competence=nomComptence dans l'url pour l'appel de l'api
// on peut également rajouter &niveau=(entre 1 et 5) 
// Pour choisir les des niveaux de compétences spécifique
// il est de base placé à 0 pour prendre tous les CV ayant la compétence
// exemple : /api/getcvbysoftskill/?competence=2&niveau=4
elseif(get_the_title() === 'getCVByCompetence'){
    $competence       = (!empty($_GET['competence'])) ? $_GET['competence'] : '';
    $niveauCompetence = (!empty($_GET['niveau'])) ? $_GET['niveau'] : '';
    echo arrayJson(getCVByCompetence($competence, $niveauCompetence));
}
// rajouter ?softskill=idSoftskill dans l'url
// exemple : /api/getcvbysoftskill/?softskill=2
elseif(get_the_title() === 'getCVBySoftSkill'){
    $softskill       = (!empty($_GET['softskill'])) ? $_GET['softskill'] : '';
    echo arrayJson(getCVBySoftSkill($softskill));
}
// exemple : /api/getCVByLangue/?langue=1
elseif(get_the_title() === 'getCVByLangue'){
    $langue     = (!empty($_GET['langue'])) ? $_GET['langue'] : '';
    echo arrayJson(getCVByLangue($langue));
}
// posibilite d'ajouter la date 
 // exemple : /api/getCVByEmplacement/?emplacelement=1
elseif(get_the_title() === 'getCVByEmplacement'){
    $emplacelement     = (!empty($_GET['emplacelement'])) ? $_GET['emplacelement'] : '';
    echo arrayJson(getCVByLangue($langue));
}
