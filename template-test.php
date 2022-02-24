<?php
/*Template Name: Test */
get_header();
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/request/selectCreationCv.php');
require_once('inc/functions/request/insertCv.php');
require_once('inc/functions/request/insert.php');
require_once('inc/functions/toolbox.php');

// putNewCvDiplome(11,2,3,'2021-02-24');
// putNewCvDiplome(5,2,3,'2020-02-24','2022-02-24','test description cv 5');
// putNewCvDiplome("2","10","4",'2020-02-24');
// putNewCvPost('description test','2020-02-24','2021-02-24','11','5','2','1');
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
        ['id'=> '3','nom' => 'C#'],
        ['id'=> '4','nom' => 'JS'],
    ],
    "niveauCompetence" => 3,   

    "contrats"  => [
        ['id'=> '1', 'libelle' => 'stage'],
        ['id'=> '2', 'libelle' => 'alternance'],
        ['id'=> '3', 'libelle' => 'lel'],
    ],
    "metiers"  => 2,

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
        ['id'=> '3', 'lieu' => 'Caen'],
        ['id'=> '1', 'lieu' => 'Caen'],
        ['id'=> '2', 'lieu' => 'Caen'],
    ],
    "dateReadyToWork" => '2022-02-01'
];

$objJson = '
        {"emplacements":
        [
            {"id_emplacement":"1","departement":"Calvados","cp":"14000"},
            {"id_emplacement":"2","departement":"Calvados","cp":"14000"}
        ],
        "dateReadyToWork": "2022-02-02  ",
        "contrats":
        [
            {"id_typecontrat":"1"},       
            {"id_typecontrat":"2"},       
            {"id_typecontrat":"3"}      
        ],
        "diplomes":
        [
            {"id_diplome":"1"},       
            {"id_diplome":"2"}      

        ],
        "niveauDiplomes": "4",
        "competences":
        [
            {"id_competence":"1"},
            {"id_competence":"2"},
            {"id_competence":"3"}
        ],
        "softskills":
        [
            {"id_softskill":"1"},
            {"id_softskill":"2"},
            {"id_softskill":"3"}
        ],
        "id_metier": "1",
        "langues":
        [
            {"id_langue":"1"},
            {"id_langue":"2"},
            {"id_langue":"3"}
        ]
    }';
$objetDecode2 = json_decode($objJson, true) ; 
debug($objetDecode2) ;

echo'<br>';
echo'<br>';
echo'<br>';
debug(rechercheCv($objJson, true ,true, true , true, true, true, true));
echo'<br>';
