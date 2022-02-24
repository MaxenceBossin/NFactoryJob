<?php
/** Template Name: Editor **/

// permet la connexion pdo
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/toolbox.php');

$idCv = 0;
$canEdit = true;
if(!empty($_GET['id'])){
    $idCv = intval($_GET['id']);
    $sql = "SELECT * FROM nfj_cv WHERE id_cv = :id_cv";
    $query = $pdo->prepare($sql);
    $query->bindValue(':id_cv', $idCv, PDO::PARAM_INT);
    $query->execute();
    $CV = $query->fetch();

    if(!empty($CV)){
        if(is_user_logged_in()){
            if(get_current_user_id() === $CV['id_user']){
                $canEdit = true;
            }
            else{
                $canEdit = false;
            }
        }
        else{
            $canEdit = false;
        }
    }
    else{
        $canEdit = true;
        $idCv = 0;
    }
}

get_header();
?>
    <div id="cv">
        <div class="wrap_cv" data-backcol="#FFFFFF">
            <div class="modules"><!-- généré en js --></div>
        </div>
    </div>

    <div id="save-notif"><p></p></div>
    <div id="quit-preview"><button>Revenir à l'éditeur</button></div>

    <div id="onglet_editor">
        <div class="attached">
            <div id="btn-onglet"><i></i></div>
        </div>
        <div class="onglets_parts">
            <button id="btn-onglet-general" class="selected">Général</button>
            <button id="btn-onglet-module">Module sélectionné</button>
        </div>
        <div class="content">
            <div class="content-general">
                <!-- généré en js -->
            </div>
            <div class="content-module">
                <!-- généré en js -->
            </div>
        </div>
    </div>

    <div id="preview-infos"><div class="content"><p></p></div></div>
<?php

echo "<script>const SIGNUP_URL = '".get_page_url('template-signup')."';</script>";
if(is_user_logged_in()){echo "<script>const LOGGED = 1;</script>";}
else{echo "<script>const LOGGED = 0;</script>";}

if($idCv <= 0){
    $sql = "SELECT MAX(id_cv) FROM nfj_cv";
    $query = $pdo->prepare($sql);
    $query->execute();
    $maxid = intval($query->fetchColumn()) + 1;
    $idCv = $maxid;
}
echo "<script>const CV_ID = ".$idCv.";</script>";

if($canEdit){
    echo "<script>const READONLY = false;</script>";
}
else{
    echo "<script>const READONLY = true;</script>";
}

get_footer();
