<?php
/*Template Name: Connexion*/
get_header();
?>

<section id="connexion">
    <div class="wrap">
        <h2>Connexion</h2>
            <div class="box">
                <div class="box_img_login ">
                    <img src="//img de signup" alt="">
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
                        <a href="#">Mot de passe oublié</a>
                        <div class="form-button">
                            <input type="submit" value="Se connecter">
                        </div>
                            <a href="#">Je n'ai pas de comtpe</a>
                    </form>        
    </div>
</section>



<?php get_footer();