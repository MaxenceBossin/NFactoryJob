<?php
/** Template Name: Editor **/

// permet la connexion pdo
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/toolbox.php');

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

echo "<script>const HOME_URL = '".get_site_url()."/';</script>";

get_footer();
