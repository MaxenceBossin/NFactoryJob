<?php
/*Template Name: Inscription*/

if(is_user_logged_in()){
    header('Location: ' . path('dashboard'));
    die();
}

$errors = [];

if(!empty($_POST['submitted'])) {
    $email = trim(strip_tags($_POST['email']));
    $pass = trim(strip_tags($_POST['password']));
    $pass2 = trim(strip_tags($_POST['password2']));

    if(mb_strlen($email) < 4 || mb_strlen($email) > 100 || !filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors['email'] = 'Veuillez renseigner une adresse mail valide';
    }
    if(mb_strlen($pass) < 4 || mb_strlen($pass) > 50){
        $errors['password'] = 'Veuillez renseigner un mot de passe compris entre 4 et 50 caractères';
    }
    if($pass !== $pass2){
        $errors['password'] = 'Veuillez renseigner deux mots de passe identiques';
    }

    if(count($errors) == 0){
        $userdata = array(
            'user_pass'             => $pass,   //(string) The plain-text user password.
            'user_login'            => $email,   //(string) The user's login username.
            'user_email'            => $email,   //(string) The user email address.
            'display_name'          => $email,   //(string) The user's display name. Default is the user's username.
            'nickname'              => $email,
            'show_admin_bar_front'  => false
        );
        $user_id = wp_insert_user($userdata);
        wp_update_user( array ('ID' => $user_id, 'role' => 'utilisateur') ) ;
        if ( ! is_wp_error( $user_id ) ) {
            header('Location: ' . path('connexion').'?creation=1');
        }
        else{
            $errors['email'] = 'Une erreur est survenue. Veuillez réessayer ultérieurement';
        }
    }
}

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
                <form action="" method="post" class="form">
                    <div id="mail">
                        <label for="email">Adresse mail</label>
                        <input type="email "name="email" id="email" placeholder="contact@nfactoryjob.com" required>
                        <span class="error"><? if(!empty($errors['email'])){ echo $errors['email']; } ?></span>
                    </div>

                    <div id="mdp">
                        <label for="mdp">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="**********" required>
                        <span class="error"><? if(!empty($errors['password'])){ echo $errors['password']; } ?></span>
                    </div>

                    <div id="cmdp">
                        <label for="cmdp">Confirmation du mot de passe</label>
                        <input type="password" name="password2" id="password2" placeholder="**********" required>
                        <span class="error"><? if(!empty($errors['password2'])){ echo $errors['password2']; } ?></span>
                    </div>

                    <div id="cgu">
                        <p>En vous inscrivant, vous acceptez les <a target="_blank" href="<?= path('cgu'); ?>">conditions générales d'utilisation</a></p>
                    </div>

                    <div id="possede">
                        <input type="submit" value="Continuer" id="submitted" name="submitted">
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