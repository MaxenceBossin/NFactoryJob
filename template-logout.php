<?php
/*Template Name: Logout*/

wp_logout();
header('Location: ' . get_site_url());