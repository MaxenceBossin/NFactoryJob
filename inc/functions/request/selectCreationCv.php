<?php
//OK: getLangues
function getLangues():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_langues` ";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getSoftSkills
function getSoftSkills():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_softskill` ";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getCompetences
function getCompetences():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_competences`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getEmplacement
function getEmplacement():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_emplacement`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getLoisir
function getLoisir():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_loisirs`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getEtablisment
function getEtablissement():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_etablissement`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getTypeSecteur

function getTypeMetier():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_typemetier`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getTypeEtablisement
function getTypeEtablisement():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_typeetablissement`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getTypeDiplome
function getTypeDiplome():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_typediplome`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
//OK: getTypeContrat
function getTypeContrat():array
{
    global $pdo;
    $sql = "SELECT * FROM `nfj_typecontrat`";
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}
