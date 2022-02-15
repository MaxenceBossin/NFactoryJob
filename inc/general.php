<?php
/*
**
 * nfactoryjob functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package nfactoryjob
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function nfactoryjob_setup() {
	load_theme_textdomain( 'nfactoryjob', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'nfactoryjob' ),
		)
	);
}
add_action( 'after_setup_theme', 'nfactoryjob_setup' );

/**
 * Enqueue scripts and styles.
 */
function nfactoryjob_scripts() {
    wp_enqueue_style( 'fontawewome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', array(), _S_VERSION );
	wp_enqueue_style( 'nfactoryjob-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'nfactoryjob-style', 'rtl', 'replace' );

    wp_deregister_script('jquery');
    wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), _S_VERSION, true );

	wp_enqueue_script( 'nfactoryjob-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

    wp_enqueue_script( 'functions', get_template_directory_uri() . '/js/functions.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'form-events', get_template_directory_uri() . '/js/form-events.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'ajax-events', get_template_directory_uri() . '/js/ajax-events.js', array(), _S_VERSION, true );

    if(is_page_template('template-editor.php')){
        wp_enqueue_script( 'editor-functions', get_template_directory_uri() . '/js/editor/editor-funcs.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'editor-basics', get_template_directory_uri() . '/js/editor/editor-basics.js', array(), _S_VERSION, true );
    }
}
add_action( 'wp_enqueue_scripts', 'nfactoryjob_scripts' );


