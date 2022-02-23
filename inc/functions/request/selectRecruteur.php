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



// requete pour la page qui recherche un candiat en fonction des ces comptences (unique)
function getCVByCompetence($idComptence, $niveau = 0){
    global $pdo;
    $sql = " SELECT `id_cv_fk` as IdCv
    FROM `nfj_cv_competences` 
    JOIN `nfj_competences` 
        ON `nfj_cv_competences`.`id_competence_fk`= `nfj_competences`.`id_competence`
    WHERE `nfj_competences`.`id_competence` = :idComptence
    AND `niveau` > :niveau
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idComptence',$idComptence);
    $query->bindValue(':niveau',$niveau);
    $query->execute();
    return $query->fetchAll();
}


function getCVBySoftSkill($idSoftskill){
    global $pdo;
    $sql = " SELECT `id_cv_fk` as IdCV 
    FROM `nfj_cv_softskill` 
    JOIN `nfj_softskill` 
        ON `nfj_softskill`.`id_softskill`= `nfj_cv_softskill`.`id_softskill_fk` 
        WHERE `nfj_softskill`.`id_softskill` = :idSoftskill
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idSoftskill',$idSoftskill);
    $query->execute();
    return $query->fetchAll();
}


function getCVByLangue($idLangue){
    global $pdo;
    $sql = " SELECT `id_cv_fk` as IdCV 
    FROM `nfj_cv_langue` 
    JOIN `nfj_langues` ON `nfj_langues`.`id_langue`= `nfj_cv_langue`.`id_langue_fk` 
    WHERE `nfj_langues`.`id_langue` = :idLangue;
    ";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idLangue',$idLangue);
    $query->execute();
    return $query->fetchAll();
}

function getCVByEmplacement($idEmplacement, $dateReadyToWork = 0){
    global $pdo;
    $sql = "
    SELECT `id_cv_fk` as IdCV, `readyToWorkAt` 
    FROM `nfj_cv_emplacement`
    JOIN `nfj_emplacement` 
    ON `nfj_emplacement`.`id_emplacement` = `nfj_cv_emplacement`.`id_emplacement_fk` 
    WHERE `nfj_emplacement`.`id_emplacement` = :idEmplacement
    AND `readyToWorkAt` > :date 
    ";  
    $query = $pdo->prepare($sql);
    $query->bindValue(':idEmplacement',$idEmplacement);
    $query->bindValue(':date',$dateReadyToWork);
    $query->execute();
    return $query->fetchAll();
}
// on adapte la fonction SQL en fonction des besoin
// de base tout est mis à false comme ça si on fait un recher on renvoit tous les CV
// le tableau $datas corespnd à un tableau assoatif contenant les infos envoyé en JS 

