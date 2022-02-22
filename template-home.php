<?php
/* Template Name: HomePage */
get_header();
?>
<section id="home" style="background-color: <?= get_backcolor_by_role(); ?>;">
    <div class="wrap_home">
        <div class="home-item">
            <h2>Construisez votre CV et développez votre visibilité</h2>
            <p>Découvrez notre éditeur pour personnaliser votre CV et gagnez en visibilité auprès des recruteurs !</p>
            <a href="<?=  path('editor'); ?>"><button style="background-color: <?= get_color_by_role(); ?>" class="home-btn blue">Découvrir l'éditeur</button></a>
        </div>
        <div class="home-item">
            <img src="<?= get_template_directory_uri(); ?>/asset/img/gif_editor.gif" alt="éditeur" />
        </div>
    </div>
    <div class="wrap_home <?php if(is_recruteur()){echo 'oranged';} ?>">
        <div class="home-item">
            <h2>Une équipe dynamique et à l'écoute</h2>
            <p>NFactoryJob est constitué d'une équipe dynamique, toujours à la recherche de nouvelles opportunités correspondantes à votre profil !</p>
        </div>
        <div class="home-item">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/GpOBhKGWsv8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    <div class="wrap_home centered">
        <div class="home-item">
            <h2>N'attendez plus<br /></h2>
            <a href="<?=  path('inscription'); ?>"><button class="home-btn green">Créer un compte</button></a>
            <a href="<?=  path('editor'); ?>"><button class="home-btn blue">Découvrir l'éditeur</button></a>
        </div>
    </div>
</section>

<?php
get_footer();
