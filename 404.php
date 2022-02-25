<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package nfactoryjob
 */

get_header();
?>
<section id="errorpage">
    <h1>404</h1>
    <p>La page demandée n'existe pas</p>
    <a href="<?= get_site_url(); ?>"><button class="btn blue">Retour à l'accueil</button></a>

</section>
<?php
get_footer();
