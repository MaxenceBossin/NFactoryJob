<?php
/*Template Name: Connexion*/

if(is_user_logged_in()){
    header('Location: ' . path('dashboard'));
    die();
}

$creation = 0;
if(!empty($_GET['creation']) && is_numeric($_GET['creation'])){
    $creation = intval($_GET['creation']);
}

$errors = [];

if(!empty($_POST['submitted'])) {
    $email = trim(strip_tags($_POST['email']));
    $pass = trim(strip_tags($_POST['password']));

    if(mb_strlen($email) < 2 || mb_strlen($email) > 100){
        $errors['email'] = 'Veuillez renseigner une adresse mail ou nom d\'utilisateur valide';
    }
    if(mb_strlen($pass) < 4 || mb_strlen($pass) > 50){
        $errors['password'] = 'Veuillez renseigner un mot de passe compris entre 4 et 50 caractères';
    }

    if(count($errors) == 0){
        $creds = array(
            'user_login'    => $email,
            'user_password' => $pass,
            'remember'      => false
        );

        $user = wp_signon( $creds, false );

        if ( is_wp_error( $user ) ) {
            $errors['email'] = $user->get_error_message();
        }
        else{
            header('Location: ' . path('dashboard'));
        }
    }
}

get_header();
?>

    <section id="connexion">
        <div class="wrap">
            <h2>Connexion</h2>
            <div class="box">
                <div class="item">
                    <?php the_post_thumbnail('full')?>
                </div>
                <div class="item">
                    <form action="" method="POST" class="form">
                        <?php
                        if($creation === 1) {
                            ?>
                            <p class="success">Votre compte a bien été créé, vous pouvez désormais vous connecter.</p>
                            <?php
                        }
                        ?>
                        <div class="form-example">
                            <label for="name">Adresse mail</label>
                            <input type="email "name="email" id="email" value="<?= recupInputValue('email')?>" required>
                            <span class="error"><? if(!empty($errors['email'])){ echo $errors['email']; } ?></span>
                        </div>
                        <div class="form-example">
                            <label for="email">Mot de passe</label>
                            <input type="password" name="password" id="password" value="<?= recupInputValue('password')?>" required>
                            <span class="error"><? if(!empty($errors['password'])){ echo $errors['password']; } ?></span>
                        </div>
                        <div class="form-button">
                            <input id="submitted" name="submitted" type="submit" value="Se connecter">
                        </div>
                        <a href="<?= path('inscription'); ?>">Je n'ai pas de compte</a>
                    </form>
                </div>
            </div>
        </div>
    </section>

<?php
get_footer();
