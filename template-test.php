<?php
/*Template Name: Test */
get_header();
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');
require_once('inc/functions/toolbox.php');



$toto = 'toto';
$toto .= ' boit de leau';
var_dump($toto);

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
echo site_url().'/api/getlangues/';
$arrayALL=[
    "competences" => [

        ['id'=> '1','nom' => 'PHP'],
        ['id'=> '2','nom' => 'JAVA'],
    ],
    "niveauCompetence" => 3,   

    "contrats"  => [
        ['id'=> '1', 'libelle' => 'stage'],
        ['id'=> '2', 'libelle' => 'alternance'],
    ],
    "metiers"  => [
        ['id'=> '1', 'libelle' => 'developpeur Web'],
        ['id'=> '2', 'libelle' => 'designeur Web']
    ],
    "langues"  => [
        ['id'=> '1', 'libelle' => 'Français'],
        ['id'=> '2', 'libelle' => 'Espagnol'],
    ],
    "niveauLangues" => 2,
    "softskills"  => [
        ['id'=> '1', 'libelle' => 'autonomie'],
        ['id'=> '2', 'libelle' => 'patient'],
    ],
    "diplomes"  => [
        ['id'=> '1', 'libelle' => 'BTS'],
    ],
    "niveauDiplomes" => 4,
    "emplacements"  => [
        ['id'=> '1', 'lieu' => 'Caen'],
        ['id'=> '2', 'lieu' => 'Rouen'],
    ],
    "dateReadyToWork" => '2022-02-01'
];
debug(rechercheCv($arrayALL, true ,true, false, true, true, true, true));
echo'<br>';
