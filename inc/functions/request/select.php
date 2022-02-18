<?php


// recup cv user
function getCvFromUser(int $idUser):array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_cv` WHERE `id_user` = :idUser";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idUser',$idUser);
    $query->execute();
    return $query->fetchAll();
}

/*
* Pour les requètes get ... FromCV, on recupère l'ensemble des données présente en base grace à l'id du cv
*/

// recupère tous les emplecement pour le quel le cv du candidat peut travailer
function getLocationWhereCVCanWorkFromCV(int $idCv):array
{
    global $pdo;
    $sql = "SELECT departement, ville, cp, readyToWorkAt as dateReadyToWorkAt
            FROM nfj_emplacement 
            INNER JOIN nfj_cv_emplacement 
            WHERE nfj_emplacement.id_emplacement = nfj_cv_emplacement.id_emplacement_fk 
            AND `id_cv_fk` = :idCv";
    $query = $pdo->prepare($sql);        
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();        
}


// recupère tous les loisir + description d'un CV
function getRecreationFromCV(int $idCv):array
{
    global $pdo;
    $sql = " SELECT description_hobby as description, libelle_loisir as loisir
    FROM nfj_hobbies 
    INNER JOIN nfj_loisirs 
    WHERE nfj_loisirs.id_loisir = nfj_hobbies.id_hobby 
    AND `id_cv_hobby` = :idCv;    
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();
}

// recupère toutes les langues et leur niveau de maitrise d'un CV
function getSkillLangageFromCv(int $idCv):array
{
    global $pdo;
    $sql = " SELECT  `nfj_langues`.`libelle_langue` as langue, `nfj_cv_langue`.`niveau`  as niveau
    FROM nfj_langues 
    INNER JOIN nfj_cv_langue 
    WHERE nfj_langues.id_langue = nfj_cv_langue.id_cv_langue
    AND `nfj_cv_langue`.`id_cv_fk`  = :idCv;   
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();
}


// recupère toutes les sofkills  d'un CV
function getSoftSkillFromCv(int $idCv):array
{
    global $pdo;
    $sql = " SELECT libelle_softskill as softskill
    FROM nfj_softskill 
    INNER JOIN nfj_cv_softskill 
    WHERE nfj_softskill.id_softskill = nfj_cv_softskill.id_cv_softskill 
    AND `id_cv_fk` = :idCv;  
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();
}


// recupère toutes les compétence présente dans un cv
function getCompetenceFromCv(int $idCv):array
{
    global $pdo;
    $sql = " SELECT libelle as nomCompetence, niveau, description
    FROM nfj_competences 
    INNER JOIN nfj_cv_competences 
    WHERE `nfj_competences`.`id_competence`  = `nfj_cv_competences`.`id_competence_fk`
    AND `id_cv_fk` = :idCv;  
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();
}

// recupère tous les diplome d' un cv
function getDiplomeFromCv(int $idCv):array
{
    global $pdo;
    $sql = " SELECT
    `date_debut_dcv` as `dateDebut`,
    `date_fin_dcv` as `dateFin`, 
    `description_dcv` as `description`, 
    `intitule_diplome` as `libelle`, 
    `libelle_type_diplome`as `typeDiplome`, 
    `niveau_type_diplome`as `bacNiveau`, `departement`,
    `ville`, `cp`, `nom_etablissement` as `etablissement`    
    FROM `nfj_cv_diplome` 
    JOIN `nfj_diplome` 
        ON `nfj_cv_diplome`.`id_diplome_dcv` = `nfj_diplome`.`id_diplome` 
    JOIN `nfj_etablissement` 
        ON `nfj_cv_diplome`.`id_etablisement_dcv`= `nfj_etablissement`.`id_etablissement` 
    JOIN `nfj_emplacement` 
        ON `nfj_etablissement`.`id_emplacement_etablissement` = `nfj_emplacement`.`id_emplacement` 
    JOIN `nfj_typediplome` ON `nfj_typediplome`.`id_typediplome` = `nfj_diplome`.`id_diplome` 
    
    WHERE `nfj_cv_diplome`.`id_cv_dcv` = :idCv;  
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv',$idCv);
    $query->execute();
    return $query->fetchAll();
}   



// requete pour la création d'un CV