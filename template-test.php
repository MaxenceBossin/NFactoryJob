<?php
/*Template Name: Test */
get_header();
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');
require_once('inc/functions/toolbox.php');






echo " OK: recup cv user ";
// debug(getCvFromUser(1));
echo'<br>';
echo "OK recupère tous les loisir + description d'un CV";
//  debug(getRecreationFromCV(1));
echo'<br>';
echo " OK : recupère tous les emplecement pour le quel le cv du candidat peut travailer ";
// debug(getLocationWhereCVCanWorkFromCV(1));
echo'<br>';
echo " OK: recupère toutes les langues et leur niveau de maitrise d'un CV ";
// debug(getSkillLangageFromCv(1));
echo'<br>';
echo " OK: recupère toutes les sofkills  d'un CV ";
// debug(getSoftSkillFromCv(1));
echo'<br>';
echo " OK: recupère toutes les compétence présente dans un cv ";
// debug(getCompetenceFromCv(1));
echo'<br>';
echo " OK: recupère tous les diplome d' un cv ";
// debug(getDiplomeFromCv(1));
echo'<br>';
echo " OK: liscv par competences ";
// debug(getCVByCompetence('php'));
// debug(getCVBySoftSkill('autonomie'));
// debug(getCVBySoftSkill("à l'écoute"));
echo'<br>';

$array=[
    "competences" => [
        ['id'=> 'com','nom' => 'PHP', 'niveau' => 1],
        ['nom' => 'JAVA', 'niveau' => 2],
    ],
    "contrat"  => [

    ]
  


];
debug($array);
// debug(test(true, $array));
echo'<br>';
