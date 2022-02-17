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
            <form action="" method="get">
                <p>Vous êtes :</p>

                <input type="radio" id="candidat" name="drone" value="candidat">
                <label for="huey">Candidat</label>
                <input type="radio" id="recruteur" name="drone" value="recruteur">
                <label for="dewey">Recruteur</label>
            
                <label for="name">Adresse mail </label>
                <input type="email "name="email" id="email" required>

                <label for="email">Mot de passe </label>
                <input type="password" name="password" id="password" required>

                <label for="email">Confirmation du mot de passe </label>
                <input type="password" name="password" id="password" required>

                <input type="radio" id="cgu" name="drone" value="cgu">
                <label for="huey">J'accepte les CGU</label>

                <input type="submit" value="S'inscrire">
                <p class="text_blue">Je possède déjà un compte</p>
            </form>
            </div>
                <div class="box_img">
                    <img src="https://img.search.brave.com/0H3rXORse0LxyalDCBhrFoqMpTl6Ise1hjOceQpqO9E/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5z/bnV0LmZyL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE1LzA4L2lt/YWdlLWRlLXBheXNh/Z2UtNS5qcGc" alt="">
                </div>
            </div>
        </div>
    </div>    
</section>


<?php get_footer();