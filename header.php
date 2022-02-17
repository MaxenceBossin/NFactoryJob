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
		<h1><span id="spantitre">N</span>Factory<span id="spantitre">Job</span></h1>
		<nav>
			<ul>
				<li class="desktop"><a href="" class="log"><i class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
				<li class="desktop"><a href="" class="log"><i class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
				<li class="desktop"><a href="" class="create">Créer un CV</a></li>
				<li class="burger"><i class="fa-solid fa-bars"></i></li>
				<li class="mobile"><a href=""><i class="fa-solid fa-house"></i> <span>Accueil</span></a></li>
				<li class="mobile"><a href=""><i class="fa-solid fa-key"></i> <span>Connexion</span></a></li>
				<li class="mobile"><a href="" class="create">Créer un CV</a></li>
			</ul>
		</nav>
	</div>
</header><!-- #masthead -->

