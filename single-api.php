<?php

require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');
require_once('inc/functions/request/insert.php');
require_once('inc/functions/request/insertCv.php');
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
}elseif(get_the_title() === 'getTypeEtablissement'){
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

elseif(strtolower(get_the_title()) === 'refreshdashboard'){

    if(empty($_POST['data'])){
        die('no data');
    }

    $data = trim(strip_tags($_POST['data']));
    $isRecruteur = is_recruteur();

    if(!is_user_logged_in()){
        die('not logged');
    }

    if($isRecruteur){
        $cvs = testCv(stripslashes($data));
        die(json_encode($cvs));
    }
    else{
        $userid = get_current_user_id();
        echo json_encode(getCVFromUser($userid));
    }
}

elseif(strtolower(get_the_title()) === 'cvsave'){
    if(empty($_POST['color'])){
        die('no data');
    }
    $color = trim(strip_tags($_POST['color']));
    $title = trim(strip_tags($_POST['title']));
    $id_cv = trim(strip_tags($_POST['idcv']));
    $sql = "UPDATE nfj_cv SET intitule = :intitule, background_color = :backcol WHERE id_cv = :idcv";
    $query = $pdo->prepare($sql);
    $query->bindValue(':intitule',$title);
    $query->bindValue(':backcol',$color);
    $query->bindValue(':idcv',$id_cv);
    $query->execute();

    die(json_encode([]));
}

elseif(strtolower(get_the_title()) === 'cvdeletemodule'){
    $bddid = intval(trim(strip_tags($_POST['bddid'])));
    $sql = "DELETE FROM nfj_modules WHERE id_module = :bddid";
    $query = $pdo->prepare($sql);
    $query->bindValue(':bddid',$bddid);
    $query->execute();
    die(json_encode([]));
}

elseif(strtolower(get_the_title()) === 'cvsavemodule'){

    $name = trim(strip_tags($_POST['name']));
    $moduleid = intval(trim(strip_tags($_POST['moduleid'])));
    $showname = trim(strip_tags($_POST['showName']));
    $line = intval(trim(strip_tags($_POST['line'])));
    $width = intval(trim(strip_tags($_POST['width'])));
    $color = trim(strip_tags($_POST['color']));
    $fontColor = trim(strip_tags($_POST['fontColor']));
    $separatorColor = trim(strip_tags($_POST['separatorColor']));
    $data = trim(strip_tags($_POST['data']));
    $showTitle = intval(trim(strip_tags($_POST['showTitle'])));
    $separatorSize = intval(trim(strip_tags($_POST['separatorSize'])));
    $separatorRadius = intval(trim(strip_tags($_POST['separatorRadius'])));
    $borderTop = intval(trim(strip_tags($_POST['borderTop'])));
    $borderBottom = intval(trim(strip_tags($_POST['borderBottom'])));
    $borderRight = intval(trim(strip_tags($_POST['borderRight'])));
    $borderLeft = intval(trim(strip_tags($_POST['borderLeft'])));
    $borderRadius = intval(trim(strip_tags($_POST['borderRadius'])));
    $modeAffichage = intval(trim(strip_tags($_POST['modeAffichage'])));
    $icon = trim(strip_tags($_POST['icon']));
    $font = trim(strip_tags($_POST['font']));
    $profilePic = trim(strip_tags($_POST['profilePic']));
    $iconSize = intval(trim(strip_tags($_POST['iconSize'])));
    $iconRadius = intval(trim(strip_tags($_POST['iconRadius'])));
    $idcv = intval(trim(strip_tags($_POST['idcv'])));
    $bddid = intval(trim(strip_tags($_POST['bddid'])));

    if($bddid !== -1){
        updateModule($name, $moduleid, $showname, $line, $width, $color, $fontColor, $separatorColor, $data, $showTitle, $separatorSize, $separatorRadius, $borderTop, $borderBottom, $borderRight, $borderLeft, $borderRadius, $modeAffichage, $icon, $font, $profilePic, $iconSize, $iconRadius, $bddid);
    }
    else{
        $newid = putModule($name, $moduleid, $showname, $line, $width, $color, $fontColor, $separatorColor, $data, $showTitle, $separatorSize, $separatorRadius, $borderTop, $borderBottom, $borderRight, $borderLeft, $borderRadius, $modeAffichage, $icon, $font, $profilePic, $iconSize, $iconRadius, $idcv);

        die(json_encode([
            'idbdd' => $newid,
            'idmodule' => $moduleid
        ]));
    }

    die(json_encode(['bddid' => $bddid]));
}

elseif(strtolower(get_the_title()) === 'cvload'){
    if(empty($_GET['idcv'])){
        die('no cv id');
    }
    $id_cv = intval($_GET['idcv']);

    $sql = " SELECT * FROM nfj_cv WHERE id_cv = :id_cv";
    $query = $pdo->prepare($sql);
    $query->bindValue(':id_cv',$id_cv);
    $query->execute();
    $cvdata = $query->fetchAll();

    $sql = " SELECT * FROM nfj_modules WHERE module_id_cv_FK = :id_cv ORDER BY line_module, colone_module";
    $query = $pdo->prepare($sql);
    $query->bindValue(':id_cv',$id_cv);
    $query->execute();
    $modules = $query->fetchAll();
    $merge = array_merge($cvdata, $modules);
    die(json_encode($merge));
}