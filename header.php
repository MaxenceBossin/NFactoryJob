<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package nfactoryjob
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>
<!-- <div id="page" class="site"> -->

<?php
$recruteur = false;

?>

<header id="header" class="site-header" style="background-color: <?= get_backcolor_by_role(); ?>;">
	<div class="wrap">
		<?= get_good_logo(); ?>
		<nav>
			<ul>
				<li class="desktop"><a href="<?= path('home'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
                <?php
                if(is_user_logged_in()){
                    if(is_recruteur()){
                        ?>
                        <li class="desktop"><a href="<?= path('dashboard'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-chalkboard-user"></i> <span>CVthèque</span></a></li>
                            <?php
                    }
                    else{
                        ?>
                        <li class="desktop"><a href="<?= path('dashboard'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-chalkboard-user"></i> <span>Mes CV</span></a></li>
                        <?php
                    }
                    ?>
                    <li class="desktop"><a href="<?= path('logout'); ?>" class="log"><i style="color: red;" class="fa-solid fa-key"></i> <span>Déconnexion</span></a></li>
                <?php
                }
                else{
                    ?>
                    <li class="desktop"><a href="<?= path('connexion'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
                    <?php
                }
                ?>
                <?php
                if(!is_recruteur()){
                    ?>
                    <li class="desktop" ><a style="background-color: <?= get_color_by_role(); ?>" href="<?= path('editor'); ?>" class="create">Créer un CV</a></li>
                    <?php
                }
                ?>
				<li id="burger" class="burger"><i class="fa-solid fa-bars"></i></li>
                <div class="mobile">
                    <li><a href="<?= path('home'); ?>"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
                    <?php
                    if(is_user_logged_in()){
                        if(is_recruteur()){
                            ?>
                            <li><a href="<?= path('dashboard'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-chalkboard-user"></i> <span>CVthèque</span></a></li>
                            <?php
                        }
                        else{
                            ?>
                            <li><a href="<?= path('dashboard'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-chalkboard-user"></i> <span>Mes CV</span></a></li>
                            <?php
                        }
                        ?>
                        <li><a href="<?= path('logout'); ?>" class="log"><i style="color: red;" class="fa-solid fa-key"></i> <span>Déconnexion</span></a></li>
                        <?php
                    }
                    else{
                        ?>
                        <li><a href="<?= path('connexion'); ?>" class="log"><i style="color: <?= get_color_by_role(); ?>" class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
                        <?php
                    }
                    ?>

                    <?php
                    if(!is_recruteur()){
                        ?>
                        <li><a style="background-color: <?= get_color_by_role(); ?>" href="<?= path('editor'); ?>" class="create">Créer un CV</a></li>
                        <?php
                    }
                    ?>
                </div>

			</ul>
		</nav>
	</div>
</header><!-- #masthead -->

