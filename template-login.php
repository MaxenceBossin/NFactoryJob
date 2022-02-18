<?php
/*Template Name: Connexion*/
get_header();
?>

<section id="connexion">
    <div class="wrap">
        <h2>Connexion</h2>
        <div class="box">
        <?php the_post_thumbnail('full')?>
            <form action="" method="get" class="form">
                <div class="form-example">
                    <label for="name">Adresse mail</label>
                    <input type="email "name="email" id="email" value="<?= recupInputValue('mail')?>" required>
                </div>
                <div class="form-example">
                    <label for="email">Mot de passe</label>
                    <input type="password" name="password" id="password" value="<?= recupInputValue('password')?>" required>
                </div>
                <a href="#">Mot de passe oublié</a>
                <div class="form-button">
                    <input id="co" type="submit" value="Se connecter">
                </div>
                    <a href="<?= path('inscription'); ?>">Je n'ai pas de compte</a>
            </form>
        </div>        
    </div>
</section>

<?php
get_footer();
