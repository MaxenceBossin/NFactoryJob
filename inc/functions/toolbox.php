<?php

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