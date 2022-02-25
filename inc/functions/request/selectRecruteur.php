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
// de base tout est mis à false comme ça si on fait un recherche on renvoit tous les CV
// le tableau $datas corespnd à un tableau assoatif contenant les infos envoyé en JS 
// Pour le premier tour de boucle on fait un AND( pour envelopper la partie ciblé
// en suite on fait un AND pour lié les partie entres elles




function rechercheCv ($datas){
    global $pdo;
    // l'objet JSON transfomé en tableau PHP
    $datas = json_decode($datas, true) ;
    $joinCompetences = '';
    $andCompetence   = '';
    // liste des compétences
    if(!empty($datas['competences'])){
        
        $i=0;
        $imax = count($datas['competences']);
        $niveau = (!empty($datas['niveauCompetence'])) ? $datas['niveauCompetence'] : '0';
        $joinCompetences = 'JOIN `nfj_cv_competences` ON `nfj_cv_competences`.`id_cv_fk` = `nfj_cv`.`id_cv`';
        foreach ($datas['competences'] as $competence){
            $id     = $competence['id_competence'];
            // on commence par ajputer une parenthèse pour le début de la jointure ciblé)
            $andOr       = ($i === 0) ? 'AND(' : 'OR';
            $i++;
            // on la referme une fois le tableau entièrement parcourus pour passer à la suite (même proccesus pour les autres jointures)
            $endAnd      = ($i === $imax) ? ' )' : '';
            $andCompetence .= ' '.$andOr.' `nfj_cv_competences`.`id_competence_fk` = '.$id;
            $andCompetence .= '  AND `nfj_cv_competences`.`niveau` >= '.$niveau.$endAnd;
        }
    };
    $joinContrats = '';
    $andContrats  = '';
    if(!empty($datas['contrats'])){
        // les contrat recherché sont trié en OU logique (on veut que la personne cherche un stage OU une alternance)
        $i=0;
        $imax = count($datas['contrats']);
        $joinContrats = 'JOIN `nfj_contratrecherche` ON `nfj_contratrecherche`.`id_cv_contratrecherche`  = `nfj_cv`.`id_cv`';
        foreach ($datas['contrats'] as $contrat){
            $idContrat = $contrat['id_typecontrat'];
            $andOr       = ($i === 0) ? 'AND(' : 'OR';
            $i++;
            $endAnd      = ($i === $imax) ? ' )' : '';
            $andContrats .= ' '. $andOr.' `nfj_contratrecherche`.`id_typecontrat_contratrecherche` = '.$idContrat.$endAnd;
        }
    }    
    $joinMetiers = '';
    $andMetiers  = '';
    if(!empty($datas['metiers'])){
        // on ne recheche qu'un métier par recheche
        $idMetier = $datas['metiers']['id_typemetier'];
        $i=0;
        $joinMetiers = 'JOIN `nfj_metier` ON  `nfj_metier`.`id_metier` = `nfj_cv`.`id_metier_cv`';
        $andMetiers .= 'AND( `nfj_metier`.`id_metier` = '.$idMetier.')';
    }
    $joinLangues = '';
    $andLangues  = '';
    if(!empty($datas['langues'])){
        $i=0;
        $imax = count($datas['langues']);
        $joinLangues = 'JOIN `nfj_cv_langue` ON `nfj_cv_langue`.`id_cv_fk` = `nfj_cv`.`id_cv`';
        foreach ($datas['langues'] as $langue){
            $idLangue = $langue['id_langue'];
            $andOr       = ($i === 0) ? 'AND(' : 'OR';
            $i++;
            $endAnd      = ($i === $imax) ? ' )' : '';
            $andLangues .= ' '.$andOr.' `nfj_cv_langue`.`id_langue_fk` = '.$idLangue.$endAnd;
        }
    }
    $joinSoftskills = '';
    $andSoftskills  = '';
    if(!empty($datas['softskills'])){
        // classé par OU logique
        $i=0;
        $imax = count($datas['softskills']);
        $joinSoftskills = 'JOIN `nfj_cv_softskill` ON `nfj_cv_softskill`.`id_cv_fk`  = `nfj_cv`.`id_cv`';
        foreach ($datas['softskills'] as $softskill){
            $idSoftskill = $softskill['id_softskill'];
            $andOr       = ($i === 0) ? 'AND(' : 'OR';
            $i++;
            $endAnd      = ($i === $imax) ? ' )' : '';
            $andSoftskills .= ' '.$andOr.' `nfj_cv_softskill`.`id_softskill_fk` = '.$idSoftskill.$endAnd;
        }
    }
    $joinDiplomes = '';
    $andDiplomes  = '';
    if(!empty($datas['diplomes'])){
        // On ne cherche le CV des personnes qui ont au moins le niveau de diplome requis 
        $niveauDiplome = (!empty($datas['niveauDiplomes']) ? $datas['niveauDiplomes'] : '0');     
        $idDiplome = $datas['diplomes'][0]['id_diplome'];
        $joinDiplomes = '
        JOIN `nfj_cv_diplome` ON `nfj_cv`.`id_cv` = `nfj_cv_diplome`.`id_cv_dcv`
        JOIN `nfj_diplome` ON `nfj_diplome`.`id_diplome` = `nfj_cv_diplome`.`id_diplome_dcv`
        JOIN `nfj_typediplome` ON `nfj_diplome`.`id_typediplome_diplome` = `nfj_typediplome`.`id_typediplome`
        ';
        $andDiplomes = 'AND( `nfj_typediplome`.`niveau_type_diplome` >= '.$niveauDiplome.')';        
    }
    $joinEmplacement = '';
    $andEmplacement  = '';
    if(!empty($datas['emplacements'])){
        // OU logique
        $i=0;
        $imax = count($datas['emplacements']);
        $joinEmplacement = 'JOIN `nfj_cv_emplacement` ON `nfj_cv_emplacement`.`id_cv_fk`  = `nfj_cv`.`id_cv`';
        // si on précise pas de date, on suppose que le c'est 0 ce qui fait en sorte que la date n'impacte la requette et prennent tous les résulats
        $dateReadyToWork = (!empty($datas['dateReadyToWork']) ? $datas['dateReadyToWork'] : 0);
        foreach ($datas['emplacements'] as $emplacement){
            $idEmplacement = $emplacement['id_emplacement'];
            $andOr       = ($i === 0) ? 'AND(' : 'OR';
            $i++;
            $endAnd      = ($i === $imax) ? ' )' : '';
            $andEmplacement .= ' '.$andOr.' `nfj_cv_emplacement`.`id_emplacement_fk` = '.$idEmplacement;
            $andEmplacement .= '  AND `nfj_cv_emplacement`.`readyToWorkAt` >= '.$dateReadyToWork.$endAnd;
        }
    }
    $sql = "
    SELECT DISTINCT `nfj_cv`.`id_cv`,`nfj_cv`. `intitule`, `nfj_cv`.`version`,`nfj_cv`.`created_at`,`nfj_cv`.`modified_at`
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
    ORDER BY `nfj_cv`.`created_at` DESC
    ";
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
