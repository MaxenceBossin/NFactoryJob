<?php
session_start();

function assetImg() {
    return  get_template_directory_uri().'/asset/img/';
}

function debug($tableau)
{
    echo '<pre style="height:300px;overflow-y: scroll;font-size: .7rem;padding: .6rem;font-family: Verdana;background-color: #000;color:#fff;">';
    print_r($tableau);
    echo '</pre>';
}
function dump($value)
{
    echo '<pre style="height:150px;overflow-y: scroll;font-size: 1rem;padding: .5rem;font-family: Verdana;background-color: #111;color:#eee;">';
    var_dump($value);
    echo '</pre>';
}

function path($lien){
    return esc_url(home_url($lien));
}



function getImg($id, $alt, $size = ''){
    if(!empty(get_the_post_thumbnail_url($id, $size))){
        return  '<img src="'.get_the_post_thumbnail_url($id, $size).'" alt="'.$alt.'">';
    }    
}

function getInfoText(array $array,string $champBdd) : string
{
    $info = (!empty($array[$champBdd][0]))     ? $array[$champBdd][0]     :'pas de '.$champBdd.'disponible';
return  $info;
}

function getInfoImgUrl($id): string
{
    $info = wp_get_attachment_image_src($id)[0];
return $info;
}

function verify(array $array, string $key) : string
{
    if(!empty($array[$key][0])){
        $renvoit = $array[$key][0];
    }else{
        $renvoit = '';
    }
return $renvoit;
}

function meta(string $meta,string $data): string {
    if(!empty($data)){
        return '<meta name="'.$meta.'" content="'.$data.'">';
    }else{
        return '';
    }
    
}
function metaTitle(string $data): string {
    if(!empty($data)){
        return '<title>'.$data.'</title>';
    }else{
        return '<title>document</title>';
    }
    
}


function showJson($data)
{
    header("Content-type: application/db-projects");
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if ($json) {
        die($json);
    } else {
        die('error in db-projects encoding');
    }
}

function get_page_url($template_name)
{
    $pages = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'meta_query' => [
            [
                'key' => '_wp_page_template',
                'value' => $template_name.'.php',
                'compare' => '='
            ]
        ]
    ]);
    if(!empty($pages))
    {
        foreach($pages as $pages__value)
        {
            return get_permalink($pages__value->ID);
        }
    }
    return get_bloginfo('url');
}

function arrayJson(array $requestResult): string
{
    return (json_encode($requestResult, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function is_recruteur() {
    $user = wp_get_current_user();
    if ( in_array( 'recruteur', (array) $user->roles ) || in_array( 'administrator', (array) $user->roles ) ) {
        return true;
    }
    return false;
}

function get_backcolor_by_role(){
    if(is_recruteur()){
        return "#fad5b4";
    }
    return "rgb(176, 214, 248)";
}

function get_text_color_by_role(){
    if(is_recruteur()){
        return "#2d2d2d";
    }
    return "white";
}

function get_color_by_role(){
    if(is_recruteur()){
        return "#D6430A";
    }
    return "rgb(12, 100, 166)";
}

function get_good_logo(){
    echo '<a href="'.get_site_url().'" class="main-title"><span style="color: '.get_color_by_role().';">N</span>Factory<span style="color: '.get_color_by_role().';">Job</span></a>';
}