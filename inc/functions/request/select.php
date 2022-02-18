<?php
// TODO: rajouter le pdo
// TODO: faire des requete preparé


// recup cv user
function getCvFromUser(int $idUser):array
{
    $sql = "SELECT * FROM `nfj_cv` WHERE `id_user` = 1;";
}


// recupère tous les emplecement pour le quel le cv du candidat peut travailer
function getLocationWhereCVCanWork(int $idCv):array
{
    $sql = "SELECT * 
            FROM nfj_emplacement 
            INNER JOIN nfj_cv_emplacement 
            WHERE nfj_emplacement.id_emplacement = nfj_cv_emplacement.id_emplacement_fk 
            AND `id_cv_fk` = 1";
}


// recupère tous les loisir + description d'un CV
function getRecreationFromCV(int $idCv):array
{
    $sql = " SELECT description_hobby as description, libelle_loisir as loisir 
    FROM nfj_hobbies 
    INNER JOIN nfj_loisirs 
    WHERE nfj_loisirs.id_loisir = nfj_hobbies.id_hobby 
    AND `id_cv_hobby` = 1;    
    ";
}

// recupère toutes les langues et leur niveau de maitrise d'un CV

function getSkillLangageFromCv(int $idCv):array
{
    $sql = " SELECT libelle_langue as langue, niveau 
    FROM nfj_langues 
    INNER JOIN nfj_cv_langue 
    WHERE nfj_langues.id_langue = nfj_cv_langue.id_cv_langue
    AND `id_cv_langue` = 1;   
    ";
}


// recupère toutes les sofkills  d'un CV

function getSoftSkillFromCv(int $idCv):array
{
    $sql = " SELECT libelle_softskill as softskill 
    FROM nfj_softskill 
    INNER JOIN nfj_cv_softskill 
    WHERE nfj_softskill.id_softskill = nfj_cv_softskill.id_cv_softskill 
    AND `id_cv_fk` = 1;  
    ";
}


// recupère toutes les sofkills  d'un CV