<?php
/** Template Name: Dashboard **/

// permet la connexion pdo
require_once "config.php";
require_once('inc/functions/request/pdo.php');
require_once('inc/functions/request/selectRecruteur.php');
require_once('inc/functions/toolbox.php');

if(!is_user_logged_in()){
    header('Location: ' . get_site_url());
    die();
}

$isRecruteur = is_recruteur();

get_header();
?>
<section id="dashboard" class="wrap">

    <div class="filters"><!-- généré en js --></div>
    <div class="all-cv">
        <div class="search"><!-- généré en js --></div>
        <table id="search-table">
            <tbody><!-- généré en js -->
            <!-- <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
            </tr> --></tbody>
        </table>
    </div>
</section>

<?php
get_footer();
