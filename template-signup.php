<?php
/*Template Name: Inscription*/
get_header();
?>

<div class="img_head_body">
    <img src="/*image en haut de la page signup*/" alt="">
</div>

<section id="signup">
    <div class="wrap">
        <p class="account">Créer un compte</p>
        <div class="box">
            <div class="box_text">
                <form action="" method="get" class="form">
                    <div id="vous">
                            <p>Vous êtes :</p>
                    </div>
                    <div class="checkbox_cr">
                        <input type="checkbox" id="candidat" name="drone" value="candidat">
                        <label for="candidat" class="candidat">Candidat</label>
                        <input type="checkbox" id="recruteur" name="drone" value="recruteur">
                        <label for="recruteur">Recruteur</label>
                    </div>
                    <div id="mail">
                        <label for="email">Adresse mail</label>
                        <input type="email "name="email" id="email" placeholder="contact@nfactoryjob.com" required>
                    </div>

                    <div id="mdp">
                        <label for="mdp">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="**********" required>
                    </div>

                    <div id="cmdp">
                        <label for="cmdp">Confirmation du mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="**********" required>
                    </div>

                    <div id="cgu">
                        <input type="checkbox" id="cgu" name="drone" value="cgu">
                        <label for="huey"><a href="<?= path('cgu'); ?>">J'accepte les CGU</a></label>
                    </div>

                    <div id="possede">
                        <input type="submit" value="Continuer" id="co">
                        <p class="text_blue"><a href="<?= path('connexion'); ?>">Je possède déjà un compte</p>
                    </div>

                </form>
            </div>
            <div class="box_img">
                <?php the_post_thumbnail('signup')?>
            </div>
        </div>
    </div>    
</section>


<?php get_footer();