function rechercheCv (array $datas, bool $competences = false, bool $contrats = false, bool $metiers = false ,bool $langues = false, bool $softskills = false, bool $diplomes = false, bool $emplacements = false){
    global $pdo;
    $joinCompetences = '';
    $andCompetence   = '';
    // liste des compétences
    if($competences === true){
        $i=0;
        $niveau = $datas['niveauCompetence'];
        $joinCompetences = 'JOIN `nfj_cv_competences` ON `nfj_cv_competences`.`id_cv_competence`  = `nfj_cv`.`id_cv`';
        foreach ($datas['competences'] as $competence){
            debug($competence);
            $id     = $competence['id'];
            // pour faire un AND en premier tours puis un Or pour ceux d'apres
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andCompetence .= ' '.$andOr.' `nfj_cv_competences`.`id_competence_fk` = '.$id;
            $andCompetence .= '  AND `nfj_cv_competences`.`niveau` >= '.$niveau;
        }
    };
    $joinContrats = '';
    $andContrats  = '';
    if($contrats === true){
        $i=0;
        $joinContrats = 'JOIN `nfj_contratrecherche` ON `nfj_contratrecherche`.`id_contratrecherche`  = `nfj_cv`.`id_cv`';
        foreach ($datas['competences'] as $contrat){
            $idContrat = $contrat['id'];
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andContrats .= ' '. $andOr.' `nfj_contratrecherche`.`id_typecontrat_contratrecherche` = '.$idContrat;
        }
    }    
    $joinMetiers = '';
    $andMetiers  = '';
    if($metiers === true){
        $i=0;
        $joinMetiers = 'JOIN `nfj_metier` ON  `nfj_metier`.`id_metier` = `nfj_cv`.`id_metier_cv`';
        foreach ($datas['metiers'] as $metier){
            $idMetier = $metier['id'];
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andMetiers .= ' '.$andOr.' `nfj_metier`.`id_metier` = '.$idMetier;
        }
    }
    $joinLangues = '';
    $andLangues  = '';
    if($langues === true){
        $i=0;
        $joinLangues = 'JOIN `nfj_cv_langue` ON `nfj_cv_langue`.`id_cv_fk` = `nfj_cv`.`id_cv`';
        foreach ($datas['langues'] as $langue){
            $idLangue = $langue['id'];
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andLangues .= ' '.$andOr.' `nfj_cv_langue`.`id_langue_fk` = '.$idLangue;
        }
    }
    $joinSoftskills = '';
    $andSoftskills  = '';
    if($softskills === true){
        $i=0;
        $joinSoftskills = 'JOIN `nfj_cv_softskill` ON `nfj_cv_softskill`.`id_cv_fk`  = `nfj_cv`.`id_cv`';
        foreach ($datas['softskills'] as $softskill){
            $idSoftskill = $softskill['id'];
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andSoftskills .= ' '.$andOr.' `nfj_cv_softskill`.`id_softskill_fk` = '.$idSoftskill;
        }
    }
    $joinDiplomes = '';
    $andDiplomes  = '';
    if($diplomes === true){
        $niveauDiplome = $datas['niveauDiplomes'];     
        $idDiplome = $datas['diplomes'][0]['id'];
        $joinDiplomes = '
        JOIN `nfj_cv_diplome` ON `nfj_cv`.`id_cv` = `nfj_cv_diplome`.`id_cv_dcv`
        JOIN `nfj_diplome` ON `nfj_diplome`.`id_diplome` = `nfj_cv_diplome`.`id_diplome_dcv`
        JOIN `nfj_typediplome` ON `nfj_diplome`.`id_typediplome_diplome` = `nfj_typediplome`.`id_typediplome`
        ';
        $andDiplomes = 'AND `nfj_typediplome`.`niveau_type_diplome` >= '.$niveauDiplome.'';        
    }
    $joinEmplacement = '';
    $andEmplacement  = '';
    if($emplacements === true){
        $i=0;
        $joinEmplacement = 'JOIN `nfj_cv_emplacement` ON `nfj_cv_emplacement`.`id_cv_fk`  = `nfj_cv`.`id_cv`';
        // si on précise pas de date, on suppose que le c'est 0 ce qui fait en sorte que la date n'impacte la requette et prennent tous les résulats
        $dateReadyToWork = (!empty($datas['dateReadyToWork']) ? $datas['dateReadyToWork'] : 0);
        foreach ($datas['emplacements'] as $emplacement){
            $idEmplacement = $emplacement['id'];
            $andOr       = ($i === 0) ? 'AND' : 'OR';
            $i++;
            $andEmplacement .= ' '.$andOr.' `nfj_cv_emplacement`.`id_emplacement_fk` = '.$idEmplacement;
            $andEmplacement .= '  AND `nfj_cv_emplacement`.`readyToWorkAt` >= '.$dateReadyToWork;
        }
    }
    $sql = "
    SELECT DISTINCT `id_cv`
    FROM `nfj_cv` 
    $joinCompetences
    $joinContrats
    $joinMetiers
    $joinLangues
    $joinSoftskills
    $joinDiplomes
    $joinEmplacement
    
    WHERE 1
    $andCompetence
    $andContrats
    $andMetiers
    $andLangues
    $andSoftskills
    $andDiplomes
    $andEmplacement
    ";
    //echo $sql;
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();

}

// ajouts

function getCV(int $idCv):array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_cv` WHERE `id_cv` = :idCV";
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCV',$idCv);
    $query->execute();
    return $query->fetch();
}