<?php
/*Template Name: Inscription*/
get_header();
?>

<div class="img_head_body">
    <img src="/*image en haut de la page signup*/" alt="">
</div>

<section id="signup">
<h3>Créer un compte</h3>
<div class="box">
    <div class="wrap">
        <div class="box_text"><p>Vous êtes :</p></div>
            <div>
                <input type="radio" id="candidat" name="drone" value="candidat">
                <label for="huey">Candidat</label>
            </div>
            <div>
                <input type="radio" id="recruteur" name="drone" value="recruteur">
                <label for="dewey">Recruteur</label>
            </div>
            <form action="" method="get" class="form-example">
                <div class="form-example">
                <label for="name">Adresse mail </label>
                <input type="email "name="email" id="email" required>
            </div>
                <div class="form-example">
                <label for="email">Mot de passe </label>
                <input type="password" name="password" id="password" required>
            </div>
            </div>
                <div class="form-example">
                <label for="email">Confirmation du mot de passe </label>
                <input type="password" name="password" id="password" required>
            </div>
            <div>
                <input type="radio" id="cgu" name="drone" value="cgu">
                <label for="huey">J'accepte les CGU</label>
            </div>
            <div class="form-example">
                <input type="submit" value="Subscribe!">
            </div>
            <p class="text_blue">Je possède déjà un compte</p>
            </form>
        </div>
        
        <div class="box_img">
            <img src="//img a coter de signup" alt="">
        </div>
    </div>
</section>


<?php get_footer();