<?php
require_once('inc/fonctions/toolbox.php');

// CONSTANTES
// On définit la constante ROOTDIR en appelant la fonction getCurrentFile()
define('ROOTDIR', getCurrentFile());

// DATABASE

$bdd      ='DB_NAME';
$serveur  ='DB_HOST';
$username = 'DB_USER';
$password = 'DB_PASSWORD';