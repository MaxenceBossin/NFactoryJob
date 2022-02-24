<?php
// requette création d'un CV
// On récupère ensuite l'ID du CV nouvellement créer 
// et ensuite on va pouvoir l'insérer dans les tables PIVOT
function putNewCv(string $libelle,string $createdAt, string  $backgroundColor = '#FFF',
string $version ='',$fkIdUser='', $fkIdMetier=''):void
{
    global $pdo;
    $libelle = cleanXssAjax($libelle);
    $createdAt = cleanXssAjax($createdAt);
    $backgroundColor = cleanXssAjax($backgroundColor);
    $version = cleanXssAjax($version);
    $fkIdUser = cleanXssAjax($fkIdUser);
    $fkIdMetier = cleanXssAjax($fkIdMetier);
    $sql = 'INSERT INTO `nfj_cv` (`intitule`, `version`, `created_at`, `id_user`, `id_metier_cv`, `background_color`)
    VALUES ( :libelle, :version, :createdAt, :fkIdUser, :fkIdMetier, :backgroundColor);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':libelle', $libelle);
    $query->bindValue(':createdAt', $createdAt);
    $query->bindValue(':backgroundColor', $backgroundColor);
    $query->bindValue(':version', $version);
    $query->bindValue(':fkIdUser', $fkIdUser);
    $query->bindValue(':fkIdMetier', $fkIdMetier);
    $query->execute();
}
// requete sur les jointures après la création d'un CV

function putNewCVHobie( $idCV,  $idLoisir, string $description = ''):void
{
    global $pdo;
    $idCv        = cleanXssAjax($idCV);
    $idLoisir    = cleanXssAjax($idLoisir);
    $description = cleanXssAjax($description);
    $description = (!empty($description)) ? ucfirst(strtolower($description)) : NULL;
    $sql = 'INSERT INTO `nfj_hobbies` ( `description_hobby`, `id_cv_hobby`, `id_loisir_hobby`) VALUES ( :description, :idCV, :idLoisir);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCV', $idCV);
    $query->bindValue(':idLoisir', $idLoisir);
    $query->bindValue(':description', $description);
    $query->execute();
}

function putNewRechecheContrat( $idCV, $typecontrat):void
{
    global $pdo;
    $idCv           = cleanXssAjax($idCV);
    $typecontrat    = cleanXssAjax($typecontrat);
    $sql ='INSERT INTO `nfj_contratrecherche` ( `id_cv_contratrecherche`, `id_typecontrat_contratrecherche`) VALUES ( :idCV, :typecontrat);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCV', $idCV);
    $query->bindValue(':typecontrat', $typecontrat);
    $query->execute();
}

function putNewEmplacementTravailCv($idCv, $idEmplacement, $readyToWorkAt = ''):void
{
    global $pdo;
    $idCv             = cleanXssAjax($idCv);
    $idEmplacement    = cleanXssAjax($idEmplacement);
    $readyToWorkAt    = cleanXssAjax($readyToWorkAt);
    $readyToWorkAt = (!empty($readyToWorkAt)) ? $readyToWorkAt : NULL;
    $sql ='INSERT INTO `nfj_cv_emplacement` (`id_cv_fk`, `id_emplacement_fk`, `readyToWorkAt`) VALUES ( :idCv, :idEmplacement, :readyToWorkAt);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':idCv', $idCv);
    $query->bindValue(':idEmplacement', $idEmplacement);
    $query->bindValue(':readyToWorkAt', $readyToWorkAt);
    $query->execute();
}

function putNewCvLangue( $idCv,  $idLangue , $niveau = '1'):void
{
    global $pdo;
    $idCv     = cleanXssAjax($idCv);
    $idLangue = cleanXssAjax($idLangue);
    $niveau   = cleanXssAjax($niveau);
    $sql      = 'INSERT INTO `nfj_cv_langue` ( `id_cv_fk`, `id_langue_fk`, `niveau`) VALUES ( :idCv, :idLangue, :niveau);';
    $query    = $pdo->prepare($sql);
    $query->bindValue(':idCv', $idCv);
    $query->bindValue(':idLangue', $idLangue);
    $query->bindValue(':niveau', $niveau);
    $query->execute();
}
function putNewSoftskill( $idCv, $idSoftskill, string $description = ''):void
{
    global $pdo;
    $idCv     = cleanXssAjax($idCv);
    $idSoftskill = cleanXssAjax($idSoftskill);
    $description = cleanXssAjax($description);
    $description = (!empty($description)) ? ucfirst(strtolower($description)) : NULL;
    $sql      = 'INSERT INTO `nfj_cv_softskill` (`id_cv_fk`, `id_softskill_fk`, `description_softskill`) VALUES ( :idCv, :idSoftskill, :description);';
    $query    = $pdo->prepare($sql);
    $query->bindValue(':idCv', $idCv);
    $query->bindValue(':idSoftskill', $idSoftskill);
    $query->bindValue(':description', $description);
    $query->execute();
}

function putNewCompetence($idCv,  $idCompetence , $niveau = '1', $description = ''):void
{
    global $pdo;
    $idCv         = cleanXssAjax($idCv);
    $idCompetence = cleanXssAjax($idCompetence);
    $niveau       = cleanXssAjax($niveau);
    $description  = cleanXssAjax($description);
    $description = (!empty($description)) ? ucfirst(strtolower($description)) : NULL;
    $sql      = 'INSERT INTO `nfj_cv_competences` ( `id_cv_fk`, `id_competence_fk`, `created_at`, `niveau`, `description`) VALUES ( :idCv, :idCompetence, NULL, :niveau, :description);';
    $query    = $pdo->prepare($sql);
    $query->bindValue(':idCv', $idCv);
    $query->bindValue(':idCompetence', $idCompetence);
    $query->bindValue(':niveau', $niveau);
    $query->bindValue(':description', $description);
    $query->execute();
}