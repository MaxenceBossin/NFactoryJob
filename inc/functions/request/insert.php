<?php

function putModule(string $nameModule, int $ligneModule, int $coloneModule, string $showNameModule, int $lineModule, 
int $widthModule, string $colormodule, string $fontColorModule, string $separatorColorModule, string $dataModule,
int $showTitleModule, int $separatorSizeModule, int $separatorRadiusModule, int $borderTopModule, int $borderBottomModule,
int $borderRightModule, int $borderLeftModule, int $borderRadiusModule, int $modeAffichageModule, string $iconModule,
string $fontModule, string $profilPictureModule, int $iconSizeModule, int $iconRadiusModule, int $moduleIdCv_FK )
{
    global $pdo;
    $sql = "INSERT INTO `nfj_modules` 
    (
    `name_module`, `ligne_module`, `colone_module`, `show_name_module`, `line_module`, 
    `width_module`, `color_module`, `font_color_module`,  `separator_color_module`,  `data_module`, 
    `show_title_module`, `separator_size_module`, `separator_radius_module`,`border_top_module`,`border_bottom_module`, 
    `border_right_module`,`border_left_module`,`border_radius_module`,`modeAffichage_module`,`icon_module`, 
    `font_module`,`profil_picture_module`,`icon_size_module`, `icon_radius_module`,`module_id_cv_FK`
    ) 
    VALUES (:nameModule, :ligneModule, :coloneModule, :showNameModule, :lineModule,
    :widthModule, :colormodule, :fontColorModule, :separatorColorModule, :dataModule,
    :showTitleModule,:separatorSizeModule, :separatorRadiusModule, :borderTopModule, :borderBottomModule, 
    :borderRightModule, :borderLeftModule, :borderRadiusModule, :modeAffichageModule, :iconModule,
    :fontModule, :profilPictureModule, :iconSizeModule, :iconRadiusModule, :moduleIdCv_FK)";
    $query = $pdo->prepare($sql);
    $query->bindValue(':nameModule', $nameModule);
    $query->bindValue(':ligneModule', $ligneModule, PDO::PARAM_INT);
    $query->bindValue(':coloneModule', $coloneModule, PDO::PARAM_INT);
    $query->bindValue(':showNameModule', $showNameModule);
    $query->bindValue(':lineModule', $lineModule, PDO::PARAM_INT);
    $query->bindValue(':widthModule', $widthModule, PDO::PARAM_INT);
    $query->bindValue(':colormodule', $colormodule);
    $query->bindValue(':fontColorModule', $fontColorModule);
    $query->bindValue(':separatorColorModule', $separatorColorModule);
    $query->bindValue(':dataModule', $dataModule);
    $query->bindValue(':showTitleModule', $showTitleModule, PDO::PARAM_INT);
    $query->bindValue(':separatorSizeModule', $separatorSizeModule, PDO::PARAM_INT);
    $query->bindValue(':separatorRadiusModule', $separatorRadiusModule, PDO::PARAM_INT);
    $query->bindValue(':borderTopModule', $borderTopModule, PDO::PARAM_INT);
    $query->bindValue(':borderBottomModule', $borderBottomModule, PDO::PARAM_INT);
    $query->bindValue(':borderRightModule', $borderRightModule, PDO::PARAM_INT);
    $query->bindValue(':borderLeftModule', $borderLeftModule, PDO::PARAM_INT);
    $query->bindValue(':borderRadiusModule', $borderRadiusModule, PDO::PARAM_INT);
    $query->bindValue(':modeAffichageModule', $modeAffichageModule, PDO::PARAM_INT);
    $query->bindValue(':iconModule', $iconModule);
    $query->bindValue(':fontModule', $fontModule);
    $query->bindValue(':profilPictureModule', $profilPictureModule);
    $query->bindValue(':iconSizeModule', $iconSizeModule, PDO::PARAM_INT);
    $query->bindValue(':iconRadiusModule', $iconRadiusModule, PDO::PARAM_INT);
    $query->bindValue(':moduleIdCv_FK', $moduleIdCv_FK, PDO::PARAM_INT);
    $query->execute();
}


// requete 
function newEmplacement(string $departement, string $ville,string $cp):void
{
    global $pdo;
    $departement = cleanXssAjax($departement);
    $ville       = cleanXssAjax($ville);
    $cp          = cleanXssAjax($cp);
    $sql = 'INSERT INTO `nfj_emplacement` (`departement`, `ville`, `cp`) VALUES ( :departement, :ville, :cp);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':departement', $departement);
    $query->bindValue(':ville', $ville);
    $query->bindValue(':cp', $cp);
    $query->execute();
}

function newLangue(string $langue):void
{
    global $pdo;
    $langue = cleanXssAjax($langue);
    $langue = ucfirst(strtolower($langue));
    $sql = 'INSERT INTO `nfj_langues` (`libelle_langue`) VALUES (:langue);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':langue', $langue);
    $query->execute();
}

function newSoftSkill($softskill):void
{
    global $pdo;
    $softskill = cleanXssAjax($softskill);
    $softskill = strtolower($softskill);
    $sql = 'INSERT INTO `nfj_softskill` (`libelle_softskill`) VALUES (:softskill);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':softskill', $softskill);
    $query->execute();
}
function newCompetence($competence):void
{
    global $pdo;
    $competence = cleanXssAjax($competence);
    $sql = 'INSERT INTO `nfj_competences` (`libelle`) VALUES (:competence);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':competence', $competence);
    $query->execute();
}
function newMetier($metier):void
{
    global $pdo;
    $metier = cleanXssAjax($metier);
    $metier = strtolower($metier);
    $sql = 'INSERT INTO `nfj_metier` (`libelle_metier`) VALUES (:metier);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':metier', $metier);
    $query->execute();
}

//prend les clef étrangère (bdd sécu PHP à faire)
function newDiplome(string $libelle, int $fkTypeDiplome, int $fkTypeSecteur):void
{
    global $pdo;
    $libelle = cleanXssAjax($libelle);
    $libelle = ucfirst(strtolower($libelle));
    $fkTypeDiplome = cleanXssAjax($fkTypeDiplome);
    $fkTypeSecteur = cleanXssAjax($fkTypeSecteur);
    $sql = 'INSERT INTO `nfj_diplome` ( `intitule_diplome`, `id_typediplome_diplome`, `id_typesecteur_diplome`) VALUES (:libelle, :fkTypeDiplome, :fkTypeSecteur);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':libelle', $libelle);
    $query->bindValue(':fkTypeDiplome', $fkTypeDiplome);
    $query->bindValue(':fkTypeSecteur', $fkTypeSecteur);
    $query->execute();
}
function newEtablissement(string $nom, int $fkTypeEtablissement, int $fkEmplacement):void
{
    global $pdo;
    $nom = cleanXssAjax($nom);
    $nom = ucfirst(strtolower($nom));
    $fkTypeDiplome = cleanXssAjax($fkTypeEtablissement);
    $fkTypeSecteur = cleanXssAjax($fkEmplacement);
    $sql = 'INSERT INTO `nfj_etablissement` ( `nom_etablissement`, `id_typeEtablissement`, `id_emplacement_etablissement`)  VALUES (:nom, :fkTypeEtablissement, :fkEmplacement);';
    $query = $pdo->prepare($sql);
    $query->bindValue(':nom', $nom);
    $query->bindValue(':fkTypeEtablissement', $fkTypeEtablissement);
    $query->bindValue(':fkEmplacement', $fkEmplacement);
    $query->execute();
}
