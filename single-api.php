<?php

require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');


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