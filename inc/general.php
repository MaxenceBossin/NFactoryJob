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
	wp_enqueue_style('fontawesome-css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
	wp_style_add_data( 'nfactoryjob-style', 'rtl', 'replace' );

    if(is_page_template('template-editor.php')){
        wp_enqueue_style( 'coloris', 'https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css', array(), _S_VERSION);
    }

    wp_deregister_script('jquery');
    wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), _S_VERSION, true );

	wp_enqueue_script( 'nfactoryjob-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

    wp_enqueue_script( 'functions', get_template_directory_uri() . '/js/functions.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'form-events', get_template_directory_uri() . '/js/form-events.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'ajax-events', get_template_directory_uri() . '/js/ajax-events.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'api-actions', get_template_directory_uri() . '/js/api-actions.js', array(), _S_VERSION, true );
    wp_enqueue_script( 'autocomplete-item', get_template_directory_uri() . '/js/AutocompleteItem.js', array(), _S_VERSION, true );

    if(is_page_template('template-dashboard.php')){
        wp_enqueue_script( 'dashboard-funcs', get_template_directory_uri() . '/js/dashboard/dashboard-funcs.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'dashboard-main', get_template_directory_uri() . '/js/dashboard/dashboard-main.js', array(), _S_VERSION, true );
    }

    if(is_page_template('template-editor.php')){
        wp_enqueue_script( 'html2pdf', 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'coloris','https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'module-class', get_template_directory_uri() . '/js/editor/Module.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'cv-class', get_template_directory_uri() . '/js/editor/CV.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'line-class', get_template_directory_uri() . '/js/editor/Line.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'editor-functions', get_template_directory_uri() . '/js/editor/editor-funcs.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'editor-onglet-content', get_template_directory_uri() . '/js/editor/editor-onglet-content.js', array(), _S_VERSION, true );
        wp_enqueue_script( 'editor-basics', get_template_directory_uri() . '/js/editor/editor-basics.js', array(), _S_VERSION, true );
    }
}
add_action( 'wp_enqueue_scripts', 'nfactoryjob_scripts' );

// Bloquer l'accès au dashboard sauf pour les admins
add_action( 'init', 'blockusers_init' ); function blockusers_init() { if ( is_admin() && ! current_user_can( 'administrator' ) && ! ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) { wp_redirect( home_url() ); exit; } }

add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}
