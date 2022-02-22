<?php
/* Template Name: HomePage */
get_header();
?>
<div class="wrap_home">
    <section id="image">
        <?php $metas = get_post_meta(get_the_ID());?>
        <?php the_post_thumbnail('full')?>
    </section>
    <h1 style="text-align: center; color: red;">/!\ Refonte en cours</h1>
    <section id="doubleBox">
        <div id="candidat">
            <h2>Candidat</h2>
            <p><i class="fa-regular fa-clipboard"></i> Des recruteurs qui s'occupe de vos CV !</p>
            <a href="" id="create">Créer un CV</a>
        </div>
<!--        <div id="recruteur">
            <h2>Recruteur</h2>
            <p><i class="fa-regular fa-clipboard"></i> Une façon plus simple de geres vos CV reçu</p>
            <a href="" id="consulter">Consulter les CV</a>
        </div>-->
    </section>
    <!--<section id="lastCv">
        <h1>Derniers CV ajoutés</h1>
        <div id="lesCv">
            <i class="fa-solid fa-circle-chevron-left"></i>
            <div id="cv"><img src="<?/*= get_template_directory_uri().'/asset/img/example.jpg' */?>"></div>
            <div id="cv"><img src="<?/*= get_template_directory_uri().'/asset/img/example.jpg' */?>"></div>
            <div id="cv"><img src="<?/*= get_template_directory_uri().'/asset/img/example.jpg' */?>"></div>
            <div id="cv"><img src="<?/*= get_template_directory_uri().'/asset/img/example.jpg' */?>"></div>
            <i class="fa-solid fa-circle-chevron-right"></i>
        </div>
    </section>-->
</div>
<?php
get_footer();
