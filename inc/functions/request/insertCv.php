<?php

function putNewCv(string $libelle,string $createdAt, string  $backgroundColor = '#FFF',string $version ='',$fkIdUser='', $fkIdMetier=''):void
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