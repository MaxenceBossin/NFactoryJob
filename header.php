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
<div id="page" class="site">
	<header id="header" class="site-header">
		<h1>NFactoryJob</h1>
		<nav>
    		<ul>
        		<li><a href=""><i class="fa-solid fa-house"></i> Accueil</a></li>
				<li><a href=""><i class="fa-solid fa-key"></i>Connexion</a></li>
				<div id="cree">
					<li><a href="">Créer un CV</a></li>
				</div>
    		</ul>
		</nav>
	</header><!-- #masthead -->
</div>
