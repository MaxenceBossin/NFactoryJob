<?php
// add_image_size( string $name, int $width, int $height, bool|array $crop = false )
add_image_size('imgArticlePetit',250,150,true);
add_image_size('imgArticleGrand',635,292,true);
add_image_size('featureHomePage',270,220,true);
add_image_size('featureShow',432,176,true);
add_image_size('galleryPetit',60,60,true);
add_image_size('galleryMoyen',120,120,true);
add_image_size('galleryGrand',300,300,true);
add_image_size('slider',770,354,true);

function remove_default_img_sizes($sizes)
{
    // ['thumbnail','medium', 'medium_large', 'large', '1536x1536', '2048x2048'];
    unset($sizes['medium']);
    unset($sizes['large']);
    return $sizes;
}

add_filter('intermediate_image_sizes_advanced' ,'remove_default_img_sizes', 10, 1);