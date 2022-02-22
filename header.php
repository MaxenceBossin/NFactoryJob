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

<body <?php body_class(); ?> >

<?php wp_body_open(); ?>
<!-- <div id="page" class="site"> -->

<header id="header" class="site-header">
	<div class="wrap">
		<a href="<?= path('home'); ?>" id="titre"><span id="spantitre">N</span>Factory<span id="spantitre">Job</span></a>
		<nav>
			<ul>
				<li class="desktop"><a href="<?= path('home'); ?>" class="log"><i class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
                <?php
                if(is_user_logged_in()){
                    ?>
                    <li class="desktop"><a href="<?= path('dashboard'); ?>" class="log"><i class="fa-solid fa-chalkboard-user"></i> <span>Dashboard</span></a></li>
                    <li class="desktop"><a href="<?= path('logout'); ?>" class="log"><i style="color: red;" class="fa-solid fa-key"></i> <span>Déconnexion</span></a></li>
                <?php
                }
                else{
                    ?>
                    <li class="desktop"><a href="<?= path('connexion'); ?>" class="log"><i class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
                    <?php
                }
                ?>
				<li class="desktop"><a href="<?= path('editor'); ?>" class="create">Créer un CV</a></li>
				<li class="burger"><i class="fa-solid fa-bars"></i></li>
				<li class="mobile"><a href="<?= path('home'); ?>"><i class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
                <?php
                if(is_user_logged_in()){
                    ?>
                    <li class="mobile"><a href="<?= path('dashboard'); ?>" class="log"><i class="fa-solid fa-chalkboard-user"></i> <span>Dashboard</span></a></li>
                    <li class="mobile"><a href="<?= path('logout'); ?>" class="log"><i style="color: red;" class="fa-solid fa-key"></i> <span>Déconnexion</span></a></li>
                    <?php
                }
                else{
                    ?>
                    <li class="mobile"><a href="<?= path('connexion'); ?>" class="log"><i class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
                    <?php
                }
                ?>
				<li class="mobile"><a href="<?= path('editor'); ?>" class="create">Créer un CV</a></li>
			</ul>
		</nav>
	</div>
</header><!-- #masthead -->

