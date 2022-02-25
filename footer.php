<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package nfactoryjob
 */

?>

<section id="footer-map" style="background-color: <?= get_backcolor_by_role(); ?>;">
    <div class="wrap_footer">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.862993344376!2d1.0790240159175741!3d49.43040416821315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e0df1548cd768b%3A0x70b4b34959b1ec9f!2sNeed%20for%20School!5e0!3m2!1sfr!2sfr!4v1644920787766!5m2!1sfr!2sfr" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
</section>

<footer id="footer">
	<div class="wrap_footer">
        <?= get_good_logo(); ?>
        <?php
        if(!is_user_logged_in()){
            ?>
            <div class="links">
                <a class="foot-link" href="<?=  path('inscription'); ?>"><button>Créer un compte</button></a>
                <a class="foot-link" href="<?=  path('connexion'); ?>"><button>Connexion</button></a>
            </div>
        <?php
        }
        ?>
        <p class="foot-text">© Copyright NFactoryJob, 2022.</p>
	</div>
</footer><!-- #colophon -->

<script>const PAGE_NAME = '<?= get_page_template_slug(); ?>';</script>
<script>const SITE_URL = '<?= get_site_url(); ?>/';</script>
<script>const THEME_URL = '<?= get_template_directory_uri(); ?>/';</script>
<?php
if(is_recruteur()){
    ?>
    <script>const RECRUTEUR = true;</script>
<?php
}
else{
    ?>
    <script>const RECRUTEUR = false;</script>
<?php
}
?>
<?php wp_footer(); ?>
</body>
</html>
